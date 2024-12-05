// navbar toggling
const navbarShowBtn = document.querySelector('.navbar-show-btn');
const navbarCollapseDiv = document.querySelector('.navbar-collapse');
const navbarHideBtn = document.querySelector('.navbar-hide-btn');

navbarShowBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.add('navbar-show');
});
navbarHideBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.remove('navbar-show');
});

// changing search icon image on window resize
window.addEventListener('resize', changeSearchIcon);
function changeSearchIcon(){
    let winSize = window.matchMedia("(min-width: 1200px)");
    if(winSize.matches){
        document.querySelector('.search-icon img').src = "images/search-icon.png";
    } else {
        document.querySelector('.search-icon img').src = "images/search-icon-dark.png";
    }
}
changeSearchIcon();

// stopping all animation and transition
let resizeTimer;
window.addEventListener('resize', () =>{
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});



      // Handle Appointment Booking
      document.getElementById('appointment-form').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission
        const formData ={
          patient_id : document.getElementById('patient_id').value,
          doctor_id : document.getElementById('doctor_id').value,
          appointment_date : document.getElementById('appointment_date').value,
          appointment_time : document.getElementById('appointment_time').value
        };
    
      
        try {
          const response = await fetch('/auth/book-Appointment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          });
      
          if (response.ok) {
                  alert('Appointment booked successfully');
              } else {
                  alert('Error booking an appointment');
              }
          } catch (error) {
              console.error('Error:',error);
              alert('An error occurred. Please try again.');
          }
      });