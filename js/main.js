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

const settingsMenuBtn = document.getElementById('settingsMenuBtn');
const settingsMenuDropdown = document.getElementById('settingsMenuDropdown');
const settingsOptions = document.querySelectorAll('.settings-option');

if (settingsMenuBtn) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedTextSize = localStorage.getItem('textSize') || 'normal';
    const savedFont = localStorage.getItem('font') || 'default';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if (savedTextSize === 'large') {
        document.documentElement.classList.add('text-large');
    } else if (savedTextSize === 'small') {
        document.documentElement.classList.add('text-small');
    }

    if (savedFont === 'dyslexic') {
        document.documentElement.classList.add('font-dyslexic');
    }

    function markSelected() {
        settingsOptions.forEach(function (option) {
            option.classList.remove('selected');
            if (option.dataset.theme === savedTheme || option.dataset.textsize === savedTextSize || option.dataset.font === savedFont) {
                option.classList.add('selected');
            }
        });
    }
    markSelected();

    settingsMenuBtn.addEventListener('click', function () {
        settingsMenuDropdown.classList.toggle('open');
    });

    document.addEventListener('click', function (event) {
        if (!settingsMenuBtn.contains(event.target) && !settingsMenuDropdown.contains(event.target)) {
            settingsMenuDropdown.classList.remove('open');
        }
    });

    settingsOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            if (option.dataset.theme) {
                const theme = option.dataset.theme;
                document.body.classList.toggle('dark-mode', theme === 'dark');
                localStorage.setItem('theme', theme);
            }

            if (option.dataset.textsize) {
                const size = option.dataset.textsize;
                document.documentElement.classList.remove('text-large', 'text-small');
                if (size === 'large') document.documentElement.classList.add('text-large');
                if (size === 'small') document.documentElement.classList.add('text-small');
                localStorage.setItem('textSize', size);
            }

            if (option.dataset.font) {
                const font = option.dataset.font;
                document.documentElement.classList.toggle('font-dyslexic', font === 'dyslexic');
                localStorage.setItem('font', font);
            }

            settingsOptions.forEach(function (opt) { opt.classList.remove('selected'); });
            option.classList.add('selected');
        });
    });
}

const listingGrid = document.getElementById('listingGrid');
const levelFilter = document.getElementById('levelFilter');
const modeFilter = document.getElementById('modeFilter');

if (listingGrid) {
    const listings = [
        { subject: "Mathematics", level: "L2", mode: "online", time: "Wed 4:00 PM", join: "Google Meet" },
        { subject: "Biology", level: "L3", mode: "in-person", time: "Thu 3:30 PM, Library", join: "In person" },
        { subject: "Chemistry", level: "L2", mode: "online", time: "Mon 5:00 PM", join: "Discord" },
        { subject: "English", level: "L3", mode: "in-person", time: "Fri 12:30 PM, Room 12", join: "In person" },
        { subject: "Physics", level: "L3", mode: "online", time: "Tue 6:00 PM", join: "Google Meet" },
        { subject: "Geography", level: "L2", mode: "in-person", time: "Wed 12:30 PM, Room 4", join: "In person" }
    ];

    function renderListings() {
        const level = levelFilter.value;
        const mode = modeFilter.value;

        listingGrid.innerHTML = '';

        listings
            .filter(function (item) {
                return (level === 'all' || item.level === level) && (mode === 'all' || item.mode === mode);
            })
            .forEach(function (item) {
                const card = document.createElement('div');
                card.className = 'listing-card';
                card.innerHTML =
                    '<div class="listing-card-top">' +
                        '<span class="listing-subject">' + item.subject + '</span>' +
                        '<span class="listing-level">' + item.level + '</span>' +
                    '</div>' +
                    '<p class="listing-time">' + item.time + '</p>' +
                    '<a href="#" class="listing-join">' + item.join + '</a>';
                listingGrid.appendChild(card);
            });
    }

    levelFilter.addEventListener('change', renderListings);
    modeFilter.addEventListener('change', renderListings);

    renderListings();
}

const standardSelect = document.getElementById('standardSelect');
const notesCard = document.getElementById('notesCard');
const practiceButtons = document.getElementById('practiceButtons');

if (standardSelect) {
    const subjectKey = document.body.dataset.subject;

    const standardsData = {
        biology: {
            AS91157: {
                title: "AS91157 — Demonstrate understanding of genetic variation and change",
                notes: [
                    "Covers how genetic variation arises, including mutation, meiosis, and recombination.",
                    "Understand the difference between genotype and phenotype, and how environment can influence expression.",
                    "Be able to explain natural selection and how it drives evolutionary change over time.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91157-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91157-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91157-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91157-exp-2025-achievement.pdf"
                    }
                ]
            },
            AS91159: {
                title: "AS91159 — Demonstrate understanding of gene expression",
                notes: [
                    "Covers how genes are expressed through transcription and translation to produce proteins.",
                    "Understand the roles of DNA, mRNA, and ribosomes in the process of gene expression.",
                    "Be able to explain how mutations can affect gene expression and resulting proteins.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91159-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91159-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91159-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91159-exp-2025-achievement.pdf"
                    },
                    {
                        year: "2024",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91159-exm-2024.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91159-exp-2024-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91159-exp-2024-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91159-exp-2024-achievement.pdf"
                    }
                ]
            }
        }
    };

    function renderStandard() {
        const code = standardSelect.value;
        const data = standardsData[subjectKey][code];

        notesCard.innerHTML =
            '<h3>' + data.title + '</h3>' +
            '<ul class="notes-list">' +
            data.notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') +
            '</ul>';

        practiceButtons.innerHTML = data.years.map(function (y) {
            return '<div class="year-block">' +
                '<h4 class="year-label">' + y.year + '</h4>' +
                '<div class="year-links">' +
                    '<a href="' + y.exam + '" target="_blank" class="btn">Exam Paper</a>' +
                    '<a href="' + y.excellence + '" target="_blank" class="btn-secondary">Excellence Exemplar</a>' +
                    '<a href="' + y.merit + '" target="_blank" class="btn-secondary">Merit Exemplar</a>' +
                    '<a href="' + y.achieved + '" target="_blank" class="btn-secondary">Achieved Exemplar</a>' +
                '</div>' +
            '</div>';
        }).join('');
    }

    standardSelect.addEventListener('change', renderStandard);
    renderStandard();
}