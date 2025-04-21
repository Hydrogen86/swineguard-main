// Sections
document.addEventListener('DOMContentLoaded', function () {
    const appointmentSection = document.getElementById('appointments-section');
    const dashboardSection = document.getElementById('dashboard-section');
  
    const appointmentLink = document.getElementById('appointment-link');
    const dashboardLink = document.getElementById('dashboard-link');
  
    appointmentLink.addEventListener('click', function(e){ 
        e.preventDefault(); 
        appointmentSection.style.display = 'block';
        dashboardSection.style.display = 'none';
        appointmentLink.style.backgroundColor = '#09984c';
        dashboardLink.style.backgroundColor = '#17e476';
    });
  
    dashboardLink.addEventListener('click', function(e){ 
        e.preventDefault(); 
        appointmentSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        appointmentLink.style.backgroundColor = '#17e476';
        dashboardLink.style.backgroundColor = '#09984c';
    });
  });

function displaySections(param1, param2) {
    appointmentSection.style.display = param1;
    dashboardSection.style.display = param2;
}