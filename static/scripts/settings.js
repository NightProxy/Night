var ss = document.createElement('link');
ss.rel = 'stylesheet';
ss.href = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.12.0/cdn/themes/dark.css';
document.head.appendChild(ss);

var ssscript = document.createElement('script');
ssscript.type = 'text/javascript';
ssscript.src = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.12.0/cdn/shoelace-autoloader.js';
document.body.appendChild(ssscript);

var cookie = document.createElement('script');
cookie.type = 'text/javascript';
cookie.src = '/js.cookie.min.js';
document.body.appendChild(cookie);

var noto = document.createElement('link');
noto.rel = 'stylesheet';
noto.href = "https://fonts.googleapis.com/css?family=Noto Sans";
document.head.appendChild(noto);

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

settings = document.getElementById("sidenav");
function hide_sidenav() {
  if (settings.hidden == false) {
    settings.hidden = true;
  } else {
    settings.hidden = false;
  }
};

icons = document.getElementById("icbuttons");
home = document.getElementById("home");
apps = document.getElementById("apps");
game = document.getElementById("games");
extras = document.getElementById("extras");
sett = document.getElementById("settings");
spantags = document.querySelector(".names");
navitems = document.querySelector(".navitem");

function topbar() {
  icons.style.display = "flex";
  icons.style.alignItems = "left";
  icons.style.justifyItems = "left";
  apps.innerHTML += '<span class="names">Apps</span>';
  game.innerHTML += '<span class="names">Games</span>';
  extras.innerHTML += '<span class="names">Extras</span>';
  sett.innerHTML += '<span class="names">Settings</span>';

};

function closesettings() {
  settings.hidden = true;
};

var cloakStored = localStorage.getItem("cloak");
var cloakSel = document.getElementById("cloakSwitcher");

function switchCloak() {
  var selecter = document.getElementById("cloakSwitcher");
  var selectedOption = selecter.value;

  localStorage.setItem("cloak", selectedOption);
  var storedChoice = localStorage.getItem("cloak");
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

var themeStored = localStorage.getItem("theme");
var themeSel = document.getElementById("themeSwitcher");

function switchTheme() {
  var selecter = document.getElementById("themeSwitcher");
  var selectedOption = selecter.value;

  localStorage.setItem("theme", selectedOption);
  var storedChoice = localStorage.getItem("theme");
};

function reloadpage() {
  location.reload();
};

themefile = document.getElementById("themecss");
particlestheme = document.getElementById("paeticlesrc");
logo = document.getElementById("logo");

var splashCacheAll;
var splashCache;

async function randomSay() {
  // If splashCache is defined and not empty
  if (splashCache) {
    // If splashCache is empty, set it equal to the full set of splash messages
    if (!splashCache.length) {
      splashCache = splashCacheAll;
    }
    // Set says variable to the current splashCache
    var says = splashCache;
  } else {
    // If splashCache is undefined or empty, fetch the full set of splash messages
    var say = await fetch("/json/say.json");
    var says = await say.json();
    // Store the full set of splash messages in both splashCacheAll and splashCache
    splashCacheAll = says;
    splashCache = says;
  }

  // Get a random splash message from the current says set
  var getRandomSay = says[Math.floor(Math.random() * says.length)];

  // Remove the randomly selected splash message from the cache
  splashCache = splashCache.filter((splash) => splash !== getRandomSay);

  // Return the randomly selected splash message
  return getRandomSay;
}

// Async function that sets a random splash message in the DOM
async function setRandomSay() {
  // Get a random splash message using the randomSay() function
  var randomSplash = await randomSay();

  // If the random message is "%REAL_IP%", replace it with the user's IP address

  // If the random message is "%GAMES_NUMBER%", replace it with the number of games available

  // Set the random splash message in the DOM
  document.querySelector(".message").innerText = randomSplash;
};

var bareStored = localStorage.getItem("bare")
var bareSel = document.getElementById("bareSwitcher")

function switchBare() {
  var selecter = document.getElementById("bareSwitcher");
  var selectedOption = selecter.value;
  var inputValue = document.getElementById('bareUrl').value;

  const finalValue = inputValue.trim() !== '' ? inputValue : selectedOption;
  localStorage.setItem("bare", finalValue);
  var storedChoice = localStorage.getItem("bare");
};

function setdefaults() {
  if (localStorage.theme == undefined) {
    localStorage.setItem("theme", "default")
  };
  if (localStorage.bare == undefined) {
    localStorage.setItem("bare", "default")
  };
  if (localStorage.particlecheckboxState == undefined) {
    localStorage.setItem("particlecheckboxState", "false")
  };
  if (localStorage.blankcheckboxState == undefined) {
    localStorage.setItem("blankcheckboxState", "false")
  };
  if (localStorage.proxy == undefined ) {
    localStorage.setItem("proxy", "uv");
  }
  localStorage.setItem("defaults", "set")
};

function openGame() {
  var win = window.open()
  var url = window.location.href;
  var iframe = win.document.createElement('iframe');
  iframe.style.frameborder = "0";
  iframe.style.marginwidth = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.position = "fixed";
  iframe.style.inset = "0px";
  iframe.style.outline = "none";
  iframe.style.scrolling = "auto";
  iframe.src = url;
  win.document.body.appendChild(iframe);
};
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const tofade = document.getElementById('sidenav');

function fadeOutElement() {
  $("#sidenav").fadeOut();
}

function fadeInElement() {
  $("#sidenav").fadeIn();
}
// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  const particlecheckbox = document.querySelector('.particlecheckbox');

  // Define the function to run on certain pages
  const isparticleChecked = localStorage.getItem('particlecheckboxState') === 'true';
  particlecheckbox.checked = isparticleChecked;

  particlecheckbox.addEventListener('change', function () {
    // Update localStorage with the new state
    localStorage.setItem('particlecheckboxState', particlecheckbox.checked);
    reloadpage();
  });
});

