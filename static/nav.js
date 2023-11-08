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

subpanel = document.getElementById("sidenav");
function hide_sidenav(){
  if (subpanel.hidden == false){
      subpanel.hidden = true;
  }else{
      subpanel.hidden = false;
  }
};

icons = document.getElementById("icbuttons");
barswtch = document.getElementById("barswitch");
iconswtch = document.getElementById("iconswitch");

function sidebar() {
  icons.style.display="grid";
  icons.style.position="fixed";
  icons.style.alignItems="center";
  icons.style.justifyItems="center";
  icons.style.right="0";
  icons.style.left="";
  localStorage.setItem("bar", "side");
  localStorage.setItem("icon", "off");
};

function topbar() {
  icons.style.display="flex";
  icons.style.alignItems="left";
  icons.style.justifyItems="left";
  icons.style.right="";
  icons.style.left="0";
  localStorage.setItem("bar", "top");
  localStorage.setItem("icon", "on");
  
};

function bartoggle() {
  if (localStorage.getItem("bar") == 'side'){
    topbar();
  }else{
    sidebar();
  }
};

function setuserbar() {
  if (localStorage.getItem("bar") == 'side'){
    sidebar();
  }else{
    topbar();
  }
};

function setbartoggleicon() {
  if (localStorage.getItem("icon") == 'off'){
    barswtch.classList.add("fa-toggle-off");
    barswtch.classList.remove("fa-toggle-on");
  }else{
    barswtch.classList.add("fa-toggle-on");
    barswtch.classList.remove("fa-toggle-off");
  }
};

function closesettings() {
    subpanel.hidden = true;
};

function cloakon() {
    changeFavicon('./images/favicon/drive.png');
    document.title = "My Drive - Google Drive";
     localStorage.setItem("cloak", "on");
};

function cloakoff() {
     changeFavicon('../favicon.ico');
     document.title = "Andromeda";
     localStorage.setItem("cloak", "off");
};

function cloaktoggle() {
  if (localStorage.getItem("cloak") == 'off'){
    cloakon();
  }else{
    cloakoff();
  }
};

function setusercloak() {
  if (localStorage.getItem("cloak") == 'on'){
    cloakon();
  }else{
    cloakoff();
  }
};
    
function setcloaktoggleicon() {
  if (localStorage.getItem("cloak") == 'off'){
    iconswtch.classList.add("fa-toggle-off");
    iconswtch.classList.remove("fa-toggle-on");
  }else{
    iconswtch.classList.add("fa-toggle-on");
    iconswtch.classList.remove("fa-toggle-off");
  }
};

var proxyStored = localStorage.getItem("proxy")
var proxySel = document.getElementById("proxySwitcher")

function switchProxy() {
  var selecter = document.getElementById("proxySwitcher");
  var selectedOption = selecter.value;

  localStorage.setItem("proxy", selectedOption);
  var storedChoice = localStorage.getItem("proxy");
};

function setdefaults() {
 if (localStorage.proxy == undefined) {
  localStorage.setItem("proxy", "uv")
 };
};

window.addEventListener("load", ()=>{
    navigator.serviceWorker.register("./uv-sw.js", {
        scope: "/static/"
    });
    function isUrl(val="") {
        if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " "))
            return true;
        return false;
    }
    const proxy = localStorage.getItem("proxy") || "uv";
    const form = document.querySelector("form");
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        if (typeof navigator.serviceWorker === "undefined")
            alert("An error occured registering your service worker. Please contact support - discord.gg/unblocker");
        if (proxy === "uv" || proxy === "osana") {
            navigator.serviceWorker.register("./uv-sw.js", {
                scope: "/static/"
            }).then(()=>{
                const value = event.target.firstElementChild.value;
                let url = value.trim();
                if (!isUrl(url))
                    url = "https://www.google.com/search?q=" + url;
                if (!(url.startsWith("https://") || url.startsWith("http://")))
                    url = "http://" + url;
                let redirectTo = proxy === "uv" ? __uv$config.prefix + __uv$config.encodeUrl(url) : __osana$config.prefix + __osana$config.codec.xor(url);
                    }
                    , 1000);
    }
}
);
    
setuserbar();
setusercloak();
setbartoggleicon();
setcloaktoggleicon();
proxySel.value = proxyStored

