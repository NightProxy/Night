function openGame() {
var win = window.open()
var url = "https://evasi.netlify.app/"
var iframe = win.document.createElement('iframe')
iframe.style.frameborder="0";
iframe.style.marginwidth="0";
iframe.style.width="100%" ;
iframe.style.height="100%"
iframe.style.scrolling="auto";
iframe.src = url;
win.document.body.appendChild(iframe);
};
