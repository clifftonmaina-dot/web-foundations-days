// 1. Select all required elements
const textarea = document.getElementById('note-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');

// 2. The updateCounts function
function updateCounts() {
    const text = textarea.value;
    const length = text.length;

    // Word count calculation (splitting by whitespace and filtering out empty strings)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const numWords = words.length;

    // Update text content
    charCount.textContent = `${length} / 200 characters`;
    wordCount.textContent = `${numWords} words`;

    // Handle warning and over classes
    charCount.classList.remove('warning', 'over');
    if (length > 200) {
        charCount.classList.add('over');
    } else if (length > 180) {
        charCount.classList.add('warning');
    }
}

// 3. Input event: update counts and save draft to localStorage
textarea.addEventListener('input', () => {
    updateCounts();
    localStorage.setItem('draft', textarea.value);
});

// 4. Clear button and Escape key functionality
function clearAll() {
    textarea.value = '';
    updateCounts();
    localStorage.removeItem('draft');
}

clearBtn.addEventListener('click', clearAll);

textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        clearAll();
    }
});

// 5. Theme toggle functionality
function updateThemeButton() {
    if (document.body.classList.contains('dark')) {
        themeToggle.textContent = 'Light mode';
    } else {
        themeToggle.textContent = 'Dark mode';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButton();
});

// 6. On page load: restore draft and theme
window.addEventListener('DOMContentLoaded', () => {
    // Restore saved text draft
    const savedDraft = localStorage.getItem('draft');
    if (savedDraft) {
        textarea.value = savedDraft;
    }

    // Restore saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    // Initialize counts and button text based on restored data
    updateCounts();
    updateThemeButton();
});