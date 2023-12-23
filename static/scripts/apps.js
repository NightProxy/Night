let apps = JSON.parse(localStorage.getItem('apps')) || [
    {
        name: 'Github',
        url: 'https://github.com',
        imgUrl: '/static/images/icons/github.png',
        isPinned: false
    },
    {
        name: 'Google',
        url: 'https://google.com',
        imgUrl: '/static/images/icons/google.webp',
        isPinned: false
    },
    {
        name: 'Discord',
        url: 'https://discord.com',
        imgUrl: '/static/images/icons/discord.jpg',
        isPinned: false
    },
    {
        name: "Amazon",
        url: "https://amazon.com/",
        imgUrl: "./images/icons/apps/amazon.png",
        isPinned: false

    },
    {
        name: "Free Movies Watch",
        url: "https://freemovieswatch.tv",
        imgUrl: "./images/icons/freemovieswatch.png",
        isPinned: false


    },
    {
        name: "Scratch",
        url: "https://scratch.mit.edu",
        imgUrl: "./images/icons/scratch.jpg",
        isPinned: false


    },
    {
        name: "Chess.com",
        url: "https://chess.com",
        imgUrl: "./images/icons/chess.png",
        isPinned: false

    },
    {
        name: "Cool Math Games",
        url: "https://coolmathgames.com",
        imgUrl: "./images/icons/apps/coolmath.png",
        isPinned: false


    },
    {
        name: "DuckDuckGo",
        url: "https://start.duckduckgo.com/",
        imgUrl: "./images/icons/apps/duckduckgo.png",
        isPinned: false


    },
    {
        name: "ESPN",
        url: "https://www.espn.com/watch/",
        imgUrl: "./images/icons/apps/espn.webp",
        isPinned: false


    },
    {
        name: "Fifa Rosters",
        url: "https://fifarosters.com/",
        imgUrl: "./images/icons/fifa.png",
        isPinned: false


    },
    {
        name: "Flix HQ",
        url: "https://flixhq.to",
        imgUrl: "./images/icons/apps/flixhq.png",
        isPinned: false


    },
    {
        name: "Geforce NOW",
        url: "https://play.geforcenow.com",
        imgUrl: "./images/icons/apps/geforce-now.png",
        isPinned: false

    },
    {
        name: "HBO MAX",
        url: "https://www.hbomax.com/",
        imgUrl: "./images/icons/apps/hbo.webp",
        isPinned: false

    },
    {
        name: "Messenger",
        url: "https://messenger.com/",
        imgUrl: "./images/icons/apps/messenger.png",
        isPinned: false

    },
    {
        name: "Now.gg",
        url: "https://now.gg/",
        imgUrl: " ./images/icons/apps/nowgg.png",
        isPinned: false

    },
    {
        name: "Paramount Plus",
        url: "https://paramountplus.com",
        imgUrl: "./images/icons/apps/paramount.png",
        isPinned: false

    },
    {
        name: "Pinterest",
        url: "https://pinterest.com",
        imgUrl: "./images/icons/apps/pinterest.png",
        isPinned: false


    },
    {
        name: "Pixlr",
        url: "https://pixlr.com/",
        imgUrl: "./images/icons/pix.png",
        isPinned: false


    },
    {
        name: "Poki",
        url: "https://poki.com",
        imgUrl: "./images/icons/apps/poki.png",
        isPinned: false


    },
    {
        name: "Soundcloud",
        url: "https://soundcloud.com",
        imgUrl: "./images/icons/apps/soundcloud.jpg",
        isPinned: false


    },
    {
        name: "Telegram",
        url: "https://web.telegram.org/",
        imgUrl: "./images/icons/apps/telegram.png",
        isPinned: false

    },
    {
        name: "Tiktok",
        url: "https://tiktok.com",
        imgUrl: "./images/icons/apps/tiktok.png",
        isPinned: false


    },
    {
        name: "Tumblr",
        url: "https://tumblr.com/",
        imgUrl: "./images/icons/apps/tumblr.png",
        isPinned: false


    },
    {
        name: "Twitch",
        url: "https://twitch.tv",
        imgUrl: "./images/icons/apps/twitch-tv.png",
        isPinned: false


    },
    {
        name: "Twitter",
        url: "https://twitter.com",
        imgUrl: "./images/icons/apps/twitter.png",
        isPinned: false


    },
    {
        name: "VS Code",
        url: "https://vscode.dev",
        imgUrl: "./images/icons/apps/vscode.png",
        isPinned: false


    },
    {
        name: "Y8 Games",
        url: "https://y8.com/",
        imgUrl: "./images/icons/apps/y8.png",
        isPinned: false


    },
    {
        name: "YouTube",
        url: "https://youtube.com",
        imgUrl: "./images/icons/apps/yt.png",
        isPinned: false


    },
    {
        name: "Whatsapp",
        url: "https://web.whatsapp.com/",
        imgUrl: "./images/icons/apps/whatsapp.png",
        isPinned: false

    },
    {
        name: "Wattpad",
        url: "https://wattpad.com/",
        imgUrl: "./images/icons/apps/wattpad.webp",
        isPinned: false


    },
    {
        name: "ChatGPT Clone",
        url: "https://chat.shuttle.rip/",
        imgUrl: "./images/icons/chatgpt.png",
        isPinned: false


    },
    {
        name: "Discord - Login",
        url: "https://canary.discord.com/login",
        imgUrl: "./images/icons/discord.jpg",
        isPinned: false

    },

    {
        name: "HD Today",
        url: "https://hdtoday.tv",
        imgUrl: "./images/icons/hd.png",
        isPinned: false


    }
];

