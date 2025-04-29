clientAppointments = []; // Store fetched appointments globally
calendar; 

// Fetch all appointments once at the start
fetch('http://localhost:5000/api/appointments')
  .then(response => response.json())
  .then(data => {
    clientAppointments = data; // Save all appointments globally

    loadCalendarEvents();
  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
  });

// Function to convert 24-hour time format to 12-hour format with AM/PM
function formatTimeWithAMPM(time) {
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minutes} ${ampm}`;
}

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 'auto',
    selectable: true,
    events: [], 
    eventContent: function(arg) {
      // Customize event appearance: just a thin line
      return {
        // html: `<div style="height:4px; background:${arg.event.backgroundColor}; border-radius:2px; margin:2px auto; display:block;"></div>`
        html: `<div style="color:rgb(0, 0, 0); font-weight: bold; font-size: 12px; text-align: center;">${arg.event.title}</div>`
      };
    },
    dateClick: function(info) {
      openPopup(info.dateStr);
    }
  });

  calendar.render();
});

function loadCalendarEvents() {
  const calendarEvents = clientAppointments
    .filter(app => app.appointmentStatus === 'ongoing')
    // .map(app => ({
    //   title: '',
    //   start: app.appointmentDate,
    //   allDay: true,
    //   backgroundColor: '#2196F3', // Blue color for ongoing
    //   borderColor: '#2196F3',
    //   display: 'block'
    // }));
    .map(app => ({
      title: app.appointmentTitle,  // <-- ADD the title text here
      start: app.appointmentDate,
      allDay: true,
      backgroundColor: '#49a9f8',
      borderColor: '#2196F3',
      display: 'block'
    }));

  // Load the events into the calendar
  calendar.removeAllEvents(); 
  calendar.addEventSource(calendarEvents);
}

function openPopup(dateStr) {

  const dateObj = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);
  document.getElementById('selectedDate').innerText = formattedDate;

  const container = document.getElementById('timeSlots');
  container.innerHTML = '';

  // Filter only Ongoing appointments for that day
  let appointmentsForDay = clientAppointments.filter(app =>
    app.appointmentDate === dateStr && app.appointmentStatus === 'ongoing'
  );

  // Sort by appointmentTime (earliest to latest)
  appointmentsForDay.sort((a, b) => {
    return a.appointmentTime.localeCompare(b.appointmentTime);
  });

  if (appointmentsForDay.length > 0) {
    appointmentsForDay.forEach(app => {
      container.innerHTML += `
        <div class="calendar-eventPopup">
          <p><strong>Time:</strong> ${formatTimeWithAMPM(app.appointmentTime)}</p>
          <p><strong>Event:</strong> ${app.appointmentTitle}</p>
          <p><strong>Address:</strong> ${app.barangay}, ${app.municipality}</p>
          <p><strong>Client:</strong> ${app.clientName}</p>
          <p><strong>Contact:</strong> ${app.clientContact}</p>
        </div>
      `;
    });
  } else {
    container.innerHTML = '<p>No appointments for this day.</p>';
  }

  document.getElementById('schedulePopup').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
  document.getElementById('schedulePopup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}
