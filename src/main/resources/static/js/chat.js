// SMA AI Assistant Logic

const knowledgeBase = {
    "what is sma": "SMA (Spinal Muscular Atrophy) is a genetic disease affecting motor neurons.",
    "symptoms": "Common symptoms include muscle weakness, difficulty breathing, and delays in physical milestones.",
    "is it genetic": "Yes, SMA is an autosomal recessive genetic disorder caused by a mutation in the SMN1 gene.",
    "treatment": "Treatments include gene replacement therapy (like Zolgensma) and SMN2 splicing modifiers (like Spinraza).",
    "diagnosis": "SMA is diagnosed via physical evaluation followed by a definitive genetic blood test.",
    "types": "There are four main types (Type 1 to Type 4), categorized by age of onset and motor function achieved.",
    "hello": "Hi there! I can help you with information about SMA symptoms, diagnosis, and treatments.",
    "help": "You can ask me about symptoms, causes, types, or treatments for SMA."
};

function toggleChat() {
    const chat = document.getElementById('chat-widget');
    chat.style.display = (chat.style.display === 'block') ? 'none' : 'block';
}

function sendMsg() {
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');
    const query = input.value.toLowerCase().trim();

    if (!query) return;

    // Add User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'msg-user';
    userDiv.innerText = input.value;
    body.appendChild(userDiv);

    // AI Logic
    let response = "I'm sorry, I don't have information on that specific topic. Please visit our 'About SMA' page or consult a doctor.";

    for (let key in knowledgeBase) {
        if (query.includes(key)) {
            response = knowledgeBase[key];
            break;
        }
    }

    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'msg-bot';
        botDiv.innerText = response;
        body.appendChild(botDiv);
        body.scrollTop = body.scrollHeight;
    }, 500);

    input.value = '';
    body.scrollTop = body.scrollHeight;
}

document.getElementById('chat-toggle').addEventListener('click', toggleChat);
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMsg();
});
