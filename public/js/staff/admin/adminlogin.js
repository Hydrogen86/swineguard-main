
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
                        // window.location.href = '/adminLoginPage.html';
                        window.location.replace('/adminLoginPage.html');
                    });
                }
            });
            
        });
    }
});
async function loginAdmin() {
    try {
        const adminData = {
            email: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
        }

        const response = await axios.post( 'http://localhost:5000/api/admin/login', adminData);

        const data = response.data;

        alertMsg('Success', 'Login successfully', 'success');
        localStorage.setItem('token', data.token);

        // ✅ Use role to determine homepage
        let homepage = '';

        switch (data.user.role) {
            case 'admin':
                homepage = '/admin/homepage';
                break;
            case 'ac_staff':
                homepage = '/ac/homepage';
                break;
            case 'ic_staff':
                homepage = '/ic/homepage';
                break;
            default:
                alertMsg('Error', 'Unauthorized role', 'error');
                console.log('Role from backend:', data.role);
                return;
        }

        // 🔁 Redirect after 1.5s
        setTimeout(() => {
            window.location.href = homepage;
        }, 1500);

    } catch (err) {
        // alertMsg('Error', 'Login Failed. Please try again.', 'error');
        const errorMsg = err.response?.data?.error || 'Login Failed. Please try again.';
        alertMsg('Error', errorMsg, 'error');
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
