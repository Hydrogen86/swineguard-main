const municipalitySelect = document.getElementById("municipality");
const barangaySelect = document.getElementById("barangay");


// Add select option in municipal and barangays select
fetch('http://localhost:5000/api/addresses')
  .then(res => res.json())
  .then(addresses => {
    const municipals = Object.keys(addresses.Municipals);

    municipals.forEach(municipal => {
      const option = document.createElement("option");
      option.value = municipal;
      option.textContent = municipal;
      municipalitySelect.appendChild(option);
    });

    municipalitySelect.addEventListener("change", () => {
      const selectedMunicipality = municipalitySelect.value;

      if (selectedMunicipality && addresses.Municipals[selectedMunicipality]) {
        addresses.Municipals[selectedMunicipality].forEach(barangay => {
          const option = document.createElement("option");
          option.value = barangay;
          option.textContent = barangay;
          barangaySelect.appendChild(option);
        });
        barangaySelect.disabled = false;
      } else {
        barangaySelect.disabled = true;
      }
    });
  });

  

// Open and Close addAppointment
const addAppointmentContainer = document.querySelector('.add-appointment-container');

document.querySelector('.add-appointment-btn').
  addEventListener('click', () => {
    addAppointmentContainer.style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
  });
  
document.querySelector('.cancel-add-appointment-btn').
  addEventListener('click', () => {
    addAppointmentContainer.style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
  });


//Show Alert Function
function showAlert(title, message, icon) {
  Swal.fire({
      title: title,
      text: message,
      icon: icon
  });
}


document.getElementById('add-appointments-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const swineMale = document.getElementById('swine-male').value;
    const swineFemale = document.getElementById('swine-female').value;
    const clientEmailInput = document.getElementById('client-email');
    const clientEmail = clientEmailInput.value.trim();
    const swineCount = document.getElementById('swine-count').value;
    const swineCountValidation = parseInt(swineCount) === (parseInt(swineMale) + parseInt(swineFemale)); //check id the input are valid
 
    try {
        if (!swineCountValidation) {
            showAlert("Swine Count Error", "Swine Count and gender are not equal", "error");
            return;
        }
        if (clientEmail === '') clientEmailInput.value = 'No Email';
        
        
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
            showAlert("Success", "Appointment Created", "success");
            document.getElementById('add-appointments-form').reset();
        } else {
            showAlert("Error", result.error || "Something went wrong", "error");
        }
    } catch (error) {
        console.error('Error', error);
        showAlert("Error", "Failed to create appointment", "error");
    }
});


