// Function to format numbers with commas
function formatNumber(number) {
    return number.toLocaleString();
  }
  
  // Function to handle the counting effect
  function countUp(element, start, end, duration, prefix = '', suffix = '') {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = element;
  
    let timer = setInterval(function() {
      current += increment;
      obj.innerHTML = prefix + formatNumber(current) + suffix;
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
  
  // Initialize counting for each target item
  function startCounting() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const start = parseInt(counter.getAttribute('data-start')) || 0; // Default to 0 if no custom start is provided
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = parseInt(counter.getAttribute('data-duration')) || 2000; // Default to 2000ms if no custom duration is provided
      
      countUp(counter, start, target, duration, prefix, suffix);
    });
  }
  
  // Trigger counting when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    startCounting();
  });
  