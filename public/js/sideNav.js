// Sections
const dashboardSection = document.getElementById('dashboard-section');
const databaseSection = document.getElementById('database-section');
const messageSection = document.getElementById('messages-section');
const scheduleSection = document.getElementById('schedule-section');
const appointmentSection = document.getElementById('appointments-section');
const inventorySection = document.getElementById('inventory-section');
const settingSection = document.getElementById('setting-section');

const dashboardLink = document.getElementById('dashboard-link');
const databaseLink = document.getElementById('database-link');
const messageLink = document.getElementById('message-link');
const scheduleLink = document.getElementById('schedule-link');
const appointmentLink = document.getElementById('appointment-link');
const inventoryLink = document.getElementById('inventory-link');
const settingLink = document.getElementById('setting-link');

document.addEventListener('DOMContentLoaded', function () { setupSideNavBehavior(); });
  
  function setupSideNavBehavior() {
    const sections = [
      dashboardSection,
      databaseSection,
      messageSection,
      scheduleSection,
      appointmentSection,
      inventorySection,
      settingSection
    ];
  
    const links = [
      dashboardLink,
      databaseLink,
      messageLink,
      scheduleLink,
      appointmentLink,
      inventoryLink,
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
        links.forEach(l => l.style.backgroundColor = '#17e476');
  
        // Highlight the active link
        link.style.backgroundColor = '#09984c';
      });
    });
  
    // Optional: set default view
    sections.forEach(section => section.style.display = 'none');
    sections[0].style.display = 'block';
    links[0].style.backgroundColor = '#17e476';
}