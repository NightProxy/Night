// script.js
function changetheme(theme) {
  const root = document.documentElement;
  const currentPage = window.location.pathname; // Get the current page URL

  if (theme === 'light') {
    if (currentPage.includes('home.html')) {
      root.style.setProperty('--main-background-color', '#fff');
      root.style.setProperty('--main-text-color', '#1a1a2b');
      root.style.setProperty('--discord-button-background-color', '#6B52A3');
      root.style.setProperty('--discord-button-hover-background-color', '#5B3A75');
      root.style.setProperty('--box-shadow-color', 'rgba(0, 0, 0, 0.1)');
    } else if (currentPage.includes('/settings/')) {
      root.style.setProperty('--primary-color', '#8F6CAF');
      root.style.setProperty('--secondary-color', '#B68DCB');
      root.style.setProperty('--background-color', '#f0f0f5');
      root.style.setProperty('--text-color', '#1a1a2b');
      root.style.setProperty('--hover-color', '#45A049');
    } else if (currentPage.includes('main.html')) {
      root.style.setProperty('--main-background-color', '#f0f0f5');
      root.style.setProperty('--main-text-color', '#fff');
      root.style.setProperty('--button-background-color', '#6B52A3');
      root.style.setProperty('--button-hover-background-color', '#8F6CAF');
      root.style.setProperty('--link-background-color', '#d3d3ea');
      root.style.setProperty('--link-hover-background-color', '#B68DCB');
      root.style.setProperty('--border-color', '#B68DCB');
    } else {
      root.style.setProperty('--primary-background-color', '#f5f5f5');
      root.style.setProperty('--secondary-background-color', '#ffffff');
      root.style.setProperty('--accent-color', '#f5f5f5');
      root.style.setProperty('--main-text-color', '#1a1a2b');
      root.style.setProperty('--search-placeholder-color', '#999');
      root.style.setProperty('--bookmark-background-color', '#f5f5f5');
      root.style.setProperty('--bookmark-hover-background-color', '#ffffff');
      root.style.setProperty('--input-background-color', '#f5f5f5');
      root.style.setProperty('--input-text-color', '#1a1a2b');
      root.style.setProperty('--input-placeholder-color', '#ccc');
      root.style.setProperty('--button-background-color', '#f5f5f5');
      root.style.setProperty('--button-text-color', '#1a1a2b');
      root.style.setProperty('--button-hover-background-color', '#ffffff');
      root.style.setProperty('--cancel-button-background-color', '#f5f5f5');
      root.style.setProperty('--save-button-background-color', '#f5f5f5');
    }
  } else if (theme === 'dark') {
    // ... (same as before) ...
  } else if (theme === 'default') {
    localStorage.removeItem('theme');
    root.removeAttribute('style'); // Clear all inline styles
  }

  // Store the theme in local storage
  localStorage.setItem('theme', theme);
}

// Load theme from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    changetheme(theme);
  }
});
