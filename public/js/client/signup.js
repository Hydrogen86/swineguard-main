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


//SUbmit User Details:
async function signUpClient() {
    try {
        const clientData = {
            firstName: document.getElementById('fname'),
            middleName: document.getElementById('mname'),
            lastName: document.getElementById('lname'),
            suffix: document.getElementById('suffix'),
            gender: document.querySelector('input[name="gender"]:checked')?.value || null,

            contact: document.getElementById('phone'),
            barangay: document.getElementById('barangay'),
            municipality: document.getElementById('municipality'),
            email: document.getElementById('user-email'),
            password: document.getElementById('user-password')
        }
    }
    catch {

    }
}