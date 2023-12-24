let games = JSON.parse(localStorage.getItem('games')) || [
    {
        name: '2048',
        url: 'https://2048.com',
        imgUrl: '/static/images/icons/2048.png',
        isPinned: false
    },
];

function edu(val) {
    let iframe = document.querySelector(".iframe.active");
    window.navigator.serviceWorker
        .register("/static/uv.js", {
            scope: __uv$config.prefix,
        })
        .then(() => {
            let url = val.trim();
            if (!ifUrl(url)) url = "https://www.google.com/search?q=" + url;
            else if (!(url.startsWith("https://") || url.startsWith("http://")))
                url = "https://" + url;
            sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
            location.href = "edu.html";
        });
}

function ifUrl(val = "") {
    try {
        const url = new URL(val);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
        return false; // The constructor throws an error for invalid URLs
    }
}

// Save the state of games to localStorage
function saveGameData() {
    localStorage.setItem('games', JSON.stringify(games));
}

// Add a new game to the collection of games
function addGame() {
    const name = document.getElementById('gameName').value;
    const url = document.getElementById('gameUrl').value;
    const imgUrl = document.getElementById('gameImgUrl').value;

    // Preventing the addition of duplicate games
    const exists = games.some(game => game.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        alert('An game with this name already exists.');
        return;
    }

    if (name && url && imgUrl) {
        games.push({ name, url, imgUrl, isPinned: false });
        games.sort((a, b) => a.name.localeCompare(b.name)); // Keep the games sorted after addition
        renderGames();
        saveGameData(); // Save to localStorage after adding a new game
        clearForm(); // Clear the form fields after adding
    } else {
        alert('Please ensure all fields are filled in correctly.');
    }
}

function addCustomGame(name, url, imgUrl) {
    if (!name || !url || !imgUrl) {
      alert('Please ensure all fields for the custom game are filled in correctly.');
      return false; // Do not proceed with adding the game.
    }
  
    const existingGameIndex = games.findIndex(game => game.name.toLowerCase() === name.toLowerCase());
    if (existingGameIndex !== -1) {
      alert('An game with this name already exists.');
      return false; // Do not proceed with adding the game.
    }
  
    const newCustomGame = { name, url, imgUrl, isPinned: false, isCustom: true };
    games.push(newCustomGame);
    saveGameData(); // Save the updated games array.
    renderGames(); // Re-render the game list.
    clearForm(); // Clear the input form.
  
    return true; // Successfully added the game.
  }

// Render the games, filtering them if a search query is provided
function renderGames(filteredGames = games) {
    const pinnedGamesGrid = document.getElementById('pinnedGamesGrid');
    const gamesGrid = document.getElementById('gamesGrid');

    // Clear previous games
    pinnedGamesGrid.innerHTML = '';
    gamesGrid.innerHTML = '';

    // Sort games by pinned status and alphabetically within those groups
    filteredGames.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.name.localeCompare(b.name); // Alphabetical sorting
    });

    // Render each game using the provided getGameElement function
    filteredGames.forEach((game, index) => {
        const gameElement = getGameElement(game, index);
        if (game.isPinned) {
            pinnedGamesGrid.appendChild(gameElement);
        } else {
            gamesGrid.appendChild(gameElement);
        }
    });
}

function renderCustomGames() {
    const customGames = games.filter(game => game.isCustom);
    const customGamesGrid = document.getElementById('customGamesGrid');
    customGamesGrid.innerHTML = ''; // Clear existing custom games.
  
    customGames.forEach((game, index) => {
      const gameElement = getGameElement(game, index);
      customGamesGrid.appendChild(gameElement);
    });
  }

// Filter the games based on the search query
function searchGames() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filteredGames = games.filter(game => game.name.toLowerCase().includes(searchQuery));
    renderGames(filteredGames);
}

// Toggle the pinned status of an game
function togglePin(index) {
    games[index].isPinned = !games[index].isPinned;
    saveGameData(); // Save to localStorage after toggling the pinned state
    renderGames(); // Re-render games to reflect changes
}

// Clear the form fields
function clearForm() {
    document.getElementById('gameName').value = '';
    document.getElementById('gameUrl').value = '';
    document.getElementById('gameImgUrl').value = '';
}

// Create a visual element for an game
function getGameElement(game, index) {
    const gameShortcut = document.createElement('div');
    gameShortcut.className = 'game-shortcut hvr-grow-rotate';
    gameShortcut.innerHTML = `
      <a onclick="edu('${game.url}')" title="${game.name}">
        <img src="${game.imgUrl}" alt="${game.name}">
      </a>
      <div class="gametext">
        <a style="font-size:12px;" onclick="edu('${game.url}')" title="${game.name}">
          ${game.name}
        </a>
        <button class="button-save" onclick="togglePin(${index})">
          ${game.isPinned ? 'Unpin' : 'Pin'}
        </button>
      </div>`
        ;
    return gameShortcut;
}

// Bind the form submission function and render the games on window load
document.getElementById('newGameForm').onsubmit = function(event) {
    event.preventDefault();
  
    const name = document.getElementById('gameName').value;
    const url = document.getElementById('gameUrl').value;
    const imgUrl = document.getElementById('gameImgUrl').value;
  
    if (addCustomGame(name, url, imgUrl)) {
      renderCustomGames(); // Render the custom games after adding one.
    }
  };

// Render games on window load, considering any search query
window.onload = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
        document.getElementById('searchBar').value = searchQuery;
        searchGames();
    } else {
        renderGames();
    }
}