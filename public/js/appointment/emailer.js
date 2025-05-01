document.querySelector('').addEventListener('click', () => {
    // Emailer
    fetch(`http://localhost:5000/api/send-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientEmail: appointment.clientEmail,
            vetMessage: appointment.vetMessage
        })
        });
})