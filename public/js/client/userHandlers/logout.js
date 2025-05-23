
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
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
                axios.post('http://localhost:5000/api/logout', {}, {
                    withCredentials: true // 🔑 Send cookies with request
                })
                .then(response => {
                    Swal.fire('Logged out!', response.data.message, 'success').then(() => {
                        // window.location.href = '/clientLoginPage.html';
                         //prevent the user from returning to the previous (protected) page
                        window.location.replace('/clientLoginPage.html');
                    });
                })
                .catch(error => {
                    Swal.fire('Error', 'Logout failed.', 'error');
                    console.error(error);
                });
            }
        });
    });
}
