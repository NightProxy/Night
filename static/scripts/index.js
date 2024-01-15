"use strict";

document.addEventListener('DOMContentLoaded', async function(){
  await worker();
  workerLoaded = true;
})

function prependHttps(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
}

function ifUrl(val = "") {
  const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/;
  return urlPattern.test(val);
}
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

const input = document.querySelector("input");

let workerLoaded;

async function worker() {
  return await navigator.serviceWorker.register("/static/dyn.js", {
    scope: __dynamic$config.prefix,
  });
}

document.addEventListener('DOMContentLoaded', async function(){
  await worker();
  workerLoaded = true;
})

if (localStorage.getItem("proxy") == "uv") {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    window.navigator.serviceWorker
      .register("/static/uv.js", {
        scope: __uv$config.prefix,
      })
      .then(() => {
        const url = search(address.value, searchEngine.value);
        sessionStorage.setItem("encodedUrl", "/static/ghost/" + __uv$config.encodeUrl(url));
        location.href = "edu.html";
      });
  });
} else if (localStorage.getItem("proxy") == "dyn") {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Connecting to service -> loading");
    if (typeof navigator.serviceWorker === "undefined") {
      alert(
        "An error occured with the proxy service please make sure ur proxy settings are configure correctly in settings."
      );
    }
    if (!workerLoaded) {
      await worker();
    }
    const url = search(address.value, searchEngine.value);
    sessionStorage.setItem("encodedUrl", "/static/amp/route" + "?url=" + encodeURI(url));
    location.href = "edu.html";
});

} else {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    window.navigator.serviceWorker
      .register("/static/uv.js", {
        scope: __uv$config.prefix,
      })
      .then(() => {
        const url = search(address.value, searchEngine.value);
        sessionStorage.setItem("encodedUrl", "/static/ghost/" + __uv$config.encodeUrl(url));
        location.href = "edu.html";
      });
  });
}
