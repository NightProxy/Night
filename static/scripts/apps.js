let apps = [
    // Preset app shortcuts
    { name: 'Example App', url: 'https://example.com', imgUrl: 'https://example.com/favicon.ico', isPinned: false },
    { name: 'Github', url: 'https://github.com', imgUrl: '/static/images/icons/github.png', isPinned: false },
    { name: 'Google', url: 'https://google.com', imgUrl: '/static/images/icons/google.webp', isPinned: false },
    // Additional predefined apps can be added here
  ];

  // Add a new app shortcut
  function addApp() {
const name = document.getElementById('appName').value;
    const url = document.getElementById('appUrl').value;
    const imgUrl = document.getElementById('appImgUrl').value;

    if (name && url && imgUrl) {
      apps.push({ name, url, imgUrl, isPinned: false });
      renderApps();
    } else {
      alert('Please ensure all fields are filled in correctly.');
    }
  }

  // Function to render apps
  function renderApps() {
    const pinnedAppsGrid = document.getElementById('pinnedAppsGrid');
    const appsGrid = document.getElementById('appsGrid');

    pinnedAppsGrid.innerHTML = '';
    appsGrid.innerHTML = '';

    apps.forEach((app, index) => {
      const appElement = getAppElement(app, index);
      if (app.isPinned) {
        pinnedAppsGrid.appendChild(appElement);
      } else {
        appsGrid.appendChild(appElement);
      }
    });
  }

  // Function to create app element
  function getAppElement(app, index) {
    const appShortcut = document.createElement('div');
    appShortcut.className = 'app-shortcut';
    appShortcut.innerHTML = 
      '<a href="${app.url}" target="_blank" title="${app.name}"><img src="${app.imgUrl}" alt="${app.name}"></a><button class="pin-button" onclick="togglePin(${index})">${app.isPinned ? "Unpin" : "Pin"}</button>';
    return appShortcut;
  }

  // Toggle the pinned state of an app
  function togglePin(index) {
    apps[index].isPinned = !apps[index].isPinned;
    renderApps();
  }

  // Initial rendering of apps
  renderApps();