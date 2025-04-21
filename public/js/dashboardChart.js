const municipalityList = ['Mogpog', 'Boac', 'Gasan', 'Buenavista', 'SantaCruz', 'Torrijos'];
const servicesList = ["Iron Supplementation", "Deworming", "ASF Testing",  "Blood Testing", "Health Surveillance", "Postpartum Care", "Surgical Castration"];
const statusList = ["completed", "ongoing",  "reschedule", "pending", "removed"];

// Municipality
let Mogpog = 0;
let Boac = 0;
let Gasan = 0;
let Buenavista = 0;
let StaCruz = 0;
let Torrijos = 0;

//Appointment Status
let completed = 0;
let ongoing = 0;
let pending = 0;
let reschedule = 0;

// Services
let ironSupplementation = 0;
let dewroming = 0;
let asfTest = 0;
let bloodTest = 0;
let healthSurveillance = 0;
let postpartumCare = 0;
let castration = 0;

fetch('http://localhost:5000/api/appointments')
  .then(response => response.json())
  .then(appointments => {
    // Loop through the appointments array (assumes it's an array!)
    appointments.forEach(appointment => {
      const municipality = appointment.municipality;
      const service = appointment.appointmentTitle;
      const status = appointment.appointmentStatus;

      // Municipality
      if (municipality === 'Mogpog' && status !== statusList[4]) Mogpog++;
      else if (municipality === 'Boac' && status !== statusList[4]) Boac++;
      else if (municipality === 'Gasan' && status !== statusList[4]) Gasan++;
      else if (municipality === 'Buenavista' && status !== statusList[4]) Buenavista++;
      else if (municipality === 'SantaCruz' && status !== statusList[4] || municipality === 'Sta. Cruz' && status !== statusList[4]) StaCruz++;
      else if (municipality === 'Torrijos' && status !== statusList[4]) Torrijos++;

        // Appointment Status
      if (status === statusList[0]) completed++;
      else if (status === statusList[1]) ongoing++;
      else if (status === statusList[2]) reschedule++;
      else if (status === statusList[3]) pending++;

       //  services
      if (service === servicesList[0] && status !== statusList[4]) ironSupplementation++;
      else if (service === servicesList[1] && status !== statusList[4]) dewroming++;
      else if (service === servicesList[2] && status !== statusList[4]) asfTest++;
      else if (service === servicesList[3] && status !== statusList[4]) bloodTest++;
      else if (service === servicesList[4] && status !== statusList[4]) healthSurveillance++;
      else if (service === servicesList[5] && status !== statusList[4]) postpartumCare++;
      else if (service === servicesList[6] && status !== statusList[4]) castration++;
    });

    // Once data is ready, render the chart
    const chartContainer = document.getElementById('piechart-container');
    const total = document.getElementById('all-appointments').textContent = (parseInt(Mogpog+Boac+Gasan+Buenavista+StaCruz+Torrijos));

    const options = {
      series: [Mogpog, Boac, Gasan, Buenavista, StaCruz, Torrijos],
      chart: {
        width: 600,
        type: 'pie',
        toolbar: { show: true }
      },
      labels: [municipalityList[0], municipalityList[1], municipalityList[2], municipalityList[3], municipalityList[4], municipalityList[5],],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const chart = new ApexCharts(chartContainer, options);
    chart.render();


    // Reversed Bar Chart
    const barContainer = document.getElementById('barchart-container');
    var barOptions = {
        series: [{
        data: [completed, ongoing, reschedule, pending]
    }],
        chart: {
        type: 'bar',
        height: 350,
        width: 450
    },
    plotOptions: {
        bar: {
        horizontal: true,
        }
    },
    dataLabels: {
        enabled: true
    },
    xaxis: {
        categories: [statusList[0], statusList[1], statusList[2], statusList[3]],
    },
    grid: {
        xaxis: {
        lines: {
            show: true
        }
        }
    },
    yaxis: {
        reversed: true,
        axisTicks: {
        show: true
        }
    }
    };

    var barchart = new ApexCharts(barContainer, barOptions);
    barchart.render();
// Default Bar Graph
    const servicesContainer = document.getElementById('verticalchart-container');
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300', '#581845', '#17A2B8'];

    var servicesOptions = {
        series: [{
        data: [ironSupplementation, dewroming, asfTest, bloodTest, healthSurveillance, postpartumCare, castration]
        }],
            chart: {
            height: 350,
            width: 450,
            type: 'bar',
            events: {
            click: function(chart, w, e) {
                // console.log(chart, w, e)
            }
            }
        },
        colors: colors,
        plotOptions: {
            bar: {
            columnWidth: '45%',
            distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [ servicesList[0], servicesList[1], servicesList[2], servicesList[3], servicesList[4], servicesList[5], servicesList[6] ],
            labels: {
                style: {
                    colors: colors,
                    fontSize: '12px'
                }
            }
        }
    };

    var barchartVertical = new ApexCharts(servicesContainer, servicesOptions);
    barchartVertical.render();

    // Progress Bar
    // Success
    const successBar = document.getElementById('success-progressBar').value = progressBarValue(completed, total);
    const successPercentage = document.getElementById('success-percentage').textContent = `${progressBarValue(completed, total)}%`;
    // On Progress
    const onProgressBar = document.getElementById('ongoing-progressBar').value = progressBarValue(ongoing, total);
    const onProgressPercentage = document.getElementById('ongoing-percentage').textContent = `${progressBarValue(ongoing, total)}%`;
    // Failed
    const pendingBar = document.getElementById('pending-progressBar').value = progressBarValue(pending, total);
    const pendingPercentage = document.getElementById('pending-percentage').textContent = `${progressBarValue(pending, total)}%`;
    //Archive
    const archiveBar = document.getElementById('failed-progressBar').value = progressBarValue(reschedule, total);
    const archivePercentage = document.getElementById('failed-percentage').textContent = `${progressBarValue(reschedule, total)}%`;


  })
  .catch(error => {
    console.error('Error fetching appointments:', error);
});

function progressBarValue (progress, total) {
    let percentage = (progress / total) * 100;
    let rounded = percentage.toFixed(1);
    return rounded;
}


