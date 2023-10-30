subpanel = document.getElementById("sidenav");
function hide_sidenav(){
  if (subpanel.hidden == false){
      subpanel.hidden = true;
  }else{
      subpanel.hidden = false;
  }
};

icons = document.getElementById("icbuttons");

function sidebar() {
  icons.style.position="fixed";
  icons.style.alignItems="center";
  icons.style.justifyItems="center";
  icons.style.right="0";
};

function topbar() {
  icons.style.alignItems="left";
  icons.style.justifyItems="";
  icons.style.right="";
};

