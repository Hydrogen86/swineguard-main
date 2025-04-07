// Fetch the appointment data from the API
fetch('http://localhost:5000/api/appointments')
  .then(response => response.json())
  .then(appointments => {
    // Get the container where the appointments will be displayed
    const container = document.getElementById('appointments-container');
    
    // Loop through the appointments and create HTML for each
    appointments.forEach(appointment => {
      const appointmentDiv = document.createElement('div');
      appointmentDiv.classList.add('appointment');
      
      // Create appointment details as a string of HTML
      appointmentDiv.innerHTML = `
        <h2>${appointment.appointmentTitle}</h2>
        <p><strong>Swine Type:</strong> ${appointment.swineType}</p>
        <p><strong>Swine Count:</strong> ${appointment.swineCount}</p>
        <p><strong>Date:</strong> ${appointment.appointmentDate}</p>
        <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
        <p><strong>Status:</strong> ${appointment.appointmentStatus}</p>
        <p><strong>Municipality:</strong> ${appointment.municipality}</p>
        <p><strong>Barangay:</strong> ${appointment.barangay}</p>
        <p><strong>Client Name:</strong> ${appointment.clientName}</p>
        <p><strong>Contact:</strong> ${appointment.clientContact}</p>
        <p><strong>Email:</strong> ${appointment.clientEmail}</p>
        <hr>
      `;
      
      // Append the appointment to the container
      container.appendChild(appointmentDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });