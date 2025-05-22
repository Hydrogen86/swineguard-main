
window.addEventListener('DOMContentLoaded', function() {
  // For Swine Population (second chart)

  const municipalityList = ['Mogpog', 'Boac', 'Gasan', 'Buenavista', 'SantaCruz', 'Torrijos'];
  const servicesList = ["Iron Supplementation", "Deworming", "ASF Testing", "Blood Testing", "Health Surveillance", "Postpartum Care", "Surgical Castration"];
  const statusList = ["completed", "ongoing", "reschedule", "pending", "removed"];
  const swineTypes = ["Piglet", "Boar", "Gilt", "Sow", "Barrow"];

  // Municipality Counters
  let MogpogSwine = 0;
  let BoacSwine = 0;
  let GasanSwine = 0;
  let BuenavistaSwine = 0;
  let StaCruzSwine = 0;
  let TorrijosSwine = 0;

  let Boar = 0;
  let Barrow = 0;
  let Piglet = 0;
  let Sow = 0;
  let Gilt = 0;

  fetch('http://localhost:5000/api/appointments')
    .then(response => response.json())
    .then(appointments => {
      appointments.forEach(appointment => {
        const municipality = appointment.municipality;
        const status = appointment.appointmentStatus;
        const swineCount = parseInt(appointment.swineCount);
        const type = appointment.swineType;

        if (status !== statusList[4]) { // Exclude 'removed'

          if (municipality === 'Mogpog') MogpogSwine += swineCount;
          else if (municipality === 'Boac') BoacSwine += swineCount;
          else if (municipality === 'Gasan') GasanSwine += swineCount;
          else if (municipality === 'Buenavista') BuenavistaSwine += swineCount;
          else if (municipality === 'SantaCruz' || municipality === 'Sta. Cruz') StaCruzSwine += swineCount;
          else if (municipality === 'Torrijos') TorrijosSwine += swineCount;

          // Swine Type
            if (type === 'Piglet') Piglet += swineCount;
            else if (type === 'Boar') Boar += swineCount;
            else if (type === 'Gilt') Gilt += swineCount;
            else if (type === 'Sow') Sow += swineCount;
            else if (type === 'Barrow') Barrow += swineCount;
        
        }
      });

      const totalSwine = MogpogSwine + BoacSwine + GasanSwine + BuenavistaSwine + StaCruzSwine + TorrijosSwine;
      document.getElementById('all-swine').textContent = totalSwine;

      const piechartPopulation = document.querySelector('#piechart-population');
      if (piechartPopulation) {
        const chart = new ApexCharts(piechartPopulation, {
          series: [MogpogSwine, BoacSwine, GasanSwine, BuenavistaSwine, StaCruzSwine, TorrijosSwine],
          chart: {
            width: 600,
            type: 'pie'
          },
          labels: municipalityList,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: { width: 300 },
              legend: { position: 'bottom' }
            }
          }]
        });
        chart.render();
      } else {
        console.error('Pie chart container for population not found.');
      }

      // Reversed Bar Chart
        const barContainer = document.getElementById('barchart-population');
        var barOptions = {
            series: [{
            data: [Piglet, Boar, Barrow, Sow, Gilt]
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
            categories: [swineTypes[0], swineTypes[1], swineTypes[2], swineTypes[3], swineTypes[4]],
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


    })
    .catch(error => {
      console.error('Error fetching appointments for swine population:', error);
    });

});
