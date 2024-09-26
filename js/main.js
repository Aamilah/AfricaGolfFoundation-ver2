//   loading spinner start
  $(window).on('load', function() {
    $('#loading').fadeOut('slow', function() {
      $('#content').css('visibility', 'visible');
    });
  });
//   loading spinner end

// animation start
wow = new WOW();
wow.init();
$(document).ready(function(e) {
    $('#video-icon').on('click',function(e){
        e.preventDefault();
        $('.video-popup').css('display','flex');
        $('.iframe-src').slideDown();
    });
    $('.video-popup').on('click',function(e){
        var $target = e.target.nodeName;
        var video_src = $(this).find('iframe').attr('src');
        if($target != 'IFRAME'){
            $('.video-popup').fadeOut();
            $('.iframe-src').slideUp();
            $('.video-popup iframe').attr('src'," ");
            $('.video-popup iframe').attr('src',video_src);
        }
    });
    $('.slider').bxSlider({
        pager: false
    });
});

// animation end

// navbar animation start
$(window).on("scroll",function () {
    var bodyScroll = $(window).scrollTop(),
    navbar = $(".navbar");
    if(bodyScroll > 50){
        $('.navbar-logo img').attr('src','images/AFG Logo icono.svg');
        navbar.addClass("nav-scroll");
    }else{
        $('.navbar-logo img').attr('src','images/AFG Logo icono.svg');
        navbar.removeClass("nav-scroll");
    }
});
$(window).on("load",function (){
    var bodyScroll = $(window).scrollTop(),
    navbar = $(".navbar");
    if(bodyScroll > 50){
        $('.navbar-logo img').attr('src','images/AFG Logo icono.svg');
        navbar.addClass("nav-scroll");
    }else{
        $('.navbar-logo img').attr('src','images/AFG Logo icono.svg');
        navbar.removeClass("nav-scroll");
    }
    $.scrollIt({
        easing: 'swing',      // the easing function for animation
        scrollTime: 900,       // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null,    // function(pageIndex) that is called when page is changed
        topOffset: -63
    });
});
// navbar animation end

// Carousel Start
    // Header carousel
    $(".hero-slider").owlCarousel({
      autoplay: true,
      animateOut: 'fadeOutLeft',
      smartSpeed: 1000,           // Smooth transition speed
      items: 1,
      dots: true,
      loop: true,
      nav : true,
      freeDrag: false,             // Ensure smooth transitions without free dragging
      navText :false
  });
// Carousel End

