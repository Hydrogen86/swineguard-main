const checkBtn = document.getElementById('check-schedule');

checkBtn.addEventListener('click', function() {
    document.getElementById('schedule-section').style.display = 'block';
    document.getElementById('appointments-section').style.display = 'none';
    document.querySelector('.appointment-accept-form').style.display = 'none';
});