document.getElementById('add-appointments').addEventListener('submit', async function(event) {
    event.preventDefault();

    
    const swineMale = document.getElementById('swine-male').value;
    const swineFemale = document.getElementById('swine-female').value;
    const swineCount = document.getElementById('swine-count').value;
    const swineCountValidation = parseInt(swineCount) === (parseInt(swineMale) + parseInt(swineFemale)); //check id the input are valid
    const clientEmailInput = document.getElementById('client-email');
    const clientEmail = clientEmailInput.value.trim();

    try {
        if (!swineCountValidation) {
            showAlert("Swine Count Error", "Swine Count and gender are not equal", "error");
            return;
        }
        if (clientEmail === '') {
            clientEmailInput.value = 'No Email';
        }
        const appointmentData = {
            appointmentTitle: document.getElementById('appointment-title').value, 
            swineType: document.getElementById('swine-type').value, 
            swineCount: document.getElementById('swine-count').value, 
            appointmentDate: document.getElementById('appointment-date').value, 
            appointmentTime: document.getElementById('appointment-time').value, 
            swineSymptoms: document.getElementById('swine-symptoms').value, 
            swineAge: document.getElementById('swine-age').value, 
            swineMale: document.getElementById('swine-male').value, 
            swineFemale: document.getElementById('swine-female').value, 
            municipality: document.getElementById('municipality').value, 
            barangay: document.getElementById('barangay').value, 
            clientName: document.getElementById('full-name').value, 
            clientContact: document.getElementById('client-phone').value, 
            clientEmail: document.getElementById('client-email').value
        }

        const response = await fetch('http://localhost:5000/api/request/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });

        const result = await response.json();

        if (response.ok) {
            showAlert("Success", "Appointment Created", "success");//Successful Creation of Account
            document.getElementById('add-appointments').reset();
        } else {
            showAlert("Error", result.error || "Something went wrong", "error");
        }

    } catch (error) {
        console.error('Error', error);
        showAlert("Error", "Failed to create appointment", "error");
    }
});

const modal = document.getElementById('add-appointment');
const overlay = document.getElementById('modal-overlay');
const openBtn = document.getElementById('add-appointment-btn');
const closeBtn = document.getElementById('cancel-btn');

openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    if (overlay) overlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
});

//Show Alert Function
function showAlert(title, message, icon) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon
    });
}