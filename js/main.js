
// --- Study Timer ---
// Handles the Pomodoro-style focus/break countdown, including input validation

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
        clearInterval(intervalId);
        intervalId = null;
        isBreak = !isBreak;
        secondsLeft = isBreak ? getBreakSeconds() : getFocusSeconds();
        updateDisplay();
        playTimerSound();
        alert(isBreak ? 'Focus session done! Time for a break.' : 'Break over! Back to focus.');
        timerInputs.forEach(function (input) { input.disabled = false; });
    }
}

    const timerInputs = [focusInput, focusSecInput, breakInput, breakSecInput];

function playTimerSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = 880;
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.6);
}

    function getTotalSeconds(minInput, secInput) {
    const mins = parseInt(minInput.value);
    const secs = parseInt(secInput.value);
    if (isNaN(mins) || isNaN(secs)) return null;
    return (mins * 60) + secs;
}

function validateTimerInputs() {
    const focusTotal = getTotalSeconds(focusInput, focusSecInput);
    const breakTotal = getTotalSeconds(breakInput, breakSecInput);

    if (focusTotal === null || breakTotal === null) {
        alert('Please enter valid numbers for focus and break time.');
        return false;
    }
    if (focusTotal <= 0) {
        alert('Focus time must be greater than 0 seconds.');
        return false;
    }
    if (breakTotal <= 0) {
        alert('Break time must be greater than 0 seconds.');
        return false;
    }
    return true;
}

