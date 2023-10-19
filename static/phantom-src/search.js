"use strict";

/**
 *
 * @param {string} input
 * @param {string} template Template for a search query.
 * @returns {string} Fully qualified URL
 */
function search(input, template) {
  let url;

  try {
    url = new URL(input);
    if (url.hostname.includes(".")) {
      return url.toString();
    }
  } catch (err) {
    // input was not a valid URL
  }

  try {
    url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) {
      return url.toString();
    }
  } catch (err) {
    // input was not a valid URL
  }

  // Treat the input as a search query
  return template.replace("%s", encodeURIComponent(input));
}