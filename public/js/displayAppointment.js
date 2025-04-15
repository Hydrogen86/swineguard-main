// Store all appointments here
let allAppointments = [];

// Function to convert 24-hour time format to 12-hour format with AM/PM
function formatTimeWithAMPM(time) {
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour}:${minutes} ${ampm}`;
}

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

// Render appointments based on array passed in
function renderAppointments(appointmentsToRender) {
  const container = document.getElementById('appointments-container');
  container.innerHTML = ''; // Clear previous content

  // Table wrapper
  const table = document.createElement('table');

  // Create and append thead
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Contact</th>
      <th>Date & Time</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  appointmentsToRender.forEach(appointment => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${appointment.clientName}</td>
      <td>${appointment.clientContact}</td>
      <td>${appointment.appointmentDate} at ${formatTimeWithAMPM(appointment.appointmentTime)}</td>
      <td>${appointment.appointmentStatus}</td>
      <td>
        <select class="appointment-option">
          <option value="">Action</option>
          <option value="ongoing">Accept</option>
          <option value="reschedule">Reschedule</option>
          <option value="remove">Remove</option>
        </select>

        <span class="view-btn">View</span>
      </td>
    `;

    const extraInfoRow = document.createElement('tr');
    extraInfoRow.classList.add('appointment-info');
    extraInfoRow.innerHTML = `
      <td colspan="5">
        <p class="capitalized"><strong>Swine Type:</strong> ${appointment.appointmentTitle}</p>
        <p class="capitalized"><strong>Swine Type:</strong> ${appointment.swineType}</p>
        <p><strong>Swine Count:</strong> ${appointment.swineCount}</p>
        <p><strong>Date:</strong> ${appointment.appointmentDate}</p>
        <p><strong>Time:</strong> ${formatTimeWithAMPM(appointment.appointmentTime)}</p>
        <p><strong>Note:</strong> ${appointment.swineSymptoms}</p>
        <p><strong>Age:</strong> ${appointment.swineAge} months</p>
        <p><strong>Male:</strong> ${appointment.swineMale}</p>
        <p><strong>Female:</strong> ${appointment.swineFemale}</p>
        <p><strong>Municipality:</strong> ${appointment.municipality}</p>
        <p><strong>Barangay:</strong> ${appointment.barangay}</p>
        <p><strong>Client Name:</strong> ${appointment.clientName}</p>
        <p><strong>Contact:</strong> ${appointment.clientContact}</p>
        <p><strong>Email:</strong> ${appointment.clientEmail}</p><br>
        <p><strong>Status:</strong> ${appointment.appointmentStatus}</p>
        <p><strong>Personnel:</strong> ${appointment.vetPersonnel}</p>
        <p><strong>Medicine:</strong> ${appointment.medicine}</p>
        <p><strong>Amount/mg:</strong> ${appointment.dosage}</p>
        <p><strong>Message:</strong> ${appointment.vetMessage}</p>
        <button class="accept-btn">Accept</button>
        <button class="confirm-btn" disabled>Confirm</button>
      </td>
    `;

    tbody.appendChild(row);
    tbody.appendChild(extraInfoRow);

    const acceptBtn = extraInfoRow.querySelector('.accept-btn');
    const confirmBtn = extraInfoRow.querySelector('.confirm-btn');

    // ➕ Add this logic
    if (appointment.appointmentStatus === 'ongoing') {
      acceptBtn.disabled = true;
      confirmBtn.disabled = false;
    }
    if (appointment.appointmentStatus === 'completed') {
      acceptBtn.disabled = true;
      confirmBtn.disabled = true;
    }

    const dropdown = row.querySelector('.appointment-option');

    const showPopUp = function () {
      const popUpContainer = document.querySelector('.pop-up-container');
      const appointmentId = appointment._id;
      const dateSendField = document.getElementById('date-send');
      const displayTime = formatTimeWithAMPM(appointment.appointmentTime);
      dateSendField.value = `${appointment.appointmentDate} at ${displayTime}`;
      popUpContainer.style.display = 'block';
      popUpContainer.classList.add('show');
      popUpContainer.classList.remove('hide');
      document.getElementById('set-schedule').dataset.appointmentId = appointmentId;
    };

    acceptBtn.addEventListener('click', showPopUp);
    confirmBtn.addEventListener('click', () => {
      alertMsg(appointment._id, 'completed', confirmBtn);
    });

    const viewBtn = row.querySelector('.view-btn');

    viewBtn.addEventListener('click', () => {
      const isVisible = extraInfoRow.style.display === 'table-row';
      
      // Hide all other rows
      const allExtraRows = document.querySelectorAll('.appointment-info');
      const allViewBtns = document.querySelectorAll('.view-btn');
      allExtraRows.forEach(r => r.style.display = 'none');
      allViewBtns.forEach(btn => btn.textContent = 'View');

      // If not visible, show this one
      if (!isVisible) {
        extraInfoRow.style.display = 'table-row';
        viewBtn.textContent = 'Back';
      }
    });

    dropdown.addEventListener('change', function () {
      const appointmentId = appointment._id;
      if (dropdown.value === 'ongoing') {
        showPopUp();
      } else if (dropdown.value === 'reschedule') {
        alertMsg(appointmentId, 'reschedule', dropdown);
      } else if (dropdown.value === 'remove') {
        alertMsg(appointmentId, 'removed', dropdown);
      }
    });
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

// Update appointment status function
function updateActionAppointment(appointmentId, action) {
  const endpointMap = {
    completed: 'completed',
    reschedule: 'reschedule',
    removed: 'remove'
  };

  const endpoint = endpointMap[action];
  fetch(`http://localhost:5000/api/appointments/${appointmentId}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ appointmentStatus: action })
  })
    .then(res => res.json())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: `Appointment ${action}`,
        text: `Appointment ${action} successfully!`
      }).then(() => {
        window.location.reload();
      });
    })
    .catch(err => {
      console.error("Error rescheduling appointment:", err);
      Swal.fire({
        icon: 'error',
        title: 'Appointment Reschedule',
        text: 'Appointment reschedule Failed!'
      });
    });
}

// SweetAlert for confirmation
function alertMsg(appointmentId, updateAction, dropdown) {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to ${updateAction} this appointment?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: `Yes, ${updateAction} it!`,
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      updateActionAppointment(appointmentId, updateAction);
    } else {
      dropdown.value = '';
    }
  });
}

// Filter dropdown listener
const filterDropdown = document.getElementById('appointment-filter');
filterDropdown.addEventListener('change', () => {
  const selectedStatus = filterDropdown.value;
  if (!selectedStatus) {
    renderAppointments(allAppointments);
  } else {
    const filtered = allAppointments.filter(app => app.appointmentStatus === selectedStatus);
    renderAppointments(filtered);
  }
});
