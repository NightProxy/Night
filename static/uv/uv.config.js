var bare;

// Check if localStorage is available
if (typeof localStorage !== 'undefined') {
  // Retrieve value from localStorage
  bare = localStorage.getItem("bare");
} else {
  // Provide a fallback or handle the absence of localStorage
  bare = "/bare/"; // You may adjust this based on your requirements
}

self.__uv$config = {
  prefix: '/ghost/',
  bare: bare,
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/uv/uv.handler.js',
  bundle: '/uv/uv.bundle.js',
  config: '/uv/uv.config.js',
  sw: '/uv/uv.sw.js',
};
