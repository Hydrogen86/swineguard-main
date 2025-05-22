let allAppointments = [];

// Fetch the appointment data from the API
fetch('http://localhost:5000/api/appointments')
  .then(response => response.json())
  .then(appointments => {
    allAppointments = appointments;
    renderAppointments(allAppointments);
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });

// Function to convert 24-hour time format to 12-hour format with AM/PM
function formatTimeWithAMPM(time) {
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minutes} ${ampm}`;
}

// Render appointments
function renderAppointments(appointmentsToRender) {
  let appointmentHTML = '';

  appointmentsToRender.forEach(appointment => {
    appointmentHTML += `
      <div class="appointment" data-id="${appointment._id}">
        <div class="appointment__details">
          <p class="td full-name">${appointment.clientName}</p>
          <p class="td contact">${appointment.clientContact}</p>
          <p class="td date-time">${appointment.appointmentDate} at ${formatTimeWithAMPM(appointment.appointmentTime)}</p>
          <p class="td status">${appointment.appointmentStatus}</p>
          <p class="td action">
            <select class="select-appointment-action" name="appointment-action" id="appointment-action">
                 <option value="">Action</option>
                 <option value="ongoing" ${appointment.appointmentStatus === 'ongoing' ? 'disabled' : ''}>Accept</option>
                 <option value="reschedule" ${appointment.appointmentStatus === 'reschedule' ? 'disabled' : ''}>Reschedule</option>       
                 <option value="removed">Remove</option>       
            </select>
          </p>
          <p data-value="show-more-details" class="td toggle-more-details-btn">View</p>  
          <p class="appointmentID">${appointment._id}</p>  
        </div>
        <div class="appointment__more-details">
          <div class="appointment__more-details-heading">Appointment Details:</div>
          <div class="appointment__more-details-columns">
            <div class="column left">
              <p class="column__detail">
                <span class="column__detail-label">Appointment:</span>
                <span class="column__detail-value">${appointment.appointmentTitle}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Status:</span>
                <span class="column__detail-value">${appointment.appointmentStatus}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Swine Type:</span>
                <span class="column__detail-value">${appointment.swineType}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Swine Count:</span>
                <span class="column__detail-value">${appointment.swineCount}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Swine Male:</span>
                <span class="column__detail-value">${appointment.swineMale}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Swine Female:</span>
                <span class="column__detail-value"> ${appointment.swineFemale}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Swine Age:</span>
                <span class="column__detail-value">${appointment.swineAge} months</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Medicine:</span>
                <span class="column__detail-value">${appointment.medicine}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Amount/mg:</span>
                <span class="column__detail-value">${appointment.dosage}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Note:</span>
                <span class="column__detail-value">${appointment.swineSymptoms}</span>
              </p>
            </div>
            <div class="column right">
              <p class="column__detail">
                <span class="column__detail-label">Client Name:</span>
                <span class="column__detail-value">${appointment.clientName}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Contact:</span>
                <span class="column__detail-value">${appointment.clientContact}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Email:</span>
                <span class="column__detail-value">${appointment.clientEmail}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Municipality:</span>
                <span class="column__detail-value">${appointment.municipality}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Barangay:</span>
                <span class="column__detail-value">${appointment.barangay}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Date:</span>
                <span class="column__detail-value">${appointment.appointmentDate}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Time:</span>
                <span class="column__detail-value">${formatTimeWithAMPM(appointment.appointmentTime)}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Personnel:</span>
                <span class="column__detail-value">${appointment.vetPersonnel}</span>
              </p>
              <p class="column__detail">
                <span class="column__detail-label">Message:</span>
                <span class="column__detail-value">${appointment.vetMessage}</span>
              </p>
            </div>
          </div>
          <div class="buttons-container">
            <button class="appointment-accept-btn btn">Accept</button>
            <button class="appointment-confirm-btn btn">Complete</button>
          </div>
        </div>
      </div>
    `;
  });

  // Now insert the HTML first
  const tableBody = document.querySelector('.manage-appointments-table__tbody');
  if (tableBody) {
    tableBody.innerHTML = appointmentHTML;

    const statusElements = document.querySelectorAll('.td.status');

    statusElements.forEach(el => {
      const status = el.textContent.trim();
      updateStatusStyle(el, status);
    });
  }


  // Now attach listeners
  const acceptForm = document.querySelector('.appointment-accept-form');
  const cancelBtn = document.getElementById('cancel-btn');
  const dateSend = document.getElementById('date-send');

  document.querySelectorAll('.select-appointment-action').forEach(dropdown => {
    const appointmentId = dropdown.closest('.appointment').dataset.id;

    dropdown.addEventListener('change', function () {
      if (this.value === 'ongoing') {
        //const appointment = appointmentsToRender.find(app => app._id === appointmentId);
        const appointment = allAppointments.find(app => app._id === appointmentId);
        const hiddenInput = document.getElementById('appointmentID');

        if (hiddenInput) { hiddenInput.setAttribute('data-appointment-id', appointment._id); } // pass the id of the appointment
        dateSend.value = `${appointment.appointmentDate} at ${formatTimeWithAMPM(appointment.appointmentTime)}`;

        acceptForm.style.display = 'block';
      } else if (this.value === 'reschedule') {
        updateAppointments(appointmentId, 'reschedule');

      } else if (this.value === 'removed') {
        updateAppointments(appointmentId, 'removed');
      }
    });
  });

  document.querySelectorAll('.appointment').forEach((appointmentElement, index) => {
    const appointment = appointmentsToRender[index];

    const acceptBtn = appointmentElement.querySelector('.appointment-accept-btn');
    const confirmBtn = appointmentElement.querySelector('.appointment-confirm-btn');
    const dropdown = appointmentElement.querySelector('.select-appointment-action');
    const appointmentId = dropdown.closest('.appointment').dataset.id;

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        if (appointment.appointmentStatus === 'removed') {
          updateAppointments(appointmentId, 'restore');
        } else {
          // normal accept logic
          if (dateSend && acceptForm) {
            const appointment = allAppointments.find(app => app._id === appointmentId);
            dateSend.value = `${appointment.appointmentDate} at ${formatTimeWithAMPM(appointment.appointmentTime)}`;
            acceptForm.style.display = 'block';
          }
          const hiddenInput = document.getElementById('appointmentID');
          if (hiddenInput) {
            hiddenInput.setAttribute('data-appointment-id', appointment._id);
          }
        }
      });
    }if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (appointment.appointmentStatus === 'removed') {
          deleteAppointment(appointmentId); // DELETE the appointment
        } else {
          updateAppointments(appointment._id, 'completed', confirmBtn);
        }
      });
    }

    //Disable buttons
    if (appointment.appointmentStatus === 'ongoing') {
      acceptBtn.disabled = true;
      confirmBtn.disabled = false;
    } else if (appointment.appointmentStatus === 'completed') {
      acceptBtn.disabled = true;
      confirmBtn.disabled = true;
      dropdown.disabled = true;
    } else if (appointment.appointmentStatus === 'reschedule') {
      acceptBtn.disabled = false;
      acceptBtn.textContent = 'Reschedule';
      confirmBtn.disabled = true;
    } else if (appointment.appointmentStatus === 'pending') {
      acceptBtn.disabled = false;
      confirmBtn.disabled = true;
    } else if (appointment.appointmentStatus === 'removed') {
      dropdown.disabled = true;
      acceptBtn.disabled = false;
      acceptBtn.textContent = 'Restore';
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Delete';
    }
  });

  if (cancelBtn && acceptForm) {
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      acceptForm.style.display = 'none';
      return;
    });
  }
}



// Toggle more details
document.querySelector('.manage-appointments-table').addEventListener('click', e => {
  const btn = e.target.closest('.toggle-more-details-btn');
  if (!btn) return;

  const container = btn.closest('.appointment');
  const moreDetails = container.querySelector('.appointment__more-details');
  const value = btn.getAttribute('data-value');

  if (value === 'show-more-details') {
    moreDetails.style.display = 'block';
    btn.textContent = 'Hide';
    btn.setAttribute('data-value', 'hide-more-details');
  } else {
    moreDetails.style.display = 'none';
    btn.textContent = 'View';
    btn.setAttribute('data-value', 'show-more-details');
  }
});

// Filter appointments by status
const appointmentFilter = document.getElementById('appointment-filter');
if (appointmentFilter) {
  appointmentFilter.addEventListener('change', () => {
    const selectedStatus = appointmentFilter.value;
    if (!selectedStatus) {
      renderAppointments(allAppointments);
    } else {
      const filtered = allAppointments.filter(app => app.appointmentStatus === selectedStatus);
      renderAppointments(filtered);
    }
  });
}


//Color functions for status
function updateStatusStyle(statusElement, statusValue) {
  statusElement.style.backgroundColor = '';
  statusElement.style.border = '';
  statusElement.style.color = '';

  switch (statusValue.toLowerCase()) {
    case 'pending':
      statusElement.style.backgroundColor = '#fff4cc';
      statusElement.style.border = '1px solid #c9a100';
      statusElement.style.color = '#c9a100';
      break;
    case 'completed':
      statusElement.style.backgroundColor = '#d4f5dd';
      statusElement.style.border = '1px solid #2e8b57';
      statusElement.style.color = '#2e8b57';
      break;
    case 'ongoing':
      statusElement.style.backgroundColor = '#e6f7ff';
      statusElement.style.border = '1px solid #007acc';
      statusElement.style.color = '#007acc';
      break;
    case 'reschedule':
      statusElement.style.backgroundColor = '#ffedd4';
      statusElement.style.border = '1px solid #ff9100';
      statusElement.style.color = '#ff9100';
      break;
    case 'removed':
      statusElement.style.backgroundColor = '#ffe6e6';
      statusElement.style.border = '1px solid #cc0000';
      statusElement.style.color = '#cc0000';
      break;
    default:
      statusElement.style.backgroundColor = '#eeeeee';
      statusElement.style.border = '1px solid #ccc';
      statusElement.style.color = '#333';
  }
}



// BACKEND REQUESTING PART

// Delete appointment
function deleteAppointment(appointmentId) {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to delete this appointment?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed deletion
      fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          icon: 'success',
          title: 'Appointment Deleted',
          text: 'Appointment deleted successfully!',
        }).then(() => {
          window.location.reload();
        });
      })
      .catch(err => {
        console.error('Delete error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while deleting the appointment.',
        });
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelled',
        text: 'The appointment was not deleted.',
        icon: 'info'
      });
    }
  });
}

// //Reschedule, Complete, Restore and Remove appointments
function updateAppointments(appointmentId, action, element) {

  const endpointMap = {
        completed: 'completed',
        reschedule: 'reschedule',
        removed: 'removed',
        restore: 'restore'
      };

  let status = action;
   if (action === 'restore') {
     status = 'pending'; // Set to pending when restoring
   }
      

  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to ${action} this appointment?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: `Yes, ${action} it!`,
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed the action
      fetch(`http://localhost:5000/api/appointments/${appointmentId}/${action}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentStatus: status})
      })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          icon: 'success',
          title: `Appointment ${action}`,
          text: `Appointment ${action} successfully!`,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch(err => {
        console.error('Delete error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Something went wrong while ${action} the appointment.`,
        });
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Only reset dropdowns
      if (element && element.tagName === 'element') {
        element.value = ''; // Reset dropdown
      }
      Swal.fire({
        title: 'Cancelled',
        text: `The appointment was not ${action}.`,
        icon: 'info'
      });
    }
  });
}