function edu(value) {
    let iframe = document.querySelector(".iframe.active");
    window.navigator.serviceWorker
        .register("/static/uv.js", {
            scope: __uv$config.prefix,
        })
        .then(() => {
            let url = value.trim();
            if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
            else if (!(url.startsWith("https://") || url.startsWith("http://")))
                url = "https://" + url;
            sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
            location.href = "edu.html";
        });
}

function isUrl(val = "") {
    if (
        /^http(s?):\/\//.test(val) ||
        (val.includes(".") && val.substr(0, 1) !== " ")
    )
        return true;
    return false;
}

// Save the state of apps to localStorage
function saveAppData() {
    localStorage.setItem('apps', JSON.stringify(apps));
}

// Add a new app to the collection of apps
function addApp() {
    const name = document.getElementById('appName').value;
    const url = document.getElementById('appUrl').value;
    const imgUrl = document.getElementById('appImgUrl').value;

    // Preventing the addition of duplicate apps
    const exists = apps.some(app => app.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        alert('An app with this name already exists.');
        return;
    }

    if (name && url && imgUrl) {
        apps.push({ name, url, imgUrl, isPinned: false });
        apps.sort((a, b) => a.name.localeCompare(b.name)); // Keep the apps sorted after addition
        renderApps();
        saveAppData(); // Save to localStorage after adding a new app
        clearForm(); // Clear the form fields after adding
    } else {
        alert('Please ensure all fields are filled in correctly.');
    }
}

// Render the apps, filtering them if a search query is provided
function renderApps(filteredApps = apps) {
    const pinnedAppsGrid = document.getElementById('pinnedAppsGrid');
    const appsGrid = document.getElementById('appsGrid');

    // Clear previous apps
    pinnedAppsGrid.innerHTML = '';
    appsGrid.innerHTML = '';

    // Sort apps by pinned status and alphabetically within those groups
    filteredApps.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.name.localeCompare(b.name); // Alphabetical sorting
    });

    // Render each app using the provided getAppElement function
    filteredApps.forEach((app, index) => {
        const appElement = getAppElement(app, index);
        if (app.isPinned) {
            pinnedAppsGrid.appendChild(appElement);
        } else {
            appsGrid.appendChild(appElement);
        }
    });
}

// Filter the apps based on the search query
function searchApps() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchQuery));
    renderApps(filteredApps);
}

// Toggle the pinned status of an app
function togglePin(index) {
    apps[index].isPinned = !apps[index].isPinned;
    saveAppData(); // Save to localStorage after toggling the pinned state
    renderApps(); // Re-render apps to reflect changes
}

// Clear the form fields
function clearForm() {
    document.getElementById('appName').value = '';
    document.getElementById('appUrl').value = '';
    document.getElementById('appImgUrl').value = '';
}

// Create a visual element for an app
function getAppElement(app, index) {
    const appShortcut = document.createElement('div');
    appShortcut.className = 'app-shortcut hvr-grow-rotate';
    appShortcut.innerHTML = `
      <a onclick="edu('${app.url}')" title="${app.name}">
        <img src="${app.imgUrl}" alt="${app.name}">
      </a>
      <div class="apptext">
        <a style="font-size:12px;" onclick="edu('${app.url}')" title="${app.name}">
          ${app.name}
        </a>
        <button class="button-save" onclick="togglePin(${index})">
          ${app.isPinned ? 'Unpin' : 'Pin'}
        </button>
      </div>`
        ;
    return appShortcut;
}

// Bind the form submission function and render the apps on window load
document.getElementById('newAppForm').onsubmit = function (event) {
    event.preventDefault();
    addApp();
};

// Render apps on window load, considering any search query
window.onload = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
        document.getElementById('searchBar').value = searchQuery;
        searchApps();
    } else {
        renderApps();
    }
}