// International Phone Num Input section start
document.addEventListener("DOMContentLoaded", function() {
  // Select all input elements with the class "phone-input"
  const phoneInputFields = document.querySelectorAll('.phone-input');
  
  // Apply the intlTelInput function to each phone input field
  phoneInputFields.forEach(function(phoneInputField) {
      window.intlTelInput(phoneInputField, {
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
  });
});
  // International Phone Num Input section end

// Modal Start
document.addEventListener('DOMContentLoaded', (event) => {
const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');
const modal3 = document.getElementById('modal3');

const openModal1Btn = document.getElementById('openModal1Btn');
const openModal2Btn = document.getElementById('openModal2Btn');
const openModal3Btn = document.getElementById('openModal3Btn');

const closeBtns = document.querySelectorAll('.closeBtn');

// Functions to open the modals
openModal1Btn.addEventListener('click', () => {
    modal1.style.display = 'block';
});

openModal2Btn.addEventListener('click', () => {
    modal2.style.display = 'block';
});

openModal3Btn.addEventListener('click', () => {
    modal3.style.display = 'block';
});

// Function to close the modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const modalId = event.target.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'none';
    });
});

    // Close the modals if the user clicks anywhere outside of it
    window.addEventListener('click', (event) => {
        if (event.target == modal1) {
            modal1.style.display = 'none';
        } else if (event.target == modal2) {
            modal2.style.display = 'none';
        } else if (event.target == modal3) {
            modal3.style.display = 'none';
        }
    });
});
// Modal End
  // JavaScript to redirect when "Equipment Donation" is selected
  document.getElementById('equipment-donation').addEventListener('change', function() {
    if (this.checked) {
      window.location.href = 'donate.html#2';
      document.getElementById('monetary-section').style.display = 'none';
    }
  });
  // JavaScript to handle donation type selection
  document.getElementById('monetary-donation').addEventListener('change', function() {
    if (this.checked) {
      document.getElementById('monetary-section').style.display = 'block'; // Show monetary section
    }
  });
    // JavaScript to update donation amount based on preset selection
    document.addEventListener("DOMContentLoaded", function() {
        var amountInput = document.getElementById("amount");
        var totalInput = document.getElementById("total");
        var totalDisplay = document.getElementById("total-display");
        var radioButtons = document.querySelectorAll("input[name='preset-amount']");
        var radioOptions = document.querySelectorAll(".radio-option");

        // Function to update the total amount and display
        function updateTotalAmount() {
            var amount = amountInput.value;
            totalInput.value = amount;
            totalDisplay.textContent = `$${amount}`;
        }

        // Update total when amount input changes manually
        amountInput.addEventListener("input", updateTotalAmount);

        // Update total when preset amount is selected
        radioButtons.forEach(function(radio, index) {
            radio.addEventListener("change", function() {
                if (this.checked) {
                    amountInput.value = this.value;
                    updateTotalAmount(); // Automatically update total
                    radioOptions.forEach(function(option) {
                        option.classList.remove("selected");
                    });
                    radioOptions[index].classList.add("selected");
                }
            });
        });

        // Initialize the total amount on page load
        updateTotalAmount();
    });
    // Payment Section Add Card Start
    document.addEventListener("DOMContentLoaded", function() {
      const addMethodBtn = document.getElementById('add-method');
      const removeMethodBtn = document.getElementById('remove-method');
      const paymentMethodsContainer = document.getElementById('payment-methods');
      
      // Function to create a new payment method block
      function createPaymentMethod() {
          const newMethod = document.createElement('div');
          newMethod.classList.add('payment-method');
          newMethod.innerHTML = `
              <label for="card-number">Card number:</label>
              <input type="text" name="card-number" placeholder="0000 0000 0000 0000" required>
              <div class="row">
                  <div class="col">
                      <label for="expiry-date">Expires:</label>
                      <input type="text" name="expiry-date" placeholder="MM/YYYY" required>
                  </div>
                  <div class="col">
                      <label for="cvv">CVV:</label>
                      <input type="text" name="cvv" placeholder="0000" required>
                  </div>
              </div>
          `;
          paymentMethodsContainer.appendChild(newMethod);
      }
  
      // Add payment method event listener
      addMethodBtn.addEventListener('click', function() {
          createPaymentMethod();
          // Show remove button only if there is more than one payment method
          if (paymentMethodsContainer.children.length > 1) {
              removeMethodBtn.style.display = 'inline-block';
          }
      });
  
      // Remove payment method event listener
      removeMethodBtn.addEventListener('click', function() {
          if (paymentMethodsContainer.children.length > 1) {
              paymentMethodsContainer.removeChild(paymentMethodsContainer.lastElementChild);
          }
          // Hide remove button if only one payment method is left
          if (paymentMethodsContainer.children.length === 1) {
              removeMethodBtn.style.display = 'none';
          }
      });
  });
  
      // JavaScript to handle donation type selection
