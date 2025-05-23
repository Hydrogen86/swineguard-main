document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found');
        window.location.href = '/adminLoginPage.html'; // redirect to login
        return;
    }

    const idInputBox = document.getElementById('admin-id');
    const nameInputBox = document.getElementById('admin-name');
    const contactInputBox = document.getElementById('admin-contact');
    const addressInputBox = document.getElementById('admin-address');
    const emailInputBox = document.getElementById('admin-email');
    const passwordInputBox = document.getElementById('admin-password');


    try {
        const response = await axios.get('http://localhost:5000/api/admin/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = response.data;

        if (response.status === 200) {
            idInputBox.textContent = data._id;
            nameInputBox.value = `${data.firstName} ${data.middleName} ${data.lastName}`;
            contactInputBox.value = data.contact;
            addressInputBox.value = `${data.barangay}, ${data.municipality}`;
            emailInputBox.value = data.email;
            passwordInputBox.value = data.password;
        } else {
            errorData();
        }

    } catch (error) {
        console.error('Error fetching admin details:', error);
        errorData();
    }

   
    function errorData () {
        const errorMsg = 'Failed to load.'

        idInputBox.textContent = errorMsg;
        nameInputBox.value = errorMsg;
        contactInputBox.value = errorMsg;
        addressInputBox.value = errorMsg;
        emailInputBox.value = errorMsg;
        passwordInputBox.value = errorMsg;
    }
});


    // fetch('http://localhost:5000/api/admin/details', {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // })
    // .then(response => response.json())
    // .then(admin => {
    //     if (admin) {
    //         idInputBox.textContent = admin._id;
    //         nameInputBox.value = `${admin.firstName} ${admin.middleName} ${admin.lastName}`;
    //         contactInputBox.value = admin.contact;
    //         addressInputBox.value = `${admin.barangay}, ${admin.municipality}`;
    //         emailInputBox.value = admin.email;
    //         passwordInputBox.value = admin.password;
            
    //     }
        
    //     // console.log(token);
    // })
    // .catch(error => {
    //     console.error('Error loading admin details', error);
    // });