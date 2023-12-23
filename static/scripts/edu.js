document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(src) {
  var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = src;
  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
};
function reload() {
  document.getElementById("iframeId").src = document.getElementById("iframeId").src;
}
function back() {
  document.getElementById("iframeId").contentWindow.history.back();
}
function forward() {
  document.getElementById("iframeId").contentWindow.history.forward();
}
function hide() {
  var hidediv = document.getElementById('browser');
  if (hidediv.style.display === "none") {
    hidediv.style.display = "block";
  } else {
    hidediv.style.display = "none";
  }
}
function togglemenu() {
  var menu = document.getElementById("mySidebar")
  if (menu.style.height === "0%") {
    menu.style.height = "20%";
  } else {
    menu.style.height = "0%";
  }
}
function setIframe() {
  let encodedUrl = sessionStorage.getItem("encodedUrl");
  encodedUrl = "/static/ghost/" + encodedUrl;
  console.log(encodedUrl);
  document.querySelector("#iframeid").src = encodedUrl;
};
function setthemes() {
  if (localStorage.theme == "default") {
    themefile.href = "/static/index.css";
    if (localStorage.cloak == "off") {
      changeFavicon('../favicon.ico');
    };
  } else if (localStorage.theme == "noir") {
    themefile.href = "/static/css/themes/noir/noir.css";
  } else if (localStorage.theme == "void") {
    themefile.href = "/static/css/themes/void/void.css";
  } else if (localStorage.theme == "ip") {
    themefile.href = "/static/css/themes/ironprime/ironprime.css";
    logo.src = "/static/css/themes/fire/firethemelogo.png";
  } else if (localStorage.theme == "xg") {
    themefile.href = "/static/css/themes/xgames/xgames.css";
  } else if (localStorage.theme == "stealth") {
    themefile.href = "/static/css/themes/stealth/stealth.css";
  } else if (localStorage.theme == "fg") {
    themefile.href = "/static/css/themes/froggermans/froggermans.css";
  } else if (localStorage.theme == "ghost") {
    themefile.href = "/static/css/themes/ghost/ghost.css";
  } else if (localStorage.theme == "midnight") {
    themefile.href = "/static/css/themes/midnight/midnight.css";
  } else if (localStorage.theme == "fire") {
    themefile.href = "/static/css/themes/fire/fire.css";
    if (localStorage.cloak == "off") {
      changeFavicon('/static/css/themes/fire/firefavicon.ico');
    };
  } else if (localStorage.theme == "meteor") {
    themefile.href = "/static/css/themes/meteor/meteor.css";
  } else {
    themefile.href = "/static/index.css";
  }
};
function setcloaks() {
  if (localStorage.cloak == "drive") {
    changeFavicon('./images/favicon/drive.png');
    document.title = "My Drive - Google Drive";
  } else if (localStorage.cloak == "classroom") {
    changeFavicon('./images/favicon/classroom.png');
    document.title = "Home";
  } else if (localStorage.cloak == "google") {
    changeFavicon('./images/favicon/google.png');
    document.title = "Google";
  } else if (localStorage.cloak == "gmail") {
    changeFavicon('./images/favicon/gmail.png');
    document.title = "Inbox";
  };
};

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

function initializeBookmarks() {
  if (!localStorage.getItem('bookmarks')) {
    localStorage.setItem('bookmarks', JSON.stringify([]));
  }
}

function saveBookmark() {
  const iframe = document.getElementById('iframeId');
  const iframeDoc = iframe.contentWindow.document;
  const bookmarkTitle = iframeDoc.title;
  const bookmarkUrl = iframe.src;

  // Attempt to find the favicon using various common rel attributes.
  let faviconUrl = undefined;
  const faviconLink = iframeDoc.querySelector("link[rel~='icon'], link[rel='shortcut icon'], link[rel='Bookmark icon']");

  if (faviconLink) {
    faviconUrl = faviconLink.href;
  }

  // If a favicon URL is found within the iframe document, use it; otherwise, set it to empty string or a default favicon URL.
  faviconUrl = faviconUrl || '';

  const bookmark = { title: bookmarkTitle, url: bookmarkUrl, favicon: faviconUrl };

  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  displayBookmarks();
}

function displayBookmarks() {
  const listDiv = document.getElementById('bookmarkList');
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  let listHtml = '<hr>';
  bookmarks.forEach((bookmark, index) => {
    listHtml += `<img src="${bookmark.favicon}" alt="Favicon" class="favicon" /><a href="#" class="bookmark-link" data-url="${bookmark.url}"></a><br>`;
  });
  listHtml += '<hr>';
  listDiv.innerHTML = listHtml;

  attachBookmarkClickHandlers();
}

function attachBookmarkClickHandlers() {
  const links = document.querySelectorAll('.bookmark-link');
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      loadIframe(this.dataset.url);
    });
  });
}

function loadIframe(url) {
  const iframe = document.getElementById('iframeId');
  iframe.src = url;
}

// Initialize the bookmarks when the document is fully loaded.
document.addEventListener('DOMContentLoaded', function () {
  initializeBookmarks();
  displayBookmarks();
  document.getElementById('saveBookmarkButton').addEventListener('click', saveBookmark);
});