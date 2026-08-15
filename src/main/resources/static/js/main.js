// Main JavaScript for SMA Awareness Portal

document.addEventListener('DOMContentLoaded', () => {
    console.log('SMA Awareness Portal Loaded');

    // Search functionality
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('searchInput').value.toLowerCase();
            if (!query) return;

            // Simple search mapping
            if (query.includes('symptom')) window.location.href = 'symptoms.html';
            else if (query.includes('diagnos')) window.location.href = 'diagnosis.html';
            else if (query.includes('treat')) window.location.href = 'treatment.html';
            else if (query.includes('about') || query.includes('what')) window.location.href = 'about.html';
            else if (query.includes('survey')) window.location.href = 'survey.html';
            else alert('No specific page found for "' + query + '". Try searching for Symptoms, Diagnosis, or Treatment.');
    // Newsletter handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.classList.add('d-none');
            document.getElementById('newsletterThanks').classList.remove('d-none');
        });
    }

    // Show Notification Toast after 3 seconds
    const toastEl = document.getElementById('awarenessToast');
    if (toastEl) {
        setTimeout(() => {
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        }, 3000);
    }
});

// Accessibility Features
function changeFontSize(size) {
    document.body.classList.remove('font-lg', 'font-xl');
    if (size === 'large') document.body.classList.add('font-lg');
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}
