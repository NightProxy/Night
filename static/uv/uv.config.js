if (localStorage.bare == "default") {
    var bare = "https://andromeda-bare.vercel.app";
} else if (localStorage.bare == "default2") {
    var bare = "https://andromedabare.vercel.app";
} else if (localStorage.bare == "default3") {
    var bare = "https://218-39-2-78-101-249-205-32-24-217-131.vercel.app";
} else if (localStorage.bare == "sndefault") {
    var bare = "https://phantom.lol/bare";
} else if (localStorage.bare == "snalt") {
    var bare = "https://multiplication.cheap-car-rental.com/bare";
} else if {localStorage.bare == "indefault") {
    var bare = "https://interstellar-deployable-mu.vercel.app/outerspace";
} else {
    var bare = "https://218-39-2-78-101-249-205-32-24-217-131.vercel.app";
};

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