function setthemes() {
  if (localStorage.theme == "default") {
    themefile.href = "/css/index.css";
    if (localStorage.cloak == "off") {
      changeFavicon('/images/favicon/favicon.ico');
    };
    logo.src = "/images/favicon/favicon.ico";
  } else if (localStorage.theme == "monochrome") {
    themefile.href = "/css/themes/monochrome/monochrome.css";
    if (localStorage.cloak == "off") {
      changeFavicon('/css/themes/monochrome/favicon.ico');
    };
    logo.src = "/css/themes/monochrome/favicon.ico";
  } else if (localStorage.theme == "void") {
    themefile.href = "/css/themes/void/void.css";
  } else if (localStorage.theme == "ip") {
    themefile.href = "/css/themes/ironprime/ironprime.css";
    logo.src = "/css/themes/fire/firethemelogo.png";
  } else if (localStorage.theme == "xg") {
    themefile.href = "/css/themes/xgames/xgames.css";
  } else if (localStorage.theme == "stealth") {
    themefile.href = "/css/themes/stealth/stealth.css";
  } else if (localStorage.theme == "fg") {
    themefile.href = "/css/themes/froggermans/froggermans.css";
  } else if (localStorage.theme == "ghost") {
    themefile.href = "/css/themes/ghost/ghost.css";
  } else if (localStorage.theme == "midnight") {
    themefile.href = "/css/themes/midnight/midnight.css";
  } else if (localStorage.theme == "fire") {
    themefile.href = "/css/themes/fire/fire.css";
    if (localStorage.cloak == "off") {
      changeFavicon('/css/themes/fire/favicon.ico');
    };
    logo.src = "/css/themes/fire/favicon.ico";
  } else if (localStorage.theme == "meteor") {
    themefile.href = "/css/themes/meteor/meteor.css";
  } else {
    themefile.href = "/css/index.css";
    if (localStorage.cloak == "off") {
      changeFavicon('/images/favicon/favicon.ico');
    };
  }
};

var proxyStored = localStorage.getItem("proxy");
var proxySel = document.getElementById("proxySwitcher");

function switchProxy() {
  var selecter = document.getElementById("proxySwitcher");
  var selectedOption = selecter.value;

  localStorage.setItem("proxy", selectedOption);
  var storedChoice = localStorage.getItem("proxy");
};

const blob = document.getElementById('blob');

document.body.onpointermove = event => {
	const { clientX, clientY } = event;
	
	blob.animate({
		left: `${clientX}px`,
		top: `${clientY}px`
	}, {
		duration: 3000,
		fill: 'forwards'
	});
}

window.addEventListener("load", () => {
  clock();
  function clock() {
    const today = new Date();

    // get time components
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    //add '0' to hour, minute & second when they are less 10
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;

    //make clock a 12-hour time clock
    const hourTime = hour > 12 ? hour - 12 : hour;

    // if (hour === 0) {
    //   hour = 12;
    // }
    //assigning 'am' or 'pm' to indicate time of the day
    const ampm = hour < 12 ? "AM" : "PM";

    const time = hourTime + ":" + minute + ":" + second + ampm;

    document.getElementById("time").innerHTML = time;
    setTimeout(clock, 1000);
  }
});

/* window.onload = function() {
navigator.getBattery().then(function(battery) {
  // Get the current battery level
  var batteryLevel = battery.level * 100;
  // Do something with the battery level, such as display it to the user
  document.getElementById("battery").innerHTML = batteryLevel + "%";
  battery.addEventListener("levelchange", document.getElementById("battery").innerHTML = batteryLevel + "%");
});
}; */

setdefaults();
setthemes();
setcloaks();
topbar();
themeSel.value = themeStored;
bareSel.value = bareStored;
cloakSel.value = cloakStored;
cloakSel.value = cloakStored;
proxySel.value = proxyStored;
if (document.querySelector(".message")) {
  setRandomSay();
}
