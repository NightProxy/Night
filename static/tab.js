let tabCount = 1;
const tabsContainer = document.querySelector('.tabs');
const tabPanelsContainer = document.querySelector('.tab-panels');
const addTabBtn = document.getElementById('add-tab-btn');
const closeTabBtn = document.getElementById('closetabbtn');
const iframeControl = document.querySelector('.iframe-control');
const inputField = document.querySelector('input');
const backBtn = document.querySelector('.back-btn');
const refreshBtn = document.querySelector('.refresh-btn');
const forwardBtn = document.querySelector('.forward-btn');
const bookmarkBtn = document.getElementById('bookmark-btn');
let currentTabPanelId = null;

function switchTab(event) {
    const target = event.target;
    if (target === addTabBtn) {
        addTab();
    } else if (target.classList.contains('close-tab-btn')) {
        closeTab(event);
    } else {
        const tabPanel = target.closest('li').getAttribute('data-panel');
        showTab(tabPanel);
    }
}

function addTab(title, src) {
    const newTabId = `tab${tabCount}`;
    const newTabPanelId = `panel${tabCount}`;

    document.querySelectorAll('.tabs li').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    const newTab = document.createElement('li');
    newTab.setAttribute('data-panel', newTabPanelId);
    newTab.classList.add('active');
    newTab.innerHTML = `${title} <span class="close-tab-btn"></span>`;
    tabsContainer.appendChild(newTab);

    const newTabPanel = document.createElement('div');
    newTabPanel.setAttribute('data-src', src);
    newTabPanel.classList.add('tab-panel', 'active');
    newTabPanel.setAttribute('id', newTabPanelId);
    newTabPanel.innerHTML = `<iframe src="${src}" frameborder="0"></iframe>`;
    tabPanelsContainer.appendChild(newTabPanel);

    tabCount++;
    resizeTabs();

    const iframe = newTabPanel.querySelector('iframe');
    updateTabTitleFromIframe(iframe);
    iframe.addEventListener('load', function () {
        updateTabTitleFromIframe(iframe);
    });
}

function showTab(panelId) {
    document.querySelectorAll('.tabs li').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    const tabToActivate = document.querySelector(`.tabs li[data-panel="${panelId}"]`);
    const tabPanelToActivate = document.querySelector(`#${panelId}`);
    tabToActivate.classList.add('active');
    tabPanelToActivate.classList.add('active');
    currentTabPanelId = panelId;
}

function closeTab(event) {
    const activeTabPanel = document.querySelector('.tab-panel.active');
    if (activeTabPanel) {
        const tabPanelId = activeTabPanel.getAttribute('id');
        const tabToRemove = document.querySelector(`[data-panel="${tabPanelId}"]`);
        const tabPanelToRemove = document.getElementById(tabPanelId);

        localStorage.removeItem(`${tabPanelId}-input`);

        tabPanelToRemove.remove();
        tabToRemove.remove();

        const newActiveTabPanel = document.querySelector('.tab-panel.active');
        if (newActiveTabPanel) {
            showTab(newActiveTabPanel.getAttribute('id'));
        } else {
            const lastTabPanel = document.querySelector('.tab-panel:last-child');
            if (lastTabPanel) {
                showTab(lastTabPanel.getAttribute('id'));
            } else {
                // No tabs left, show a message to open a new tab
                const newTabMessage = document.createElement('div');
                newTabMessage.classList.add('new-tab-message');
                newTabMessage.textContent = 'Open a new tab to continue';
                tabPanelsContainer.appendChild(newTabMessage);
            }
        }

        resizeTabs();
    }
}

function saveInputs(panelId) {
    const iframe = document.querySelector(`#${panelId} iframe`);
    const inputs = iframe.contentDocument.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        const savedValue = localStorage.getItem(`${panelId}-${input.name}`);
        input.value = savedValue || '';

        input.addEventListener('input', function () {
            localStorage.setItem(`${panelId}-${input.name}`, input.value);
        });
    });
}

