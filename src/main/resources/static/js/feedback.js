// Feedback System for SMA Awareness Portal

document.addEventListener('DOMContentLoaded', () => {
    let selectedRating = 0;
    const pageName = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.feedback-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectedRating = this.dataset.rating;
            document.getElementById('feedbackForm').classList.remove('d-none');
            // Highlight selected
            document.querySelectorAll('.feedback-btn').forEach(b => b.classList.replace('btn-primary', 'btn-outline-primary'));
            this.classList.replace('btn-outline-primary', 'btn-primary');
        });
    });

    const submitBtn = document.getElementById('submitFeedback');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const comments = document.getElementById('feedbackComment').value;
            const data = {
                pageName: pageName,
                rating: parseInt(selectedRating),
                comments: comments
            };

            fetch(`${CONFIG.API_BASE_URL}/api/feedback/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
                document.getElementById('feedbackForm').classList.add('d-none');
                document.getElementById('feedbackThanks').classList.remove('d-none');
                setTimeout(() => {
                    document.getElementById('feedbackThanks').classList.add('d-none');
                }, 3000);
            });
        });
    }
});
