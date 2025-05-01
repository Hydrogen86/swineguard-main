// const approvalForm = document.querySelector('.appointment-accept-form');
// approvalForm.addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent form from refreshing the page

//     const dateInput = document.getElementById('set-schedule').value;
//     const timeInput = document.getElementById('set-time').value;
//     const medAmount = document.getElementById('medicine-amount').value;
//     const vetMedicine = document.getElementById('medicine-list').value;
//     const personnel = document.getElementById('available-personnel').value;
//     const messages = document.getElementById('vet-message').value;

//     // Get the appointment ID from the dataset attribute
//     const appointmentId = document.getElementById('appointmentID').dataset.appointmentId;
//     //const appointmentId = document.querySelector('.appointment').dataset.id;

//     // if (!appointmentId) {
//     //     alert("Appointment ID is missing!");
//     //     return;
//     // }

//     // if (!dateInput || !timeInput) {
//     //     alert("Please enter both date and time.");
//     //     return;
//     // }

//     // // Display loading indicator
//     // const loading = Swal.fire({
//     //     title: 'Saving...',
//     //     text: 'Please wait while we update the appointment.',
//     //     allowOutsideClick: false,
//     //     didOpen: () => {
//     //         Swal.showLoading();
//     //     }
//     // });

//     fetch(`http://localhost:5000/api/appointments/${appointmentId}/update`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             appointmentDate: dateInput,
//             appointmentTime: timeInput,
//             vetPersonnel: personnel,
//             medicine: vetMedicine,
//             dosage: medAmount,
//             vetMessage: messages,
//             appointmentStatus: 'ongoing'
//         })
//     })
//     .then(res => res.json())
//     .then(() => {
//         // loading.close();  // Close the loading indicator
//         Swal.fire({
//             icon: 'success',
//             title: 'Appointment Schedule',
//             text: 'Appointment set successfully!',
//         }).then(() => {
//             window.location.reload(); // Reload the page
//         });

//         // Hide the popup
//         document.querySelector('.appointment-accept-form').style.display = 'none';
//     })
//     .catch(err => {
//         // loading.close();  // Close the loading indicator
//         console.error("Error updating appointment:", err);
//         Swal.fire({
//             icon: 'error',
//             title: 'Appointment Schedule',
//             text: 'Appointment schedule has failed!',
//         });
//     });
// });


const approvalForm = document.querySelector('.appointment-accept-form');

approvalForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const dateInput = document.getElementById('set-schedule').value;
    const timeInput = document.getElementById('set-time').value;
    const medAmount = document.getElementById('medicine-amount').value;
    const vetMedicine = document.getElementById('medicine-list').value;
    const personnel = document.getElementById('available-personnel').value;
    const messages = document.getElementById('vet-message').value;

    // Get the appointment ID from the dataset attribute
    const appointmentId = document.getElementById('appointmentID').dataset.appointmentId;

    // Update the appointment
    fetch(`http://localhost:5000/api/appointments/${appointmentId}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            appointmentDate: dateInput,
            appointmentTime: timeInput,
            vetPersonnel: personnel,
            medicine: vetMedicine,
            dosage: medAmount,
            vetMessage: messages,
            appointmentStatus: 'ongoing'
        })
    })
    .then(res => res.json())
    .then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Appointment Schedule',
            text: 'Appointment set successfully!',
        }).then(() => {
            // Fetch the email of the client from appointment
            fetch(`http://localhost:5000/api/email/${appointmentId}`)
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                const userEmail = data.email; // Get the email from the response
                
                // Send email to the user
                fetch(`http://localhost:5000/api/send-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        clientEmail: userEmail, // Use the fetched userEmail
                        message: messages
                    })
                })
                .then(response => response.json())
                .then(() => {
                    // Reload the page after the email has been sent
                    window.location.reload(); 
                })
                .catch(error => {
                    console.error('Error sending email:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Email Sending Failed',
                        text: 'There was an issue sending the email.',
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching email:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Email Fetch Failed',
                    text: 'There was an issue fetching the email.',
                });
            });
        });
    })
    .catch(err => {
        console.error("Error updating appointment:", err);
        Swal.fire({
            icon: 'error',
            title: 'Appointment Schedule',
            text: 'Appointment schedule has failed!',
        });
    });

    // Hide the popup
    document.querySelector('.appointment-accept-form').style.display = 'none';
});