function updateTabTitleFromIframe(iframe) {
    const activeTab = document.querySelector('.tabs li.active');
    if (activeTab) {
        const src = iframe.src;
        const encodedurl = src.split('/static/tiw/')[1];
        const decodedsrc = __uv$config.decodeUrl(encodedurl);
        const imgsrc = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${decodedsrc}&size=20`;
        const faviconsrc = `<img style="margin-right: 1px;" src="${imgsrc}">`;
        if (src.includes('home.html') || src.includes('main.html')) {
        } else { 
            const iframeTitle = `<span style="margin-left: 1px;">${iframe.contentDocument.title}</span>`;
            activeTab.innerHTML = `${faviconsrc} ${iframeTitle} <span class="close-tab-btn"></span>`;
        }
    }
    iframe.addEventListener('load', function () {
        updateTabTitleFromIframe(iframe);
    });
    iframe.contentWindow.addEventListener('beforeunload', function () {
        iframe.dataset.lastTitle = iframe.contentDocument.title;
    });
    iframe.contentWindow.addEventListener('unload', function () {
        if (iframe.dataset.lastTitle) {
            iframe.contentDocument.title = iframe.dataset.lastTitle;
            iframe.dataset.lastTitle = '';
            updateTabTitleFromIframe(iframe);
        }
    });
}

function resizeTabs() {
    const tabWidth = 100; 
    const totalTabs = tabsContainer.childElementCount;
    const availableWidth = tabsContainer.offsetWidth;
    const maxVisibleTabs = Math.floor(availableWidth / tabWidth);
    const visibleTabs = Math.min(maxVisibleTabs, totalTabs);

    const newTabWidth = `${100 / visibleTabs}%`;
    tabsContainer.querySelectorAll('.tabs li').forEach(tab => {
        tab.style.width = newTabWidth;
    });
}

tabsContainer.addEventListener('click', switchTab);
addTabBtn.addEventListener('click', function () {
    addTab('<i class="fas fa-globe"></i> New Tab', "main.html");
});

inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const iframe = document.querySelector(`#${currentTabPanelId} iframe`);
        const url = inputField.value.trim();
        iframe.src = url;
    }
});

closeTabBtn.addEventListener('click', closeTab);

backBtn.addEventListener('click', function () {
    const iframe = document.querySelector(`#${currentTabPanelId} iframe`);
    iframe.contentWindow.history.back();
});

refreshBtn.addEventListener('click', function () {
    const iframe = document.querySelector(`#${currentTabPanelId} iframe`);
    iframe.contentWindow.location.reload();
});

forwardBtn.addEventListener('click', function () {
    const iframe = document.querySelector(`#${currentTabPanelId} iframe`);
    iframe.contentWindow.history.forward();
});

function initTabs() {
    showTab('panel1');
    saveInputs('panel1');
    addTab('<i class="fa-solid fa-house"></i> Home', "home.html"); // Add the Home tab on load

    const iframes = document.querySelectorAll('.tab-panel iframe');
    iframes.forEach(iframe => {
        updateTabTitleFromIframe(iframe);
        iframe.addEventListener('load', function () {
            updateTabTitleFromIframe(iframe);
        });
    });
}

// Handle window resize to adjust the tabs
window.addEventListener('resize', function () {
    resizeTabs();
});

window.addEventListener('load', function () {
    addTab("<i class='fa-solid fa-house'></i> Home", 'home.html');
    bookmarkBtn.addEventListener('click', bookmarkCurrentTab);
});

function isOverflowing(container, element) {
    return container.scrollWidth > container.clientWidth || element.offsetTop > container.clientHeight;
}

