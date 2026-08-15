const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About SMA",
        nav_symptoms: "Symptoms",
        nav_diagnosis: "Diagnosis",
        nav_treatment: "Treatment",
        nav_survey: "Take Survey",
        nav_results: "Results",
        nav_activities: "Activities",
        nav_resources: "Resources",
        hero_title: "KNOW SMA, SPREAD AWARENESS",
        hero_subtitle: "Supporting early recognition and understanding of Spinal Muscular Atrophy.",
        btn_learn: "Learn About SMA",
        btn_survey: "Take Survey",
        section_what_is: "What is SMA?",
        footer_copy: "&copy; 2026 SMA Awareness Portal. All Rights Reserved."
    },
    te: {
        nav_home: "హోమ్",
        nav_about: "SMA గురించి",
        nav_symptoms: "లక్షణాలు",
        nav_diagnosis: "వ్యాధి నిర్ధారణ",
        nav_treatment: "చికిత్స",
        nav_survey: "సర్వే చేయండి",
        nav_results: "ఫలితాలు",
        nav_activities: "కార్యక్రమాలు",
        nav_resources: "వనరులు",
        hero_title: "SMA తెలుసుకోండి, అవగాహన పెంచండి",
        hero_subtitle: "స్పైనల్ మస్కులర్ అట్రోఫీని ముందుగా గుర్తించడం మరియు అర్థం చేసుకోవడంలో మద్దతు ఇవ్వడం.",
        btn_learn: "SMA గురించి తెలుసుకోండి",
        btn_survey: "సర్వే తీసుకోండి",
        section_what_is: "SMA అంటే ఏమిటి?",
        footer_copy: "&copy; 2026 SMA అవగాహన పోర్టల్. అన్ని హక్కులు ప్రత్యేకించబడినవి."
    }
};

function setLanguage(lang) {
    localStorage.setItem('sma_lang', lang);
    applyTranslations();
}

function applyTranslations() {
    const lang = localStorage.getItem('sma_lang') || 'en';
    const t = translations[lang];

    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.dataset.t;
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });

    // Update language toggle button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

document.addEventListener('DOMContentLoaded', applyTranslations);
