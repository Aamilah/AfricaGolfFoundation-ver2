<?php
// Autoload the Composer dependencies (including phpdotenv)
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

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
    echo "Connected successfully to the database!";
}


if (isset($_POST['contact_form'])) {
    $first_name = $_POST['f_name'];
    $last_name = $_POST['l_name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $stmt = $connect_db->prepare("INSERT INTO contact_form (first_name, last_name, email, subject, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $first_name, $last_name, $email, $subject, $message);

    if ($stmt->execute()) {
        $to = 'info@africagolffoundation.com';
        $from = 'aamilahdawood@gmail.com'; 
        $fromName = 'Administration'; 
        $email_subject = "New Contact Form Submission";
        $htmlContent = '
        <html>
        <head>
            <title>Contact Form Submission</title>
        </head>
        <body>
            <p>You have received a new message from the contact form.</p>
            <p><strong>First Name:</strong> ' . $first_name . '</p>
            <p><strong>Last Name:</strong> ' . $last_name . '</p>
            <p><strong>Email:</strong> ' . $email . '</p>
            <p><strong>Subject:</strong> ' . $subject . '</p>
            <p><strong>Message:</strong> ' . $message . '</p>
        </body>
        </html>';

        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: ' . $fromName . '<' . $from . '>' . "\r\n";

        if (mail($to, $email_subject, $htmlContent, $headers)) {
            header('Location: success.html?form=contact');
        } else {
            header('Location: 404.html');
        }
    } else {
        error_log($stmt->error);
        header('Location: 404.html');
    }
}


if (isset($_POST['beneficiary_form'])) {
    $first_name = $_POST['f_name'];
    $last_name = $_POST['l_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone']; // Corrected variable
    $profession = $_POST['profession'];
    $message = $_POST['message'];

    $stmt = $connect_db->prepare("INSERT INTO beneficiary_form (first_name, last_name, email, phone, profession, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $first_name, $last_name, $email, $phone, $profession, $message); // Corrected bind_param types

    if ($stmt->execute()) {
        $to = 'beneficiaries@africagolffoundation.com';
        $from = 'aamilahdawood@gmail.com'; 
        $fromName = 'Administration'; 
        $email_subject = "New Beneficiary Form Submission";
        $htmlContent = '
        <html>
        <head>
            <title>Beneficiary Form Submission</title>
        </head>
        <body>
            <p>You have received a new message from the beneficiary form.</p>
            <p><strong>First Name:</strong> ' . $first_name . '</p>
            <p><strong>Last Name:</strong> ' . $last_name . '</p>
            <p><strong>Email:</strong> ' . $email . '</p>
            <p><strong>Phone Number:</strong> ' . $phone . '</p>
            <p><strong>Profession:</strong> ' . $profession . '</p>
            <p><strong>Message:</strong> ' . $message . '</p>
        </body>
        </html>';

        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: ' . $fromName . '<' . $from . '>' . "\r\n";

        if (mail($to, $email_subject, $htmlContent, $headers)) {
            header('Location: success.html?form=beneficiary');
        } else {
            header('Location: 404.html');
        }
    } else {
        error_log($stmt->error);
        header('Location: 404.html');
    }
}

if (isset($_POST['equipment_form'])) {
    // Retrieve form data
    $first_name = $_POST['f_name'];
    $last_name = $_POST['l_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $delivery_type = $_POST['delivery-type'];
    $pick_up_address = isset($_POST['pick-up-address']) ? $_POST['pick-up-address'] : null;
    $pick_up_time = isset($_POST['pick-up-time']) ? $_POST['pick-up-time'] : null;
    $drop_off_time = isset($_POST['drop-off-time']) ? $_POST['drop-off-time'] : null;
    $equipment_names = $_POST['equipment-name'];
    $equipment_quantities = $_POST['equipment-quantity'];

    // Get the current date and time
    $submission_date = date('Y-m-d H:i:s');

    // Insert data into equipment_form table
    $stmt = $connect_db->prepare("INSERT INTO equipment_form (first_name, last_name, email, phone, delivery_type, pick_up_address, pick_up_time, drop_off_time, submission_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $first_name, $last_name, $email, $phone, $delivery_type, $pick_up_address, $pick_up_time, $drop_off_time, $submission_date);

    if ($stmt->execute()) {
        // Get the last inserted ID from equipment_form table
        $equipment_form_id = $stmt->insert_id;

        // Insert data into equipment_details table
        $stmt_details = $connect_db->prepare("INSERT INTO equipment_details (equipment_form_id, first_name, last_name, equipment_name, equipment_quantity) VALUES (?, ?, ?, ?, ?)");
        $stmt_details->bind_param("isssi", $equipment_form_id, $first_name, $last_name, $equipment_name, $equipment_quantity);

        for ($i = 0; $i < count($equipment_names); $i++) {
            $equipment_name = $equipment_names[$i];
            $equipment_quantity = $equipment_quantities[$i];
            $stmt_details->execute();
        }

        // Prepare email content
        $to = 'equipment@africagolffoundation.com';
        $from = 'aamilahdawood@gmail.com';
        $fromName = 'Administration';
        $email_subject = "New Equipment Donation Submission";
        $htmlContent = '
        <html>
        <head>
            <title>Equipment Donation Submission</title>
        </head>
        <body>
            <p>You have received a new equipment donation.</p>
            <p><strong>First Name:</strong> ' . $first_name . '</p>
            <p><strong>Last Name:</strong> ' . $last_name . '</p>
            <p><strong>Email:</strong> ' . $email . '</p>
            <p><strong>Phone Number:</strong> ' . $phone . '</p>
            <p><strong>Submission Date:</strong> ' . $submission_date . '</p>
            <p><strong>Equipment:</strong></p>';

        for ($i = 0; $i < count($equipment_names); $i++) {
            $htmlContent .= '<p>' . ($i + 1) . '. ' . $equipment_names[$i] . ' (Quantity: ' . $equipment_quantities[$i] . ')</p>';
        }

        $htmlContent .= '<p><strong>Delivery Type:</strong> ' . ucfirst($delivery_type) . '</p>';

        if ($delivery_type == 'pick-up') {
            $htmlContent .= '<p><strong>Pick-up Address:</strong> ' . $pick_up_address . '</p>';
            $htmlContent .= '<p><strong>Pick-up Time:</strong> ' . $pick_up_time . '</p>';
        } elseif ($delivery_type == 'drop-off') {
            $htmlContent .= '<p><strong>Drop-off Time:</strong> ' . $drop_off_time . '</p>';
        }

        $htmlContent .= '</body>
        </html>';

        // Set email headers
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: ' . $fromName . '<' . $from . '>' . "\r\n";

        // Send email
        if (mail($to, $email_subject, $htmlContent, $headers)) {
            header('Location: success.html?form=donation');
        } else {
            header('Location: 404.html');
        }
    } else {
        error_log($stmt->error);
        header('Location: 404.html');
    }
}


// Close statement and connection
if (isset($stmt)) {
    $stmt->close();
}
$connect_db->close();
?>
