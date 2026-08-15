// Advanced Smart Survey Logic for SMA Awareness Portal

document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('smaSurvey');
    const surveySteps = document.getElementById('surveySteps');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('surveyProgress');
    const scoreResult = document.getElementById('scoreResult');
    const finalScoreDisplay = document.getElementById('finalScore');
    const scoreLevelDisplay = document.getElementById('scoreLevel');

    const questions = [
        "Have you ever heard of SMA?",
        "Do you know that SMA is a genetic disorder?",
        "Aware that SMA affects motor neurons?",
        "Know any symptoms associated with SMA?",
        "Aware that genetic testing helps diagnosis?",
        "Know there are different types (1-4)?",
        "Aware it is a leading cause of infant death?",
        "Do you know if there is a complete cure?",
        "Aware that carrier screening identifies risk?",
        "Know physiotherapy is essential?",
        "Aware of newborn screening for SMA?",
        "Know symptoms can appear in adulthood?",
        "Aware SMA is caused by missing SMN1 gene?",
        "Know any local support groups?",
        "Would you participate in an awareness program?"
    ];

    let currentStep = 0;
    const totalSteps = questions.length + 1; // Demographics + 15 Questions

    // Initialize Questions
    questions.forEach((q, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'survey-step d-none';
        stepDiv.dataset.step = index + 1;
        stepDiv.innerHTML = `
            <h5 class="fw-bold mb-4">Question ${index + 1} of 15</h5>
            <p class="lead">${q}</p>
            <div class="mt-3">
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="q${index + 1}" id="q${index + 1}y" value="yes" required>
                    <label class="form-check-label" for="q${index + 1}y">Yes / అవును</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="q${index + 1}" id="q${index + 1}n" value="no">
                    <label class="form-check-label" for="q${index + 1}n">No / లేదు</label>
                </div>
            </div>
        `;
        surveySteps.appendChild(stepDiv);
    });

    function updateStep() {
        const steps = document.querySelectorAll('.survey-step');
        steps.forEach(step => step.classList.add('d-none'));
        document.querySelector(`.survey-step[data-step="${currentStep}"]`).classList.remove('d-none');

        // Update Progress
        const progress = (currentStep / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progress}%`;

        // Update Buttons
        prevBtn.classList.toggle('d-none', currentStep === 0);
        nextBtn.classList.toggle('d-none', currentStep === totalSteps - 1);
        submitBtn.classList.toggle('d-none', currentStep !== totalSteps - 1);
    }

    nextBtn.addEventListener('click', () => {
        if (validateStep()) {
            currentStep++;
            updateStep();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentStep--;
        updateStep();
    });

    function validateStep() {
        const currentInputs = document.querySelector(`.survey-step[data-step="${currentStep}"]`).querySelectorAll('input[required], select[required]');
        let valid = true;
        currentInputs.forEach(input => {
            if (input.type === 'radio') {
                const name = input.name;
                if (!document.querySelector(`input[name="${name}"]:checked`)) valid = false;
            } else if (!input.value) {
                valid = false;
            }
        });
        if (!valid) alert("Please answer before moving to the next step.");
        return valid;
    }

    surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(surveyForm);
        const data = {};
        let score = 0;

        formData.forEach((value, key) => {
            data[key] = value;
            if (key.startsWith('q') && value === 'yes') score++;
        });

        fetch(`${CONFIG.API_BASE_URL}/api/survey/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(() => {
            surveyForm.classList.add('d-none');
            scoreResult.classList.remove('d-none');
            finalScoreDisplay.innerText = `${score}/15`;

            let level = "Low";
            if (score > 10) level = "High Awareness";
            else if (score > 5) level = "Moderate Awareness";
            scoreLevelDisplay.innerText = `Level: ${level}`;
            scoreLevelDisplay.className = `fw-bold text-${level.startsWith('High') ? 'success' : (level.startsWith('Mod') ? 'primary' : 'danger')}`;
        });
    });

    window.shareScore = function() {
        const score = document.getElementById('finalScore').innerText;
        const text = `I just assessed my SMA awareness and scored ${score}! Learn more at the SMA Awareness Portal.`;
        if (navigator.share) {
            navigator.share({
                title: 'SMA Awareness Score',
                text: text,
                url: window.location.href
            });
        } else {
            alert("Score Copied to Clipboard: " + text);
        }
    };

    updateStep();
});
