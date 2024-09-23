<?php

require __DIR__ . "/vendor/autoload.php";

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$stripe_secret_key = $_ENV['STRIPE_SECRET_KEY'];
\Stripe\Stripe::setApiKey($stripe_secret_key);

// Retrieve environment variables
$hostname = $_ENV['DATABASE_HOSTNAME'];
$username = $_ENV['DATABASE_USERNAME'];
$password = $_ENV['DATABASE_PASSWORD'];
$database = $_ENV['DATABASE_NAME'];

// Create a connection to the MySQL database
$connect_db = new mysqli($hostname, $username, $password, $database);

// Check the connection
if ($connect_db->connect_error) {
    die("Connection failed: " . $connect_db->connect_error);
} else {
    // Connection successful message can be removed or commented out
    // echo "Connected successfully to the database!";
}

// Check if the form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['f_name'];
    $last_name = $_POST['l_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $donationType = $_POST['donation-type'];
    $currency = $_POST['currency'] ?? 'usd';
    $amount = isset($_POST['preset-amount']) ? $_POST['preset-amount'] * 100 : $_POST['amount'] * 100;

    // Insert form data into the database
    $stmt = $connect_db->prepare("INSERT INTO donation_form (first_name, last_name, email, phone, donation_type, amount, currency) VALUES (?, ?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        die("Prepare failed: " . $connect_db->error);
    }
    
    $bind_result = $stmt->bind_param("sssssss", $first_name, $last_name, $email, $phone, $donationType, $amount, $currency);
    if ($bind_result === false) {
        die("Bind param failed: " . $stmt->error);
    }

    $execute_result = $stmt->execute();
    if ($execute_result === false) {
        die("Execute failed: " . $stmt->error);
    }

    // Email preparation and sending
    $to = 'finance@africagolffoundation.com';
    $from = 'aamilahdawood@gmail.com'; 
    $fromName = 'Administration'; 
    $email_subject = "New Donation Form Submission";
    $htmlContent = '
    <html>
    <head>
        <title>Donation Form Submission</title>
    </head>
    <body>
        <p>You have received a new message from the donation form.</p>
        <p><strong>First Name:</strong> ' . htmlspecialchars($first_name) . '</p>
        <p><strong>Last Name:</strong> ' . htmlspecialchars($last_name) . '</p>
        <p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>
        <p><strong>Phone Number:</strong> ' . htmlspecialchars($phone) . '</p>
        <p><strong>Currency:</strong> ' . htmlspecialchars($currency) . '</p>
        <p><strong>Donation Amount:</strong> $' . htmlspecialchars(number_format($amount / 100, 2)) . '</p>
    </body>
    </html>';

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: ' . $fromName . '<' . $from . '>' . "\r\n";

    if (mail($to, $email_subject, $htmlContent, $headers)) {
        if ($donationType === 'monetary') {
            // Create a Stripe Checkout session for a monetary donation
            try {
                $checkout_session = \Stripe\Checkout\Session::create([
                    "payment_method_types" => ["card"],
                    "mode" => "payment",
                    "customer_email" => $email,
                    "success_url" => "http://localhost/AfricaGolfFoundation/success.html?form=donation",
                    "cancel_url" => "http://localhost/AfricaGolfFoundation/donate.html",
                    "locale" => "auto",
                    "line_items" => [
                        [
                            "quantity" => 1,
                            "price_data" => [
                                "currency" => $currency,
                                "unit_amount" => $amount, // dynamic amount from the form
                                "product_data" => [
                                    "name" => "Donation",
                                    "description" => "Donation by $first_name $last_name"
                                ]
                            ]
                        ]
                    ]
                ]);

                http_response_code(303);
                header("Location: " . $checkout_session->url);
            } catch (Exception $e) {
                echo 'Error creating stripe session: ' . $e->getMessage();
            }
        } else {
            // Handle equipment donations or other types if needed
            echo 'this type of donation is not supported yet.';
        }
    } else {
        // Handle email sending failure
        header('Location: 404.html');
    }
} else {
    // Handle incorrect request method
    header('Location: 404.html');
}
