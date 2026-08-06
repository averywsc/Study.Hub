const timerDisplay = document.getElementById('timerDisplay');
const timerLabel = document.getElementById('timerLabel');
const timerStartBtn = document.getElementById('timerStartBtn');
const timerPauseBtn = document.getElementById('timerPauseBtn');
const timerResetBtn = document.getElementById('timerResetBtn');
const focusInput = document.getElementById('focusInput');
const focusSecInput = document.getElementById('focusSecInput');
const breakInput = document.getElementById('breakInput');
const breakSecInput = document.getElementById('breakSecInput');

if (timerDisplay) {
    let secondsLeft = 25 * 60;
    let isBreak = false;
    let intervalId = null;

    function getFocusSeconds() {
        return (parseInt(focusInput.value) * 60) + parseInt(focusSecInput.value);
    }

    function getBreakSeconds() {
        return (parseInt(breakInput.value) * 60) + parseInt(breakSecInput.value);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    }

    function updateDisplay() {
        timerDisplay.textContent = formatTime(secondsLeft);
        timerLabel.textContent = isBreak ? 'Break Time' : 'Focus Session';
    }

    function tick() {
        if (secondsLeft > 0) {
            secondsLeft--;
            updateDisplay();
        } else {
            isBreak = !isBreak;
            secondsLeft = isBreak ? getBreakSeconds() : getFocusSeconds();
            updateDisplay();
            alert(isBreak ? 'Focus session done! Time for a break.' : 'Break over! Back to focus.');
        }
    }

    const timerInputs = [focusInput, focusSecInput, breakInput, breakSecInput];

    timerStartBtn.addEventListener('click', function () {
        if (intervalId) return;
        timerInputs.forEach(function (input) { input.disabled = true; });
        intervalId = setInterval(tick, 1000);
    });

    timerPauseBtn.addEventListener('click', function () {
        clearInterval(intervalId);
        intervalId = null;
    });

    timerResetBtn.addEventListener('click', function () {
        clearInterval(intervalId);
        intervalId = null;
        timerInputs.forEach(function (input) { input.disabled = false; });
        isBreak = false;
        secondsLeft = getFocusSeconds();
        updateDisplay();
    });

    function updateFromInputs() {
        if (intervalId) return;
        secondsLeft = isBreak ? getBreakSeconds() : getFocusSeconds();
        updateDisplay();
    }

    focusInput.addEventListener('input', updateFromInputs);
    focusSecInput.addEventListener('input', updateFromInputs);
    breakInput.addEventListener('input', updateFromInputs);
    breakSecInput.addEventListener('input', updateFromInputs);

    updateDisplay();
}

const promptSubject = document.getElementById('promptSubject');
const promptGrid = document.getElementById('promptGrid');

if (promptGrid) {
    const prompts = {
        math: [
            "Explain the method you used to solve this problem to someone else in the group.",
            "What's a real-world situation where this equation would apply?",
            "What mistake would a student commonly make on this type of question?",
            "Can you solve this a different way and get the same answer?",
            "What's the first step you always check before starting this type of problem?"
        ],
        biology: [
            "Explain this process in your own words without using the textbook terms.",
            "How does this system connect to something else we've studied?",
            "What would happen if this process failed or stopped working?",
            "Draw a diagram and explain it to the group.",
            "What's an exam question you think could be asked on this topic?"
        ],
        physics: [
            "Explain this concept using an everyday example.",
            "What formula applies here and why?",
            "What would change in this scenario if one variable doubled?",
            "Where do students usually lose marks on this type of question?",
            "Can you explain this without using any numbers?"
        ],
        chemistry: [
            "Explain what's happening at a particle level in this reaction.",
            "Why does this reaction happen the way it does?",
            "What's a real-world example of this reaction or process?",
            "What would you check first if this question stumped you in an exam?",
            "Talk through the steps you'd take to answer this question."
        ],
        history: [
            "What's the strongest piece of evidence for this argument?",
            "How would someone with an opposing view respond to this point?",
            "Why did this event happen when it did, not earlier or later?",
            "What's the long-term significance of this event?",
            "How would you structure an essay paragraph on this topic?"
        ],
        geography: [
            "What natural and human factors are both at play here?",
            "How would this event affect a different type of location?",
            "What's the biggest consequence of this event, and why?",
            "How would you explain this concept using a real place we've studied?",
            "What data or evidence supports this idea?"
        ],
        economics: [
            "Explain this concept as if teaching it to someone with no economics background.",
            "What's a real-world example of this happening in New Zealand?",
            "How does this concept connect to inflation or another topic we've studied?",
            "What would happen if this factor changed?",
            "What's a common misconception about this topic?"
        ],
        english: [
            "What's the strongest piece of evidence for this interpretation of the text?",
            "How does this technique affect the reader?",
            "What's an alternative interpretation of this scene or idea?",
            "How does this connect to the wider themes of the text?",
            "What's a strong topic sentence for a paragraph on this idea?"
        ]
    };

    function renderPrompts(subject) {
        promptGrid.innerHTML = '';
        prompts[subject].forEach(function (prompt) {
            const card = document.createElement('div');
            card.className = 'prompt-card';
            card.textContent = prompt;
            promptGrid.appendChild(card);
        });
    }

    promptSubject.addEventListener('change', function () {
        renderPrompts(promptSubject.value);
    });

    renderPrompts(promptSubject.value);
}

const themeMenuBtn = document.getElementById('themeMenuBtn');
const themeMenuDropdown = document.getElementById('themeMenuDropdown');
const themeOptions = document.querySelectorAll('.theme-option');

if (themeMenuBtn) {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeMenuBtn.addEventListener('click', function () {
        themeMenuDropdown.classList.toggle('open');
    });

    document.addEventListener('click', function (event) {
        if (!themeMenuBtn.contains(event.target) && !themeMenuDropdown.contains(event.target)) {
            themeMenuDropdown.classList.remove('open');
        }
    });

    themeOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            const theme = option.dataset.theme;
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            localStorage.setItem('theme', theme);
            themeMenuDropdown.classList.remove('open');
        });
    });
}