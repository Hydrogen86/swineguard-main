
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginAdmin();
        });
    }

    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();

            Swal.fire({
                title: 'Are you sure?',
                text: 'You will be logged out!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('token');
                    Swal.fire('Logged out!', 'You have been logged out.', 'success').then(() => {
                        window.location.href = '/adminLoginPage.html';
                    });
                }
            });
        });
    }
});
async function loginAdmin() {
    try {
        const adminData = {
            adminEmail: document.getElementById('login-email').value,
            adminPassword: document.getElementById('login-password').value
        }
        // Something to fetch
        const response = await fetch( 'http://localhost:5000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( adminData )
        });

        const data = await response.json();
        if(response.ok) {
            alertMsg('Success', 'Login successfully', 'success');
            localStorage.setItem('token', data.token);

            // 🔹 Redirect to Homepage.html after 1.5 seconds
            setTimeout(() => {
                window.location.href = `/adminHomepage?token=${data.token}`;
            }, 1500);
        }
        else {
            showAlert('Error', data.error, 'error');
        }

    } catch (err) {
        alertMsg('Error', 'Something went wrong. Please try again.', 'error');
    }
}


//Show Alert Function
function alertMsg(title, message, icon) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon
    });
}

// Show hide Password
const togglePass = document.getElementById('togglePassword');
if (!togglePass) console.log('no error');
else {
    togglePass.addEventListener('click', function () {
        const passwordField = document.getElementById('login-password');
        const icon = this;

        const isPassword = passwordField.getAttribute('type') === 'password';

        passwordField.setAttribute('type', isPassword ? 'text' : 'password');
        icon.src = isPassword 
            ? './images-and-icons/icons/hidden.png' 
            : './images-and-icons/icons/show.png';
    });
}
