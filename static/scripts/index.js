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
    .register("/static/scripts/uv.js", {
      scope: __uv$config.prefix,
    })
    .then(() => {
      const url = search(address.value, searchEngine.value);
      sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      location.href = "edu.html";
    });
});


function go(value) {
    let iframe = document.querySelector(".iframe.active");
    window.navigator.serviceWorker
      .register("/static/scripts/uv.js", {
        scope: __uv$config.prefix,
      })
      .then(() => {
        const url = search(address.value, searchEngine.value);
        //pass the encoded url to the second page
        sessionStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
        location.href = "edu.html";
      });
  }

function blank(value) {
    let iframe = document.querySelector(".iframe.active");
    window.navigator.serviceWorker
      .register("/static/scripts/uv.js", {
        scope: __uv$config.prefix,
      })
      .then(() => {
        const url = search(address.value, searchEngine.value);
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
