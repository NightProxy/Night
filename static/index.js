"use strict";
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  window.navigator.serviceWorker
    .register("./sw.js", {
      scope: __uv$config.prefix,
    })
    .then(() => {
      let url = input.value.trim();
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "http://" + url;
      sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      location.href = "search.html";
    });
});


function go(value) {
    let iframe = document.querySelector(".iframe.active");
    window.navigator.serviceWorker
      .register("./sw.js", {
        scope: __uv$config.prefix,
      })
      .then(() => {
        let url = value.trim();
        if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
        else if (!(url.startsWith("https://") || url.startsWith("http://")))
          url = "https://" + url;
        //pass the encoded url to the second page
        sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
        location.href = "go.html";
      });
  }

function blank(value) {
    let iframe = document.querySelector(".iframe.active");
    window.navigator.serviceWorker
      .register("./sw.js", {
        scope: __uv$config.prefix,
      })
      .then(() => {
        let url = value.trim();
        if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
        else if (!(url.startsWith("https://") || url.startsWith("http://")))
          url = "https://" + url;
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
      });
  }
  
  function isUrl(val = "") {
    if (
      /^http(s?):\/\//.test(val) ||
      (val.includes(".") && val.substr(0, 1) !== " ")
    )
      return true;
    return false;
  }
