// Sections
const dashboardSection = document.getElementById('dashboard-section');
const inventorySection = document.getElementById('inventory-section');
const settingSection = document.getElementById('setting-section');

const dashboardLink = document.getElementById('dashboard-link');
const inventoryLink = document.getElementById('inventory-link');
const settingLink = document.getElementById('setting-link');

document.addEventListener('DOMContentLoaded', function () { setupSideNavBehavior(); });
  
  function setupSideNavBehavior() {
    const sections = [
      dashboardSection,
      inventorySection,
      settingSection
    ];
  
    const links = [
      dashboardLink,
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