document.addEventListener('DOMContentLoaded', function() {
    const dropOffRadio = document.getElementById('drop-off');
    const pickUpRadio = document.getElementById('pick-up');
    const dropOffSection = document.getElementById('drop-off-section');
    const pickUpSection = document.getElementById('pick-up-section');
    const dropOffTime = document.getElementById('drop-off-time');
    const pickUpAddress = document.getElementById('pick-up-address');
    const pickUpTime = document.getElementById('pick-up-time');

    function toggleSections() {
        if (dropOffRadio.checked) {
            dropOffSection.style.display = 'block';
            pickUpSection.style.display = 'none';
            dropOffTime.required = true;
            pickUpAddress.required = false;
            pickUpTime.required = false;
        } else if (pickUpRadio.checked) {
            dropOffSection.style.display = 'none';
            pickUpSection.style.display = 'block';
            dropOffTime.required = false;
            pickUpAddress.required = true;
            pickUpTime.required = true;
        } else {
            dropOffSection.style.display = 'none';
            pickUpSection.style.display = 'none';
            dropOffTime.required = false;
            pickUpAddress.required = false;
            pickUpTime.required = false;
        }
    }

    dropOffRadio.addEventListener('change', toggleSections);
    pickUpRadio.addEventListener('change', toggleSections);

    // Initialize on page load
    toggleSections();
});


      
      document.addEventListener('DOMContentLoaded', function() {
        const equipmentDetailsContainer = document.getElementById('equipment-details');
        const equipmentSummary = document.querySelector('#equipment-donation-summary .equipment-summary');
        const addEquipmentButton = document.getElementById('add-equipment');
        
        // Function to update equipment summary
        function updateEquipmentSummary() {
          const summaryHtml = [];
          const equipmentItems = document.querySelectorAll('#equipment-details .form-item');
          
          equipmentItems.forEach((item) => {
            const nameInput = item.querySelector('input[name="equipment-name[]"]');
            const quantityInput = item.querySelector('input[name="equipment-quantity[]"]');
            const name = nameInput ? nameInput.value : '';
            const quantity = quantityInput ? quantityInput.value : '';
            
            if (name && quantity) {
              summaryHtml.push(`<p>${name} <span>${quantity}</span></p>`);
            }
          });
          
          equipmentSummary.innerHTML = summaryHtml.join('');
        }
      
        // Function to add a new equipment details section
        function addEquipment() {
          const existingSections = equipmentDetailsContainer.querySelectorAll('.form-item').length;
      
          const newEquipment = document.createElement('div');
          newEquipment.className = 'form-item';
          newEquipment.innerHTML = `
            <div class="row">
              <div class="col-lg-7">
                <label for="equipment-name-${existingSections + 2}">Name of equipment</label>
                <input type="text" id="equipment-name-${existingSections + 2}" class="form-input w-100" name="equipment-name[]" placeholder="eg Golf Clubs" required>
              </div>
              <div class="col-lg-5">
                <label for="equipment-quantity-${existingSections + 2}">Quantity</label>
                <input type="number" id="equipment-quantity-${existingSections + 2}" name="equipment-quantity[]" class="form-input w-100" placeholder="e.g 5" required>
              </div>
            </div>
            <button type="button" class="remove-equipment red-bg">Remove</button>
          `;
      
          equipmentDetailsContainer.insertBefore(newEquipment, addEquipmentButton);
        }
      
        // Function to remove an equipment details section
        function removeEquipment(event) {
          if (event.target.classList.contains('remove-equipment')) {
            const sectionToRemove = event.target.closest('.form-item');
            if (sectionToRemove) {
              sectionToRemove.remove();
              updateEquipmentSummary(); // Update summary when an item is removed
            }
          }
        }
      
        // Event listener for adding equipment
        addEquipmentButton.addEventListener('click', function() {
          addEquipment();
          updateEquipmentSummary(); // Update summary when an item is added
        });
      
        // Event listener for removing equipment
        equipmentDetailsContainer.addEventListener('click', removeEquipment);
      
        // Initial update of equipment summary
        updateEquipmentSummary();
      });
      

      // Function to update the equipment summary and total quantity
function updateEquipmentSummary() {
    const summaryContainer = document.querySelector('#equipment-donation-summary .equipment-summary');
    const equipmentNames = document.querySelectorAll('[name="equipment-name[]"]');
    const equipmentQuantities = document.querySelectorAll('[name="equipment-quantity[]"]');
    
    let totalQuantity = 0;
    let summaryHTML = '';
  
    equipmentNames.forEach((nameField, index) => {
      const name = nameField.value;
      const quantity = parseInt(equipmentQuantities[index].value, 10) || 0;
      
      if (name && quantity > 0) {
        summaryHTML += `<p>${name} <span>${quantity}</span></p>`;
        totalQuantity += quantity;
      }
    });
  
    summaryContainer.innerHTML = summaryHTML;
    
    // Update total quantity display
    document.getElementById('total-quantity').textContent = totalQuantity;
  }
  
  // Event listener for adding and removing equipment
  document.getElementById('add-equipment').addEventListener('click', () => {
    updateEquipmentSummary();
  });
  
  // Event listener for equipment input changes
  document.addEventListener('input', (event) => {
    if (event.target.matches('[name="equipment-name[]"], [name="equipment-quantity[]"]')) {
      updateEquipmentSummary();
    }
  });
  
  // Initialize the summary on page load
  updateEquipmentSummary();
    
// Function to get the current date formatted as DD/MM/YYYY
function getCurrentDateFormatted() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  // Function to set the current date to all input fields with the name 'date'
  function setDateInputs() {
    const dateInputs = document.querySelectorAll("input[name='date']");
    const currentDate = getCurrentDateFormatted();
    
    dateInputs.forEach(function(dateInput) {
      dateInput.value = currentDate;
    });
  }
  
  // Set the date on page load
  document.addEventListener('DOMContentLoaded', setDateInputs);
  

  function toggleReadMore(contentId, button) {
    var moreText = document.getElementById(contentId);
    var icon = button.querySelector('i');

    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "inline"; // Show the hidden content
        button.textContent = "Read Less";  // Change button text
        button.prepend(icon); // Re-add icon to button
        icon.classList.replace("fa-plus", "fa-minus"); // Change icon to minus
    } else {
        moreText.style.display = "none";  // Hide the content again
        button.textContent = "Read More"; // Revert button text
        button.prepend(icon); // Re-add icon to button
        icon.classList.replace("fa-minus", "fa-plus"); // Change icon to plus
    }
}


