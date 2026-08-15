// Advanced Activity Log & Map Logic for SMA Awareness Portal

document.addEventListener('DOMContentLoaded', () => {
    const activitiesContainer = document.getElementById('activitiesContainer');
    const activityForm = document.getElementById('activityForm');
    const adminControls = document.getElementById('adminControls');
    const loginPrompt = document.getElementById('loginPrompt');

    // Admin Security Check
    const isAdmin = localStorage.getItem('sma_admin') === 'true';
    if (isAdmin) {
        adminControls.classList.remove('d-none');
        loginPrompt.classList.add('d-none');
    }

    // Initialize Map (Centering on India for this demo)
    const map = L.map('activityMap').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Load existing activities
    loadActivities();

    if (activityForm) {
        activityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(activityForm);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            fetch(`${CONFIG.API_BASE_URL}/api/activities/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(newActivity => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('addActivityModal'));
                modal.hide();
                activityForm.reset();
                loadActivities();
            })
            .catch(err => console.error('Error adding activity:', err));
        });
    }

    function loadActivities() {
        fetch(`${CONFIG.API_BASE_URL}/api/activities/all`)
            .then(response => response.json())
            .then(activities => {
                if (activities.length === 0) {
                    activitiesContainer.innerHTML = '<div class="alert alert-light text-center">No activities logged yet.</div>';
                    return;
                }

                // Render List
                activitiesContainer.innerHTML = activities.map(act => `
                    <div class="card mb-4 shadow-sm border-0 animate-up">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <div class="bg-light d-flex align-items-center justify-content-center h-100 rounded-start" style="min-height: 150px;">
                                    <span class="text-muted small">📸 Activity Photo</span>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold text-primary">${act.activityName}</h5>
                                    <ul class="list-unstyled mb-2 small">
                                        <li><strong>Date:</strong> ${act.date}</li>
                                        <li><strong>Location:</strong> ${act.location}</li>
                                        <li><strong>Participants:</strong> ${act.participantsCount}</li>
                                    </ul>
                                    <p class="card-text small">${act.description}</p>
                                    ${act.geoTag ? `<p class="small text-muted mb-0"><i class="bi bi-geo-alt-fill"></i> Geo-tagged: ${act.geoTag}</p>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');

                // Update Map Markers
                activities.forEach(act => {
                    if (act.geoTag) {
                        const coords = act.geoTag.split(',').map(c => parseFloat(c));
                        if (coords.length === 2) {
                            L.marker(coords).addTo(map)
                                .bindPopup(`<b>${act.activityName}</b><br>${act.location}<br>${act.participantsCount} participants`);
                        }
                    }
                });
            })
            .catch(err => {
                activitiesContainer.innerHTML = '<div class="alert alert-warning">Run backend to see activities.</div>';
            });
    }
});
