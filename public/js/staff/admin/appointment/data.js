
document.addEventListener('DOMContentLoaded', () => {
    const appointmentTitle = document.getElementById('appointment-title');
    const swineType = document.getElementById('swine-type');
    // const medicineList = document.getElementById('medicine-list');
    const personnelList = document.getElementById('available-personnel');
    const municipalitySelect = document.getElementById('municipality');
    const barangaySelect = document.getElementById('barangay');
    let barangayData = {};

    // Load barangays from external JSON file
    fetch('http://localhost:5000/api/addresses')
      .then(response => response.json())
      .then(data => barangayData = data.Municipals)
      .catch(error => console.error('Error loading barangay data:', error));


    municipalitySelect.addEventListener('change', () => {
        const selectedMunicipality = municipalitySelect.value;

        // Clear current barangay options
        barangaySelect.innerHTML = '<option value="">Barangay</option>';

        if (barangayData[selectedMunicipality]) {
            barangayData[selectedMunicipality].forEach(barangay => {
                const option = document.createElement('option');
                option.value = barangay;
                option.textContent = barangay;
                barangaySelect.appendChild(option);
            });
        }
    });

    //Load services from external JSON file
    fetch ('http://localhost:5000/api/services')
        .then(response => response.json())
        .then(data => {
            const services = data.Services.appointmentServices;

            appointmentTitle.innerHTML = '<option value="">Appointment Title</option>';
            services.forEach(service => {
                const option = document.createElement('option');
                option.value = service;
                option.textContent = service;
                appointmentTitle.appendChild(option);
            });

        })
        .catch(error => {
            console.error('Error loading services data:', error);
        });

    //Load swine type from external JSON file
    fetch ('http://localhost:5000/api/swines')
        .then(response => response.json())
        .then(data => {
            const swineList = data.SwineType.swines;

            swineType.innerHTML = '<option value="">Swine Type</option>';
            swineList.forEach(swine => {
                const option = document.createElement('option');
                option.value = swine;
                option.textContent = swine;
                swineType.appendChild(option);
            });

        })
        .catch(error => {
            console.error('Error loading swine type data:', error);
        });

    // //Load swine medicines from external JSON file
    // fetch ('http://localhost:5000/api/medicines')
    // .then(response => response.json())
    // .then(data => {
    //     const medicines = data.Medicine.swineVaccines;

    //     medicineList.innerHTML = '<option value="">Medicine here.</option>';
    //     medicines.forEach(meds => {
    //         const option = document.createElement('option');
    //         option.value = meds;
    //         option.textContent = meds;
    //         medicineList.appendChild(option);
    //     });

    // })
    // .catch(error => {
    //     console.error('Error loading swine type data:', error);
    // });

    // Load swine medicines from external JSON file
    fetch('http://localhost:5000/api/get/item')
    .then(response => response.json())
    .then(data => {
    // Create a dropdown menu with the item names
    const medicineList = document.getElementById('medicine-list'); // Ensure this is your <select> element
    

    medicineList.innerHTML = '<option value="">Select a Medicine</option>'; // Default placeholder

    // Loop through the medicines array and populate the dropdown with item names
    data.forEach(med => {
        const option = document.createElement('option');
        option.value = med.itemName;  // Set the value to itemName
        option.textContent = med.itemName;  // Set the visible text to itemName
        medicineList.appendChild(option);
    });
    })
    .catch(error => {
    console.error('Error loading swine type data:', error);
    });



    //Load vet personnel from external JSON file
    fetch ('http://localhost:5000/api/personnel')
    .then(response => response.json())
    .then(data => {
        const personnels = data.Personnel.Animal_Health_Services_Division;

        personnelList.innerHTML = '<option value="">Personnel</option>';
        personnels.forEach(person => {
            const option = document.createElement('option');
            option.value = person;
            option.textContent = person;
            personnelList.appendChild(option);
        });

    })
    .catch(error => {
        console.error('Error loading swine type data:', error);
    });
});