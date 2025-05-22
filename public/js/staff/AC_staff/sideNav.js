// Sections
const dashboardSection = document.getElementById('dashboard-section');
const messageSection = document.getElementById('messages-section');
const scheduleSection = document.getElementById('schedule-section');
const appointmentSection = document.getElementById('appointments-section');
const settingSection = document.getElementById('setting-section');

const dashboardLink = document.getElementById('dashboard-link');
const messageLink = document.getElementById('message-link');
const scheduleLink = document.getElementById('schedule-link');
const appointmentLink = document.getElementById('appointment-link');
const settingLink = document.getElementById('setting-link');

document.addEventListener('DOMContentLoaded', function () { setupSideNavBehavior(); });
  
  function setupSideNavBehavior() {
    const sections = [
      dashboardSection,
      messageSection,
      scheduleSection,
      appointmentSection,
      settingSection
    ];
  
    const links = [
      dashboardLink,
      messageLink,
      scheduleLink,
      appointmentLink,
      settingLink
    ];
  
    // Attach click listeners
    links.forEach((link, index) => {
      link.addEventListener('click', () => {
        // Hide all sections
        sections.forEach(section => section.style.display = 'none');
  
        // Show the selected section
        sections[index].style.display = 'block';
  
        // Reset all link backgrounds
        links.forEach(l => l.style.backgroundColor = '#2FC375');
  
        // Highlight the active link
        link.style.backgroundColor = '#09984c';
      });
    });
  
    // Optional: set default view
    sections.forEach(section => section.style.display = 'none');
    sections[0].style.display = 'block';
    links[0].style.backgroundColor = '#2FC375';
}