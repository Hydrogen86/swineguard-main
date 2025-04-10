// Handle saving the new schedule
const popupForm = document.querySelector('.pop-up-container form');
popupForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const dateInput = document.getElementById('set-schedule').value;
    const timeInput = document.getElementById('set-time').value;
    const appointmentId = document.getElementById('set-schedule').dataset.appointmentId;

    if (!dateInput || !timeInput) {
        alert("Please enter both date and time.");
        return;
    }

    fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            appointmentDate: dateInput,
            appointmentTime: timeInput,
            appointmentStatus: 'ongoing' // Optional: mark as ongoing
        })
    })
    .then(res => res.json())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: 'Appointment Schedule',
            text: 'Appointment set successfully!',
          }).then(() => {
            window.location.reload(); // Reload the page
          });

        // Hide the popup
        const popUpContainer = document.querySelector('.pop-up-container');
        popUpContainer.classList.remove('show');
        popUpContainer.classList.add('hide');
        setTimeout(() => {
            popUpContainer.style.display = 'none';
        }, 600);

    })
    .catch(err => {
        console.error("Error updating appointment:", err);
        Swal.fire({
            icon: 'error',
            title: 'Appointment Schedule',
            text: 'Appointment schedule has been Failed!',
          });
    });
});
