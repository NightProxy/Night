subpanel = document.getElementById("sidenav");
function hide_sidenav(){
  if (subpanel.hidden == false){
      subpanel.hidden = true;
  }else{
      subpanel.hidden = false;
  }
};

icons = document.getElementById("icbuttons");
swtch = document.getElementById("switch");

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
function settoggleicon() {
  if (localStorage.getItem("icon") == 'off'){
    $(".switch").addClass("fa-toggle-off");
    $(".switch").removeClass("fa-toggle-on");
  }else{
    $(".switch").addClass("fa-toggle-on");
    $(".switch").removeClass("fa-toggle-off");
  }
};
  
setuserbar();
settoggleicon();
