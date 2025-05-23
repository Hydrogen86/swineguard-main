
//Divs
const userInfo= document.querySelector('.user-info');
const userContact = document.querySelector('.user-contact');
const userEmailAcc = document.querySelector('.user-email');
const userAgreement =  document.querySelector('.user-agreement');

displayForInputs();

//Button
const nextBtns = document.querySelectorAll('.next-btn');
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');

// Function to validate input fields
function isEmptyInput(inputs) {
    return inputs.some(input => input.value.trim() === '');
}

// Next button click event
nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission

        if (index === 0) {
            // Step 1: Check if name and gender are filled
            let inputs = [
                document.getElementById('fname'),
                document.getElementById('lname')
            ];
            let gender = document.querySelector('input[name="gender"]:checked');

            if (isEmptyInput(inputs) || inputs[0].value.length < 2 || inputs[1].value.length < 2 || !gender) {
                showAlert('Required', 'Please fill in all required fields before proceeding.', 'warning');
                return;
            }

            userInfo.style.display = 'none';
            userContact.style.display = 'block';
        } 
        
        else if (index === 1) {
            // Step 2: Check if contact information is filled
            let inputs = [
                document.getElementById('phone'),
                document.getElementById('municipality'),
                document.getElementById('barangay')
            ];

            if (isEmptyInput(inputs) || inputs[0].value.length < 11) {
                showAlert('Required', 'Please fill in all required fields before proceeding.', 'warning');
                return;
            }

            userContact.style.display = 'none';
            userEmailAcc.style.display = 'block';
        } 
        
        else if (index === 2) {
            // Step 3: Check if email and password are filled
            let inputs = [
                document.getElementById('user-email'),
                document.getElementById('user-password'),
                document.getElementById('confirm-password')
            ];

            if (isEmptyInput(inputs)) {
                showAlert('Required', 'Please fill in all required fields before proceeding.', 'warning');
                return;
            }
            //Check if the password are same with Confirm password
            if (inputs[1].value !== inputs[2].value) {
                showAlert('Required', 'Incorrect Password', 'warning');
                return;
            }
            // Check the length of the password
            if (inputs[1].value.length < 6) {
                showAlert('Required', 'Password is too short', 'warning');
                return;
            }

            userEmailAcc.style.display = 'none';
            userAgreement.style.display = 'block';
        }
    });
});


// Initially hide all except the first section
function displayForInputs(){
    userInfo.style.display = 'block';
    userContact.style.display = 'none';
    userEmailAcc.style.display = 'none';
    userAgreement.style.display = 'none';
}

const mainWrapper = document.querySelector('.main-wrapper');

mainWrapper.addEventListener('click', function (event) {
    if (event.target.id === 'login-link') {
        document.querySelector('.signup-container').style.display = 'none';
        document.querySelector('.login-container').style.display = 'block';
    }

    if (event.target.id === 'signup-link') {
        document.querySelector('.signup-container').style.display = 'block';
        document.querySelector('.login-container').style.display = 'none';
    }
});

//Show Alert Function
function showAlert(title, message, icon) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon
    });
}

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // await signUpClient();
    try {
        const clientData = {
            firstName: document.getElementById('fname').value,
            middleName: document.getElementById('mname').value,
            lastName: document.getElementById('lname').value,
            suffix: document.getElementById('suffix').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || null,

            contact: document.getElementById('phone').value,
            barangay: document.getElementById('barangay').value,
            municipality: document.getElementById('municipality').value,
            email: document.getElementById('user-email').value,
            password: document.getElementById('user-password').value
        }

        const response = await axios.post('http://localhost:5000/api/signup', clientData);
        
        const data = response.data;
        localStorage.setItem('token', data.token);

        if (response.status === 201) {

            Swal.fire({
                title: 'Success!',
                text: 'Account created successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 1200
            });

            // 🔁 Redirect after 1.5s
            setTimeout(() => {
                window.location.href = '/client/homepage';
            }, 1500);
        } else {
            showAlert("Error", "Something went wrong", "error");
        }

    }
    catch (err) {
        console.error(err);
        // Check if the error is from the server (e.g. validation error, duplicate email, etc.)
        if (err.response && err.response.status === 400) {
            showAlert("Error", err.response.data.error || "Invalid data", "error");

            // Highlight email input
            const userEmailTxtBox = document.getElementById('user-email');
            userEmailTxtBox.style.borderColor = '#d94a4a';
            userEmailTxtBox.style.color = '#c72a2a';

            // Show the email step again
            userAgreement.style.display = 'none';
            userEmailAcc.style.display = 'block';
        } else {
            showAlert('Error', 'Creating account failed', 'error');
        }
    }
});

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

