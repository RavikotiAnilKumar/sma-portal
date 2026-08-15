// Results visualization for SMA Awareness Portal

document.addEventListener('DOMContentLoaded', () => {
    // Fetch statistics from backend
    fetch(`${CONFIG.API_BASE_URL}/api/results/statistics`)
        .then(response => response.json())
        .then(stats => {
            console.log('Stats from backend:', stats);
            // Update UI Counters
            updateCounters(stats);

            // Generate Insights
            generateInsights(stats);

            // 1. Comparison Chart (Before vs After by Category)
            renderComparisonChart(stats.categoryComparison);

            // 2. Awareness Doughnut Chart
            renderOverallDoughnut(stats);

            // 3. Question-wise Bar Chart
            renderQuestionChart(stats.questionStats);

            // 4. Age Group Chart
            renderDemographicChart('ageGroupChart', stats.ageGroupStats, 'Age Group Awareness (%)', 'rgba(153, 102, 255, 0.7)');

            // 5. Location Chart
            renderDemographicChart('locationChart', stats.locationStats, 'Location Awareness (%)', 'rgba(255, 159, 64, 0.7)');
        })
        .catch(err => {
            console.log('Backend not reachable, using dummy data', err);
            // In a real project, you could show a message to the user here
        });

    function updateCounters(stats) {
        if(document.getElementById('participantCount'))
            document.getElementById('participantCount').innerText = stats.totalParticipants || 0;
        if(document.getElementById('awarenessBefore'))
            document.getElementById('awarenessBefore').innerText = (stats.awarenessBefore || 0) + '%';
        if(document.getElementById('awarenessAfter'))
            document.getElementById('awarenessAfter').innerText = (stats.awarenessAfter || 0) + '%';
        if(document.getElementById('improvement'))
            document.getElementById('improvement').innerText = '+' + (stats.improvement || 0) + '%';
    }

    function generateInsights(stats) {
        const content = document.getElementById('insightsContent');
        if (!content) return;

        const growth = stats.improvement || 0;
        let message = "";

        if (growth > 50) {
            message = `The SMA Awareness Program was <strong>highly successful</strong>. Overall community knowledge increased by <strong>${growth}%</strong>, with significant improvements in the understanding of genetic testing and treatment options.`;
        } else if (growth > 20) {
            message = `The program showed <strong>steady progress</strong>. Community awareness grew by <strong>${growth}%</strong>, indicating that the educational portal is effectively reaching the public.`;
        } else {
            message = `Current data shows an awareness growth of <strong>${growth}%</strong>. Further community outreach and interactive sessions are recommended to maximize the portal's impact.`;
        }

        content.innerHTML = message;
    }

    function renderComparisonChart(data) {
        if (!data) return;
        const ctx = document.getElementById('comparisonChart').getContext('2d');
        const categories = Object.keys(data);
        const beforeData = categories.map(cat => data[cat].before);
        const afterData = categories.map(cat => data[cat].after);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [
                    {
                        label: 'Before Awareness Activity',
                        data: beforeData,
                        backgroundColor: 'rgba(220, 53, 69, 0.7)',
                        borderColor: 'rgba(220, 53, 69, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'After Awareness Activity',
                        data: afterData,
                        backgroundColor: 'rgba(40, 167, 69, 0.7)',
                        borderColor: 'rgba(40, 167, 69, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }

    function renderOverallDoughnut(stats) {
        const ctx = document.getElementById('awarenessPieChart').getContext('2d');
        const aware = stats.awarenessAfter || 0;
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Aware', 'Not Aware'],
                datasets: [{
                    data: [aware, 100 - aware],
                    backgroundColor: ['rgba(0, 86, 179, 0.8)', 'rgba(200, 200, 200, 0.8)']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    function renderQuestionChart(data) {
        if (!data) return;
        const ctx = document.getElementById('questionBarChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            indexAxis: 'y',
            data: {
                labels: Object.keys(data).map(text => text.length > 30 ? text.substring(0, 30) + '...' : text),
                datasets: [{
                    label: 'Positive Responses (%)',
                    data: Object.values(data),
                    backgroundColor: 'rgba(0, 123, 255, 0.6)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: { x: { beginAtZero: true, max: 100 } }
            }
        });
    }

    function renderDemographicChart(canvasId, data, label, color) {
        if (!data) return;
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: label,
                    data: Object.values(data),
                    backgroundColor: color,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }
});
