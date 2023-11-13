let myChart; 

function getExchangeRate() {
  const selectedCurrency = document.getElementById('currency').value;
  const apiUrl = `https://api.frankfurter.app/latest?from=${selectedCurrency}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const rates = data.rates;
      const labels = Object.keys(rates);
      const values = Object.values(rates);

      updateChart(labels, values);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function updateChart(labels, values) {

  if (myChart) {
    myChart.destroy();
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Valor de la moneda',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}