
// Function to convert 24-hour time format to 12-hour format with AM/PM
function formatTimeWithAMPM(time) {
    const [hours, minutes] = time.split(':'); // Split the time into hours and minutes
    let hour = parseInt(hours, 10); // Convert hours to an integer
    const ampm = hour >= 12 ? 'PM' : 'AM'; // Determine AM or PM
    hour = hour % 12; // Convert hour to 12-hour format
    hour = hour ? hour : 12; // Handle 0 as 12 (midnight)
    return `${hour}:${minutes} ${ampm}`; // Return formatted time with AM/PM
}

// Fetch the appointment data from the API
fetch('http://localhost:5000/api/appointments')
  .then(response => response.json())
  .then(appointments => {
    const container = document.getElementById('appointments-container');

    appointments.forEach(appointment => {
      const appointmentDiv = document.createElement('div');
      appointmentDiv.classList.add('appointment');
      appointmentDiv.setAttribute('data-id', appointment._id); // Add an ID attribute to each appointment

      appointmentDiv.innerHTML = `
        <h2>${appointment.appointmentTitle}</h2>
        <select class="appointment-option">
            <option value="">Action</option>
            <option value="ongoing">Accept</option>
            <option value="reject">Reject</option>
            <option value="reschedule">Reschedule</option>
            <option value="remove">Remove</option>
        </select>
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
        <button class="accept-btn">Accept</button>
      `;

      // Add event listeners for the Accept button and dropdown
      const acceptBtn = appointmentDiv.querySelector('.accept-btn');
      const dropdown = appointmentDiv.querySelector('.appointment-option');

        // Show the popup when the Accept button is clicked
        const showPopUp = function () {
            const popUpContainer = document.querySelector('.pop-up-container');
            const appointmentId = appointmentDiv.getAttribute('data-id'); // Get the appointment ID

            // Set the date-sent value in the form, including the time in AM/PM format
            const dateSendField = document.getElementById('date-send');
            const displayTime = formatTimeWithAMPM(appointment.appointmentTime); // Format time to 12-hour format
            dateSendField.value = `${appointment.appointmentDate} at ${displayTime}`; // Populate the date field with the sent date and formatted time

            // Trigger the pop-up for the specific appointment
            popUpContainer.style.display = 'block'; // Show before animation
            popUpContainer.classList.add('show');
            popUpContainer.classList.remove('hide');

            // Set the appointment ID in the form
            document.getElementById('set-schedule').dataset.appointmentId = appointmentId;
        };

      // When the Accept button is clicked
      acceptBtn.addEventListener("click", showPopUp);

      // When the dropdown value is "Accept"
      dropdown.addEventListener("change", function () {
        const appointmentId = appointmentDiv.getAttribute('data-id'); // Get the appointment ID
        if (dropdown.value === 'ongoing') {
          showPopUp(); // Call the same function to show the popup
        }
        else if (dropdown.value === 'reject') {
            Swal.fire({
              title: 'Are you sure?',
              text: 'Do you really want to reject this appointment?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, reject it!',
              cancelButtonText: 'No, keep it'
          }).then((result) => {
              if (result.isConfirmed) { rejectAppointment(appointmentId); } 
              else { dropdown.value = ''; }
          });
        }
      });

      // Append the appointment to the container
      container.appendChild(appointmentDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });

// Cancel pop-up functionality
const cancelBtn = document.querySelector('.cancel-edit-btn');
if (cancelBtn) {
  cancelBtn.addEventListener('click', () => {
    const popUpContainer = document.querySelector('.pop-up-container');
    popUpContainer.classList.remove('show');
    popUpContainer.classList.add('hide');
    setTimeout(() => {
      popUpContainer.style.display = 'none';
    }, 600);
  });
}

//Function marking the appointment as rejected:
function rejectAppointment (appointmentId) {
  fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            appointmentStatus: 'reschedule'
        })
    })
    .then(res => res.json())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: 'Appointment Reschedule',
            text: 'Appointment reschedule successfully!',
          }).then(() => {
            window.location.reload(); // Reload the page
          });

    })
    .catch(err => {
        console.error("Error rescheduling appointment:", err);
        Swal.fire({
            icon: 'error',
            title: 'Appointment Reschedule',
            text: 'Appointment reschedule Failed!',
          });
    });

}
