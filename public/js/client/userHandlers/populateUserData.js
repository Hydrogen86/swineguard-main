
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found');
        window.location.href = '../../clientLoginPage.html'; // redirect to login
        return;
    }

    const clientName = document.getElementById('user-firstName');

    try {
        const response = await axios.get('http://localhost:5000/api/client/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data;

        if (response.status === 200) {
            clientName.textContent = data.firstName;
        } else {
            clientName.textContent = 'Failed to load user name';
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        clientName.textContent = 'Error loading user';
    }

});