var bare;

// Check if localStorage is available
if (typeof localStorage !== 'undefined') {
  // Retrieve value from localStorage
  bare = localStorage.getItem("bare");
} else {
  // Provide a fallback or handle the absence of localStorage
  bare = "https://night-bare.vercel.app"; // You may adjust this based on your requirements
}

self.__uv$config = {
  prefix: '/static/ghost/',
  bare: bare,
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/static/uv/uv.handler.js',
  bundle: '/static/uv/uv.bundle.js',
  config: '/static/uv/uv.config.js',
  sw: '/static/uv/uv.sw.js',
};