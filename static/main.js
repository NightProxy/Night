document.addEventListener("DOMContentLoaded", () => {
    const registerServiceWorker = registerSW().catch((err) => {
      error.textContent = "Failed to register service worker.";
      errorCode.textContent = err.toString();
      throw err;
    });
    
    const form = document.getElementById("uv-form");
    const address = document.getElementById("uv-address");
    const searchEngine = document.getElementById("uv-search-engine");
    const error = document.getElementById("uv-error");
    const errorCode = document.getElementById("uv-error-code");

    window.addEventListener('load', async () => {
        await registerServiceWorker();
      });


    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search(address.value, "https://www.google.com/search?q=%s");
        localStorage.setItem("mainurl", url);
    });

    const discord = document.getElementById('discord');
    discord.addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("discord.com", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });

    const chess = document.getElementById('chess');
    chess.addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("chess.com", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
    const mc = document.getElementById('mc');
    mc.addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("https://mess.eu.org/play/", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
    const poki = document.getElementById('poki');
    poki.addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("poki.com", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
    const y8 = document.getElementById('y8');
    y8.addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("y8.com", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
    const yt = document.getElementById('yt');
    yt .addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("youtube.com", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
    const gpt = document.getElementById('gpt');
    gpt.addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("chatgpt-app.techwithanirudh.repl.co/login", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
    const vs = document.getElementById('vs');
    vs.addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("vscode.dev", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
    const github = document.getElementById('github');
    github.addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("github.com", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
    const calc = document.getElementById('calc');
    calc.addEventListener('click', async (event) => {
        event.preventDefault();
        await registerServiceWorker;
        const url = search("www.desmos.com/scientific", "https://www.google.com/search?q=%s");
        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});
  
  
  
