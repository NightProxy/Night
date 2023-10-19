function settingoptions() {
    var iframeContainer = document.createElement('div');
    iframeContainer.setAttribute('id', 'iframeContainer');
    iframeContainer.style.display = 'flex';
    iframeContainer.style.position = 'fixed';
    iframeContainer.style.top = '0';
    iframeContainer.style.left = '0';
    iframeContainer.style.width = '100%';
    iframeContainer.style.height = '100%';
    iframeContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    iframeContainer.style.zIndex = '9999';

    var iframeBox = document.createElement('div');
    iframeBox.setAttribute('id', 'iframeBox');
    iframeBox.style.position = 'relative';
    iframeBox.style.margin = 'auto';
    iframeBox.style.width = '90%';
    iframeBox.style.height = '80%';
    iframeBox.style.backgroundColor = 'none';
    iframeBox.style.border = '1px solid #ccc';
    iframeBox.style.borderRadius = '5px';
    iframeBox.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';

    var closeButton = document.createElement('i');
    closeButton.innerHTML = '<i class="fa-solid fa-x fa-lg" style="color: #f40b0b;"></i>';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '2px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function() {
        document.body.removeChild(iframeContainer);
    };

    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', '/settings/');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');

    iframeBox.appendChild(closeButton);
    iframeBox.appendChild(iframe);
    iframeContainer.appendChild(iframeBox);

    document.body.appendChild(iframeContainer);
    
}

function openNewTab() {
    const currentURL = window.location.origin;
    const newTab = window.open('about:blank', '_blank');
    newTab.document.write('<html><body style="margin: 0; padding: 0;"><embed src="' + currentURL + '" style="width: 100%; height: 100%;"></embed></body></html>');
    newTab.document.close();
  }

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
    }}
    toggleState = !toggleState;
  };