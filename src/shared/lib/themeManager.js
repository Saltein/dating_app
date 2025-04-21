export function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

export function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
        setTheme(saved);
    }
}