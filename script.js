let vitalsLog = [];

function analyzeVitals() {
  const hr = parseInt(document.getElementById('hr').value);
  const bp = document.getElementById('bp').value;
  const spo2 = parseInt(document.getElementById('spo2').value);
  const temp = parseFloat(document.getElementById('temp').value);

  let risk = "Good";
  let color = "#4CAF50";

  if (hr < 60 || hr > 100 || spo2 < 95 || temp > 37.5 || temp < 35) {
    risk = "Caution";
    color = "#FFA500";
  }

  if (spo2 < 90 || temp > 39 || hr > 130) {
    risk = "High Risk";
    color = "#F44336";
  }

  document.getElementById("riskMessage").textContent = risk;
  document.getElementById("resultBox").style.backgroundColor = color;

  vitalsLog.push({ hr, bp, spo2, temp });
  if (vitalsLog.length > 10) vitalsLog.shift();

  updateTable();
  drawChart();
}

function updateTable() {
  const tableBody = document.querySelector('#vitalsTable tbody');
  tableBody.innerHTML = '';
  vitalsLog.forEach(v => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = v.hr;
    row.insertCell(1).textContent = v.bp;
    row.insertCell(2).textContent = v.spo2;
    row.insertCell(3).textContent = v.temp;
  });
}

function drawChart() {
  const ctx = document.getElementById('historyChart').getContext('2d');
  if (window.vitalsChart) window.vitalsChart.destroy();

  window.vitalsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: vitalsLog.map((_, i) => `#${i + 1}`),
      datasets: [{
        label: 'SpO₂ (%)',
        data: vitalsLog.map(v => v.spo2),
        backgroundColor: '#ff4e50'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          suggestedMin: 80,
          suggestedMax: 100
        }
      }
    }
  });
}

// Initialize particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 50 },
    size: { value: 3 },
    color: { value: '#ffffff' },
    line_linked: {
      enable: true,
      distance: 120,
      color: '#ffffff',
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 1
    }
  }
});