timerStartBtn.addEventListener('click', function () {
    if (intervalId) return;
    if (!validateTimerInputs()) return;
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
    const total = isBreak ? getTotalSeconds(breakInput, breakSecInput) : getTotalSeconds(focusInput, focusSecInput);
    if (total === null) return;
    secondsLeft = total;
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
    { subject: "Mathematics", level: "L2", mode: "online", time: "Wed 4:00 PM", join: "Google Meet", link: "https://meet.google.com/" },
    { subject: "Biology", level: "L3", mode: "in-person", time: "Thu 3:30 PM, Library", join: "In person", link: null },
    { subject: "Chemistry", level: "L2", mode: "online", time: "Mon 5:00 PM", join: "Discord", link: "https://discord.com/" },
    { subject: "English", level: "L3", mode: "in-person", time: "Fri 12:30 PM, Room 12", join: "In person", link: null },
    { subject: "Physics", level: "L3", mode: "online", time: "Tue 6:00 PM", join: "Google Meet", link: "https://meet.google.com/" },
    { subject: "Geography", level: "L2", mode: "in-person", time: "Wed 12:30 PM, Room 4", join: "In person", link: null }
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
            const joinHtml = item.link
                ? '<a href="' + item.link + '" target="_blank" class="listing-join">' + item.join + '</a>'
                : '<span class="listing-join-static">' + item.join + '</span>';
            card.innerHTML =
                '<div class="listing-card-top">' +
                    '<span class="listing-subject">' + item.subject + '</span>' +
                    '<span class="listing-level">' + item.level + '</span>' +
                '</div>' +
                '<p class="listing-time">' + item.time + '</p>' +
                joinHtml;
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
                title: "AS91157 —— Demonstrate understanding of genetic variation and change",
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
                title: "AS91159 —— Demonstrate understanding of gene expression",
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
        },
        chemistry: {
            AS91164: {
                title: "AS91164 —— Demonstrate understanding of bonding, structure, properties and energy changes",
                notes: [
                    "Covers ionic, covalent, and metallic bonding, and how each affects a substance's structure.",
                    "Understand how structure (molecular vs lattice) affects melting point, solubility, and conductivity.",
                    "Be able to explain shapes of molecules using electron pair repulsion theory (VSEPR).",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91164-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91164-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91164-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91164-exp-2025-achievement.pdf"
                    }
                ]
            },
            AS91165: {
                title: "AS91165 —— Demonstrate understanding of the properties of selected organic compounds",
                notes: [
                    "Covers naming and classifying organic compounds including alkanes, alkenes, and alcohols.",
                    "Understand reaction types such as substitution, addition, and oxidation for organic compounds.",
                    "Be able to relate the properties of organic compounds to their structure and functional groups.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91165-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91165-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91165-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91165-exp-2025-achievement.pdf"
                    }
                ]
            },
            AS91166: {
                title: "AS91166 —— Demonstrate understanding of chemical reactivity",
                notes: [
                    "Covers reaction types including acid-base, precipitation, and redox reactions.",
                    "Understand factors that affect reaction rate: concentration, temperature, surface area, and catalysts.",
                    "Be able to write and balance chemical equations for common reaction types.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91166-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91166-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91166-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91166-exp-2025-achievement.pdf"
                    }
                ]
            }
        },
        economics: {
            AS91222: {
                title: "AS91222 —— Analyse inflation using economic concepts and models",
                notes: [
                    "Inflation is a sustained increase in the general price level of goods and services over time.",
                    "Distinguish between demand-pull and cost-push inflation, and their different causes.",
                    "Understand how the Reserve Bank uses the Official Cash Rate (OCR) to manage inflation.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91222-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91222-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91222-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91222-exp-2025-achievement.pdf"
                    }
                ]
            },
            AS91223: {
                title: "AS91223 —— Analyse international trade using economic concepts and models",
                notes: [
                    "Covers the theory of comparative advantage and why countries choose to trade.",
                    "Understand exchange rates and how they affect the price of imports and exports.",
                    "Be able to use supply and demand diagrams to model international trade effects.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91223-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91223-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91223-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91223-exp-2025-achievement.pdf"
                    }
                ]
            }
        },
        english: {
            AS91098: {
                title: "AS91098 —— Analyse specified aspect(s) of studied written text(s), supported by evidence",
                notes: [
                    "Covers close analysis of a written text studied in class (novel, play, or similar).",
                    "Use PEEL structure (Point, Evidence, Explain, Link) to build strong analytical paragraphs.",
                    "Support points with specific, detailed evidence directly from the text studied in class.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2022",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2022/91098-exm-2022.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2022/91098-exp-2022-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2022/91098-exp-2022-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2022/91098-exp-2022-achievement.pdf"
                    }
                ]
            },
            AS91099: {
                title: "AS91099 —— Analyse specified aspect(s) of studied visual or oral text(s), supported by evidence",
                notes: [
                    "Covers visual and oral texts such as film, advertising, or performance studied in class.",
                    "Identify visual and verbal techniques such as camera angle, lighting, colour, symbolism, and framing.",
                    "Explain how techniques create meaning and shape audience response or interpretation.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2024",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91099-exm-2024.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91099-exp-2024-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91099-exp-2024-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91099-exp-2024-achievement.pdf"
                    },
                    {
                        year: "2022",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2022/91099-exm-2022.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2022/91099-exp-2022-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2022/91099-exp-2022-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2022/91099-exp-2022-achievement.pdf"
                    }
                ]
            },
            AS91100: {
                title: "AS91100 —— Analyse significant aspects of unfamiliar written text(s) through close reading, supported by evidence",
                notes: [
                    "Covers close reading of an unseen text under exam conditions, unlike AS91098 which uses a studied text.",
                    "Practice reading unfamiliar passages quickly and identifying key techniques and ideas.",
                    "Support your analysis with quotes and specific evidence directly from the unfamiliar text.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91100-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91100-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91100-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91100-exp-2025-achievement.pdf"
                    }
                ]
            }
        },
        geography: {
            AS91240: {
                title: "AS91240 —— Demonstrate geographic understanding of a large natural environment",
                notes: [
                    "Covers a large natural environment (e.g. a river system, coastline, or mountain range) and the processes that shape it.",
                    "Understand physical processes and how they interact to create landforms over time.",
                    "Be able to explain how people interact with and are affected by the large natural environment studied.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2024",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91240-exm-2024.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91240-exp-2024-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91240-exp-2024-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91240-exp-2024-achievement.pdf"
                    }
                ]
            },
            AS91242: {
                title: "AS91242 —— Demonstrate geographic understanding of differences in development",
                notes: [
                    "Covers how and why levels of development differ between places, at a range of scales.",
                    "Understand indicators used to measure development, such as GDP, HDI, and literacy rates.",
                    "Be able to explain causes and consequences of uneven development between or within countries.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2024",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91242-exm-2024.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91242-exp-2024-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91242-exp-2024-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2024/91242-exp-2024-achievement.pdf"
                    }
                ]
            }
        },
        history: {
            AS91231: {
                title: "AS91231 —— Examine sources of an historical event that is of significance to New Zealanders",
                notes: [
                    "Covers evaluating primary and secondary sources related to a significant historical event.",
                    "Understand how to assess the reliability, purpose, and perspective of a historical source.",
                    "Be able to use evidence from multiple sources to build a supported argument about the event.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91231-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91231-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91231-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91231-exp-2025-achievement.pdf"
                    }
                ]
            },
            AS91233: {
                title: "AS91233 —— Examine causes and consequences of a significant historical event",
                notes: [
                    "Covers identifying long-term, short-term, and trigger causes of a significant historical event.",
                    "Understand the immediate and longer-term consequences of the event studied.",
                    "Practice structuring essay paragraphs with a clear argument, supporting evidence, and analysis.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2023",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2023/91233-mex-2023.pdf",
                        excellence: "http://nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2023/91233-exp-2023-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2023/91233-exp-2023-merit.pdf",
                        achieved: "http://nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2023/91233-exp-2023-achievement.pdf"
                    }
                ]
            }
        },
        math: {
            AS91261: {
                title: "AS91261 —— Apply algebraic methods in solving problems",
                notes: [
                    "Simplify algebraic expressions using expansion, factorising, and combining like terms.",
                    "Solve linear and quadratic equations, including by factorising and using the quadratic formula.",
                    "Work with exponents and logarithms, including simplifying expressions using index laws.",
                    "Show clear working for every step, since method marks are awarded even if the final answer is wrong.",
                    "Review past exam papers to see the style and structure of questions asked."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91261-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91261-frm-2025.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91261-frm-2025.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91261-frm-2025.pdf"
                    }
                ]
            },
            AS91262: {
                title: "AS91262 —— Apply calculus methods in solving problems",
                notes: [
                    "Sketch the graphs of functions and their gradient functions and describe the relationship between them.",
                    "Apply differentiation techniques to polynomials to find rates of change, turning points, and gradients.",
                    "Apply anti-differentiation techniques to polynomials to solve area and motion problems.",
                    "Show clear working for every step, since method marks are awarded even if the final answer is wrong.",
                    "Review past exam papers to see the style and structure of questions asked."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91262-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91262-exm-2025.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91262-exm-2025.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91262-exm-2025.pdf"
                    },
                    {
                        year: "2024",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91262-exm-2024.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91262-exm-2024.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91262-exm-2024.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91262-exm-2024.pdf"
                    }
                ]
            },
            AS91267: {
                title: "AS91267 —— Apply probability methods in solving problems",
                notes: [
                    "Covers calculating and interpreting probabilities using tables, tree diagrams, and Venn diagrams.",
                    "Understand independent and conditional probability and how to identify which applies.",
                    "Apply probability distributions to solve real-world problems.",
                    "Show clear working for every step, since method marks are awarded even if the final answer is wrong.",
                    "Review past exam papers to see the style and structure of questions asked."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91267-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91267-exm-2025.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91267-exm-2025.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91267-exm-2025.pdf"
                    },
                    {
                        year: "2024",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91267-exm-2024.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91267-exm-2024.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91267-exm-2024.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2024/91267-exm-2024.pdf"
                    }
                ]
            }
        },
        physics: {
            AS91170: {
                title: "AS91170 —— Demonstrate understanding of waves",
                notes: [
                    "Covers wave properties including wavelength, frequency, amplitude, and speed.",
                    "Understand reflection, refraction, diffraction, and interference of waves.",
                    "Be able to apply wave equations to solve problems involving sound and light.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91170-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91170-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91170-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91170-exp-2025-achievement.pdf"
                    }
                ]
            },
            AS91171: {
                title: "AS91171 —— Demonstrate understanding of mechanics",
                notes: [
                    "Covers forces, motion, momentum, and energy in a mechanical system.",
                    "Understand Newton's laws of motion and how to apply them to real scenarios.",
                    "Be able to use kinematics equations to solve problems involving velocity and acceleration.",
                    "Review past exam papers to see the style and structure of questions asked.",
                    "Compare your answers against the grade exemplars to see what Achievement, Merit, and Excellence responses look like."
                ],
                years: [
                    {
                        year: "2025",
                        exam: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exams/2025/91171-exm-2025.pdf",
                        excellence: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91171-exp-2025-excellence.pdf",
                        merit: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91171-exp-2025-merit.pdf",
                        achieved: "https://www.nzqa.govt.nz/nqfdocs/ncea-resource/exemplars/2025/91171-exp-2025-achievement.pdf"
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