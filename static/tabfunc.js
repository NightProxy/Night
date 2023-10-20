let toggleState = false;
function devtooltoggle() {
   if (toggleState) {
        eruda.hide();
        eruda.destroy();
      } else {
        var script = document.createElement('script');
        script.src = "//cdn.jsdelivr.net/npm/eruda";
        document.body.appendChild(script);
        script.onload = function () {
          eruda.init();
          eruda.show();
      }};
      toggleState = !toggleState;
    };

function Fullscreen() {
  const canvas = document.getElementById('body');
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
  }
}


function navigateForward() {
  window.history.forward();
}


function navigateBackward() {
  window.history.back();
}


function reloadIframe() {
  location.reload();
}

function openDiscord() {
 location.href = '/uv/service/hvtrs8%2F-dksaopd%2Ccmm-ilvktg%2Fr9j3fTJAOA';
}

function openIframeInNewTab() {
    const iframeSrc = location.href;
    window.open(iframeSrc, '_blank');
  }


function openSettings() {
  window.location.href="/settings/"
}

function openNewTab() {
    const currentURL = window.location.href;
    const newTab = window.open('about:blank', '_blank');
    newTab.document.write('<html><body style="margin: 0; padding: 0;"><embed src="https://phantomcloud.strangled.net/'&#32;+&#32;currentURL&#32;+&#32;'" style="width: 100%; height: 100%;"></embed></body></html>');
    newTab.document.close();
  }
  
  function openNewWindow() {
    const currentURL = window.location.href;
    const newWindow = window.open('about:blank', '_blank', 'width=800,height=600');
    newWindow.document.write('<html><body style="margin: 0; padding: 0;"><embed src="https://phantomcloud.strangled.net/'&#32;+&#32;currentURL&#32;+&#32;'" style="width: 100%; height: 100%;"></embed></body></html>');
    newWindow.document.close();
  }
  
