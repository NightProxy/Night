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
  icons.style.display="grid";
  icons.style.position="fixed";
  icons.style.alignItems="center";
  icons.style.justifyItems="center";
  icons.style.right="0";
  icons.style.left="";
};

function topbar() {
  icons.style.display="flex";
  icons.style.alignItems="left";
  icons.style.justifyItems="left";
  icons.style.right="";
  icons.style.left="0";
};

function bartoggle() {
  if (icons.style.display == 'grid'){
    topbar();
  }else{
    sidebar();
  }
};

sidebar();

