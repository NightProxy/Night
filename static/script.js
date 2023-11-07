const search = document.getElementById("search");
search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    if ("serviceWorker" in navigator) {
      // TODO: Remove nocahce for production
      navigator.serviceWorker.register(`/sw.js?1`, {
        scope: __osana$config.prefix
      }).then(() => {
        let location;
        if (/^https?:\/\/([^\s]+\.)+[^\s]+$/.test(search.value.trim())) location = search.value;
        else {
          if (/^([^\s]+\.)+[^\s]+$/.test(search.value.trim())) location = "https://" + search.value;
          else location = "https://search.brave.com/search?q=" + encodeURIComponent(search.value);
        }
        window.location.href = `${__osana$config.prefix}${__osana$config.codec.encode(location)}`;
      }).catch((e) => {
        alert(e.message);
        console.error(e);
      });
    } else {
      alert("Service Worker is not supported in your browser.");
    }
  }
});
