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
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour}:${minutes} ${ampm}`;
}


// Render appointments
function renderAppointments(appointmentsToRender) {
  let appointmentHTML = '';

  appointmentsToRender.forEach(appointment => {
    appointmentHTML += `
      <div class="appointment">
        <div class="appointment__details">
          <p class="td full-name">${appointment.clientName}</p>
          <p class="td contact">${appointment.clientContact}</p>
          <p class="td date-time">${appointment.appointmentDate} at ${formatTimeWithAMPM(appointment.appointmentTime)}</p>
          <p class="td status">${appointment.appointmentStatus}</p>
          <p class="td action">
            <select class="select-appointment-action" name="appointment-action" id="appointment-action">
                 <option value="">Action</option>
                 <option value="ongoing">Accept</option>
                 <option value="reschedule">Reschedule</option>       
            </select>
          </p>
          <p data-value="show-more-details" class="td toggle-more-details-btn">View</p>  
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
            <button class="appointment-confirm-btn btn" disabled>Confirm</button>
          </div>

        </div>
      </div>
    `;
  });

  const appointmentTableBody = document.querySelector('.manage-appointments-table__tbody').innerHTML = appointmentHTML;
}


// appointment toggle more details
document.querySelector('.manage-appointments-table').addEventListener('click', (e) => {
  const toggleMoreDetailsBtn = e.target.closest('.toggle-more-details-btn');
  if(!toggleMoreDetailsBtn) return;

  const appointment = toggleMoreDetailsBtn.closest('.appointment');
  const moreDetails = appointment.querySelector('.appointment__more-details');
  const toggleBtnValue = toggleMoreDetailsBtn.getAttribute('data-value');

  const showMoreDetails = () => {
    moreDetails.style.display = 'block';
    toggleMoreDetailsBtn.innerText = 'Hide';
    toggleMoreDetailsBtn.removeAttribute('data-value', 'show-more-details');
    toggleMoreDetailsBtn.setAttribute('data-value', 'hide-more-details');
  }

  const hideMoreDetails = () => {
    moreDetails.style.display = 'none';
    toggleMoreDetailsBtn.innerText = 'View';
    toggleMoreDetailsBtn.removeAttribute('data-value', 'hide-more-details');
    toggleMoreDetailsBtn.setAttribute('data-value', 'show-more-details');
  }

  if (toggleBtnValue === 'show-more-details') showMoreDetails()
  else if (toggleBtnValue === 'hide-more-details') hideMoreDetails()
});


// Appointment filter based on the status
const appointmentFilter = document.getElementById('appointment-filter');
appointmentFilter.addEventListener('change', () => {
  const selectedStatus = appointmentFilter.value;
  if (!selectedStatus) {
    renderAppointments(allAppointments);
  } else {
    const filtered = allAppointments.filter(app => app.appointmentStatus === selectedStatus);
    renderAppointments(filtered);
  }
});



// Appointment action update
// function updateActionAppointment(appointmentId, action) {
//   const endpointMap = {
//     completed: 'completed',
//     reschedule: 'reschedule',
//     removed: 'remove'
//   };

//   const endpoint = endpointMap[action];
//   fetch(`http://localhost:5000/api/appointments/${appointmentId}/${endpoint}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ appointmentStatus: action })
//   })
//     .then(res => res.json())
//     .then(data => {
//       Swal.fire({
//         icon: 'success',
//         title: `Appointment ${action}`,
//         text: `Appointment ${action} successfully!`
//       }).then(() => {
//         window.location.reload();
//       });
//     })
//     .catch(err => {
//       console.error("Error rescheduling appointment:", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Appointment Reschedule',
//         text: 'Appointment reschedule Failed!'
//       });
//     });
// }

// action update confirmation
// function alertMsg(appointmentId, updateAction, selectAppointentAction) {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: `Do you really want to ${updateAction} this appointment?`,
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: `Yes, ${updateAction} it!`,
//     cancelButtonText: 'No, keep it'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       updateActionAppointment(appointmentId, updateAction);
//     } else {
//       selectAppointentAction.value = '';
//     }
//   });
// }




// const acceptBtn = document.querySelector('.appointment-accept-btn');
// const confirmBtn = document.querySelector('.appointment-confirm-btn');
// const appointmentStatus = document.querySelector('.appointment .status')


  

// Cancel Accept form
// const cancelBtn = document.querySelector('.cancel-edit-btn');
// if (cancelBtn) {
//   cancelBtn.addEventListener('click', () => {
//     const popUpContainer = document.querySelector('.pop-up-container');
//     popUpContainer.classList.remove('show');
//     popUpContainer.classList.add('hide');
//     setTimeout(() => {
//       popUpContainer.style.display = 'none';
//     }, 600);
//   });
// }







  // const showPopUp = function () {
  //   const popUpContainer = document.querySelector('.pop-up-container');
  //   const appointmentId = appointment._id;
  //   const dateSendField = document.getElementById('date-send');
  //   const displayTime = formatTimeWithAMPM(appointment.appointmentTime);
  //   dateSendField.value = `${appointment.appointmentDate} at ${displayTime}`;
  //   popUpContainer.style.display = 'block';
  //   popUpContainer.classList.add('show');
  //   popUpContainer.classList.remove('hide');
  //   document.getElementById('set-schedule').dataset.appointmentId = appointmentId;
  // };

  // acceptBtn.addEventListener('click', showPopUp);
  // confirmBtn.addEventListener('click', () => {
  //   alertMsg(appointment._id, 'completed', confirmBtn);
  // });


// const selectAppointentAction = document.querySelector('.select-appointment-action');

// selectAppointentAction.addEventListener('change', function () {
//   const appointmentId = appointment._id;
//   if (selectAppointentAction.value === 'ongoing') {
//     showPopUp();
//   } else if (selectAppointentAction.value === 'reschedule') {
//     alertMsg(appointmentId, 'reschedule', selectAppointentAction);
//   }
// });





// // Update appointment status function
// function updateActionAppointment(appointmentId, action) {
//   const endpointMap = {
//     completed: 'completed',
//     reschedule: 'reschedule',
//   };

//   const endpoint = endpointMap[action];
//   fetch(`http://localhost:5000/api/appointments/${appointmentId}/${endpoint}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ appointmentStatus: action })
//   })
//     .then(res => res.json())
//     .then(data => {
//       Swal.fire({
//         icon: 'success',
//         title: `Appointment ${action}`,
//         text: `Appointment ${action} successfully!`
//       }).then(() => {
//         window.location.reload();
//       });
//     })
//     .catch(err => {
//       console.error("Error rescheduling appointment:", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Appointment Reschedule',
//         text: 'Appointment reschedule Failed!'
//       });
//     });
// }

// // SweetAlert for confirmation
// function alertMsg(appointmentId, updateAction, selectAppointentAction) {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: `Do you really want to ${updateAction} this appointment?`,
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: `Yes, ${updateAction} it!`,
//     cancelButtonText: 'No, keep it'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       updateActionAppointment(appointmentId, updateAction);
//     } else {
//       selectAppointentAction.value = '';
//     }
//   });
// }


