const municipalitySelect = document.getElementById('municipality');
const barangaySelect = document.getElementById('barangay');
let barangayData = {};

async function loadAddressData() {
    try {
        const res = await axios.get('http://localhost:5000/api/addresses');
        const municipals = res.data.Municipals;

        // Store for barangay reference
        barangayData = municipals;

        // Clear and populate municipality dropdown
        municipalitySelect.innerHTML = '<option value="">Select Municipality</option>';
        Object.keys(municipals).forEach(municipality => {
            const option = document.createElement('option');
            option.value = municipality;
            option.textContent = municipality;
            municipalitySelect.appendChild(option);
        });

        // Listen for municipality change
        municipalitySelect.addEventListener('change', () => {
            const selected = municipalitySelect.value;
            barangaySelect.disabled = false;
            barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

            if (barangayData[selected]) {
                barangayData[selected].forEach(barangay => {
                    const option = document.createElement('option');
                    option.value = barangay;
                    option.textContent = barangay;
                    barangaySelect.appendChild(option);
                });
            }
        });

    } catch (error) {
        console.error('Failed to load address data:', error);
    }
}

loadAddressData();
