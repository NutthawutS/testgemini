document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // CPM Calculator Logic
    const totalCostInput = document.getElementById('total-cost');
    const impressionsInput = document.getElementById('impressions');
    const calculateCpmButton = document.getElementById('calculate-cpm');
    const cpmValueSpan = document.getElementById('cpm-value');
    const cpmChartCanvas = document.getElementById('cpmChart');

    let cpmChart; // Variable to hold the Chart.js instance

    const calculateCPM = () => {
        const totalCost = parseFloat(totalCostInput.value);
        const impressions = parseFloat(impressionsInput.value);

        if (isNaN(totalCost) || isNaN(impressions) || impressions === 0) {
            cpmValueSpan.textContent = 'Invalid Input';
            if (cpmChart) {
                cpmChart.destroy();
                cpmChart = null;
            }
            return;
        }

        const cpm = (totalCost / impressions) * 1000;
        cpmValueSpan.textContent = cpm.toFixed(2);

        // Update or create chart
        updateCPMChart(cpm);
    };

    calculateCpmButton.addEventListener('click', calculateCPM);

    // Initial chart setup (empty or default)
    const setupCPMChart = () => {
        const ctx = cpmChartCanvas.getContext('2d');
        cpmChart = new Chart(ctx, {
            type: 'bar', // Using a bar chart for simplicity
            data: {
                labels: ['CPM'],
                datasets: [{
                    label: 'Calculated CPM',
                    data: [0], // Initial data
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#444' // Darker grid lines for black theme
                        },
                        ticks: {
                            color: '#eee' // White ticks for black theme
                        }
                    },
                    x: {
                        grid: {
                            color: '#444' // Darker grid lines for black theme
                        },
                        ticks: {
                            color: '#eee' // White ticks for black theme
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#eee' // White legend text for black theme
                        }
                    }
                }
            }
        });
    };

    const updateCPMChart = (cpm) => {
        if (!cpmChart) {
            setupCPMChart();
        }
        cpmChart.data.datasets[0].data[0] = cpm;
        // Optionally, change color based on CPM value (e.g., green for good, red for bad)
        if (cpm < 10) { // Example threshold
            cpmChart.data.datasets[0].backgroundColor = 'rgba(75, 192, 75, 0.6)'; // Green
            cpmChart.data.datasets[0].borderColor = 'rgba(75, 192, 75, 1)';
        } else if (cpm >= 10 && cpm < 50) {
            cpmChart.data.datasets[0].backgroundColor = 'rgba(255, 206, 86, 0.6)'; // Yellow
            cpmChart.data.datasets[0].borderColor = 'rgba(255, 206, 86, 1)';
        } else {
            cpmChart.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.6)'; // Red
            cpmChart.data.datasets[0].borderColor = 'rgba(255, 99, 132, 1)';
        }
        cpmChart.update();
    };

    // Initialize chart with default data on load
    setupCPMChart();
});
