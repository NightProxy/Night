"use strict";
if (localStorage.proxy = "uv"){
  var stockSW = "/static/uv-sw.js";
  var stockscope = "__uv$config.prefix,";
}else{
  var stockSW = "/static/osana-sw.js";
  var stockscope = "__osana$config.prefix,";
};

/**
 * List of hostnames that are allowed to run serviceworkers on http:
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Global util
 * Used in 404.html and index.html
 */
async function registerSW() {
  if (
    location.protocol !== "https:" &&
    !swAllowedHostnames.includes(location.hostname)
  )
    throw new Error("Service workers cannot be registered without https.");

  if (!navigator.serviceWorker)
    throw new Error("Your browser doesn't support service workers.");

  // Ultraviolet has a stock `sw.js` script.
  await navigator.serviceWorker.register(stockSW, {
    scope: var stockscope;
  });
}
