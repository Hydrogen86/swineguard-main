
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginUser();
        });
    }
});


async function loginUser() {
    try {
        const userData = {
            email: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
        }

        const response = await axios.post( 'http://localhost:5000/api/client/login', userData);

        const data = response.data;

        alertMsg('Success', 'Login successfully', 'success');
        localStorage.setItem('token', data.token);

        // ✅ Use role to determine homepage
        let homepage = '';

        if(data.user.role === 'client') {
            homepage = '/client/homepage';
        } else {
            alertMsg('Error', 'Unauthorized role', 'error');
            console.log('Role from backend:', data.role);
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