function addBookmarkToLocalStorage(title, link) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const isDuplicate = bookmarks.some((bookmark) => bookmark.title === title && bookmark.link === link);
    if (!isDuplicate) {
        bookmarks.push({ title, link });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

function addBookmark(title, link) {
    const bookmarksContainer = document.getElementById('bookmarks-panel');
    const bookmarksOverflow = document.getElementById('bookmarks-overflow');

    const bookmark = document.createElement('a');

    if (link.startsWith(window.location.origin)) {
        link = link.substring(window.location.origin.length);
    }

    if (link.includes('main.html') || link.includes('home.html') || link.includes('/settings/')) {
        if (link.includes('home.html')) {
            bookmark.innerHTML = "<i class='fa-solid fa-house'>  </i> " + " " +  title;
        }
        if (link.includes('main.html')) {
            bookmark.innerHTML = '<i class="fas fa-globe"> </i>  ' + " " +  title;
        }
        if (link.includes('/settings/')) {
            bookmark.innerHTML = '<i class="fa-sharp fa-solid fa-gear"> </i> ' + " " +  title;
        }
    } else {
        const decodedlink = link;
        const imgsrc = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${decodedlink}&size=26`;
        const faviconlink = `<img style="margin-right: 5px;" src="${imgsrc}">`;
        bookmark.innerHTML = faviconlink + title;
        const encodedlink = `/static/tiw` + __uv$config.encodeUrl(link);
        bookmark.setAttribute('onclick', `changeTabSrc('${encodedlink}')`);
    }

    bookmark.classList.add('bookmark-item');
    bookmark.addEventListener('click', (event) => {
        event.preventDefault();
        const activeTabPanel = document.querySelector('.tab-panel.active');
        const iframe = activeTabPanel.querySelector('iframe');
    });

    bookmark.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        showContextMenu(bookmark, title, link, event);
    });

    if (isOverflowing(bookmarksContainer, bookmark)) {
        bookmarksOverflow.appendChild(bookmark);
        bookmarksOverflow.classList.add('show');
    } else {
        bookmarksContainer.appendChild(bookmark);
    }

    addBookmarkToLocalStorage(title, link);
}

function showContextMenu(bookmarkElement, title, link, event) {
    if (document.querySelector('.context-menu')) {
        return;
    }

    const contextMenu = document.createElement('div');
    contextMenu.classList.add('context-menu');

    const deleteOption = document.createElement('div');
    deleteOption.textContent = 'Delete Bookmark';
    deleteOption.addEventListener('click', () => {
        deleteBookmark(bookmarkElement, link);
        contextMenu.remove();
    });
    contextMenu.appendChild(deleteOption);

    contextMenu.style.position = 'absolute';
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;

    contextMenu.dataset.visible = 'true';

    document.body.appendChild(contextMenu);

    const closeContextMenu = (event) => {
        if (contextMenu && contextMenu.dataset.visible === 'true' && !contextMenu.contains(event.target)) {
            contextMenu.style.display = 'none'; // Hide the context menu
            document.removeEventListener('click', closeContextMenu);
        }
    };

    document.addEventListener('click', closeContextMenu);

    // Prevent the default browser context menu from showing
    event.preventDefault();
}

function deleteBookmark(bookmarkElement, link) {
    // Implement the delete bookmark functionality here
    // For example, remove the bookmark from the DOM and update localStorage
    bookmarkElement.remove();
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.link !== link);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
}

  function showBookmarkPopup() {
      const popup = document.getElementById('bookmark-popup');
      popup.style.display = 'block';
  
      const activeTabPanel = document.querySelector('.tab-panel.active');
      const iframe = activeTabPanel.querySelector('iframe');
      const bookmarkLinkInput = document.getElementById('bookmark-link-input');
      const bookmarkTitleInput = document.getElementById('bookmark-title-input');
      let defaultlink = iframe.src;
      if (defaultlink.includes('/uv/service/')) {
          defaultlink = defaultlink.substring(defaultlink.indexOf('static/tiw') + '/static/tiw/'.length);
          defaultlink = __uv$config.decodeUrl(defaultlink);
      }
      bookmarkLinkInput.value = defaultlink;
      bookmarkTitleInput.value = iframe.contentDocument.title; 
  
      const bookmarkConfirmBtn = document.getElementById('bookmark-confirm');
      bookmarkConfirmBtn.removeEventListener('click', handleBookmarkConfirm); // Remove existing event listener
      bookmarkConfirmBtn.addEventListener('click', handleBookmarkConfirm);
  
      // Cancel button functionality
      const bookmarkCancelBtn = document.getElementById('bookmark-cancel');
      bookmarkCancelBtn.removeEventListener('click', handleBookmarkCancel); // Remove existing event listener
      bookmarkCancelBtn.addEventListener('click', handleBookmarkCancel);
  }
  
  // Function to handle the bookmark confirm button click
  function handleBookmarkConfirm() {
      const bookmarkTitleInput = document.getElementById('bookmark-title-input');
      const bookmarkLinkInput = document.getElementById('bookmark-link-input');
      const bookmarkTitle = bookmarkTitleInput.value;
      const bookmarkLink = bookmarkLinkInput.value;
      addBookmark(bookmarkTitle, bookmarkLink);
  
      // Close the popup
      const popup = document.getElementById('bookmark-popup');
      popup.style.display = 'none';
  }
  
  function handleBookmarkCancel() {
      // Close the popup
      const popup = document.getElementById('bookmark-popup');
      popup.style.display = 'none';
  }
  
  // Call the function to show the bookmark popup when the bookmark button is clicked
  bookmarkBtn.addEventListener('click', showBookmarkPopup);
  
  function createBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    bookmarks.forEach((bookmark) => {
        addBookmark(bookmark.title, bookmark.link);
    });
}
  
  // Call the function to create initial bookmarks (if needed) when the page is loaded
  document.addEventListener('DOMContentLoaded', createBookmarks);
  

function updatefaviconagain() {
    const activeTabPanel = document.querySelector('.tab-panel.active');
    if (activeTabPanel) {
        const iframe = activeTabPanel.querySelector('iframe');
        updateTabTitleFromIframe(iframe);
    }
}

// Function to calculate server ping
function calculateServerPing(serverURL) {
    const beaconData = 'ping-test';
    const startTime = performance.now();
    navigator.sendBeacon(serverURL, beaconData);
    const endTime = performance.now();
    const pingTime = endTime - startTime;
    const pingResultElement = document.getElementById('pingResult');
    alert(`Average ping to ${serverURL}: ${pingTime.toFixed(2)} ms`);
}

// Initialize tabs
initTabs();

function changeTabSrc(src) {
    const activeTabPanel = document.querySelector('.tab-panel.active');
    if (activeTabPanel) {
        const iframe = activeTabPanel.querySelector('iframe');
        iframe.src = src;
    }
}
