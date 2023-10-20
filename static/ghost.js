import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18.2/+esm"

const canvasEl = document.querySelector("#ghost");

const mouseThreshold = .1;
const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

const mouse = {
    x: .3 * window.innerWidth,
    y: .3 * window.innerHeight,
    tX: .25 * window.innerWidth,
    tY: .45 * window.innerHeight,
    moving: false,
    controlsPadding: 0
};

const params = {
    size: .1,
    tail: {
        dotsNumber: 25,
        spring: 1.4,
        friction: .3,
        maxGravity: 50,
        gravity: 25,
    },
    smile: 1,
    mainColor: [.98, .96, .96],
    borderColor: [.2, .5, .7],
    isFlatColor: false,
};


const textureEl = document.createElement("canvas");
const textureCtx = textureEl.getContext("2d");
const pointerTrail = new Array(params.tail.dotsNumber);
let dotSize = (i) => params.size * window.innerHeight * (1. - .2 * Math.pow(3. * i / params.tail.dotsNumber - 1., 2.));
for (let i = 0; i < params.tail.dotsNumber; i++) {
    pointerTrail[i] = {
        x: mouse.x,
        y: mouse.y,
        vx: 0,
        vy: 0,
        opacity: .04 + .3 * Math.pow(1 - i / params.tail.dotsNumber, 4),
        bordered: .6 * Math.pow(1 - i / pointerTrail.length, 1),
        r: dotSize(i)
    }
};


let uniforms;
const gl = initShader();
createControls();

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
render();

window.addEventListener("mousemove", e => {
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});
window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});

let movingTimer = setTimeout(() => mouse.moving = false, 300);

function updateMousePosition(eX, eY) {
    mouse.moving = true;
    if (mouse.controlsPadding < 0) {
        mouse.moving = false;
    }
    clearTimeout(movingTimer);
    movingTimer = setTimeout(() => {
        mouse.moving = false;
    }, 300);

    mouse.tX = eX;

    const size = params.size * window.innerHeight;
    eY -= .6 * size;
    mouse.tY = eY > size ? eY : size;
    mouse.tY -= mouse.controlsPadding;
};


function initShader() {
    const vsSource = document.getElementById("vertShader").innerHTML;
    const fsSource = document.getElementById("fragShader").innerHTML;

    const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");

    if (!gl) {
        alert("WebGL is not supported by your browser.");
    }

    function createShader(gl, sourceCode, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);

    function createShaderProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
    uniforms = getUniforms(shaderProgram);

    function getUniforms(program) {
        let uniforms = [];
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let uniformName = gl.getActiveUniform(program, i).name;
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
    }

    const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);

    const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const canvasTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, canvasTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureEl);
    gl.uniform1i(uniforms.u_texture, 0);

    gl.uniform1f(uniforms.u_size, params.size);
    gl.uniform3f(uniforms.u_main_color, params.mainColor[0], params.mainColor[1], params.mainColor[2]);
    gl.uniform3f(uniforms.u_border_color, params.borderColor[0], params.borderColor[1], params.borderColor[2]);

    return gl;
};

function updateTexture() {
    textureCtx.fillStyle = 'black';
    textureCtx.fillRect(0, 0, textureEl.width, textureEl.height);

    pointerTrail.forEach((p, pIdx) => {
        if (pIdx === 0) {
            p.x = mouse.x;
            p.y = mouse.y;
        } else {
            p.vx += (pointerTrail[pIdx - 1].x - p.x) * params.tail.spring;
            p.vx *= params.tail.friction;

            p.vy += (pointerTrail[pIdx - 1].y - p.y) * params.tail.spring;
            p.vy *= params.tail.friction;
            p.vy += params.tail.gravity;

            p.x += p.vx;
            p.y += p.vy;
        }

        const grd = textureCtx.createRadialGradient(p.x, p.y, p.r * p.bordered, p.x, p.y, p.r);
        grd.addColorStop(0, 'rgba(255, 255, 255, ' + p.opacity + ')');
        grd.addColorStop(1, 'rgba(255, 255, 255, 0)');

        textureCtx.beginPath();
        textureCtx.fillStyle = grd;
        textureCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        textureCtx.fill();
    });
};


function render() {
    const currentTime = performance.now();
    gl.uniform1f(uniforms.u_time, currentTime);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (mouse.moving) {
        params.smile -= .05;
        params.smile = Math.max(params.smile, -.1);
        params.tail.gravity -= 10 * params.size;
        params.tail.gravity = Math.max(params.tail.gravity, 0);
    } else {
        params.smile += .01;
        params.smile = Math.min(params.smile, 1);
        if (params.tail.gravity > 30 * params.size) {
            params.tail.gravity = (30 + 9 * (1 + Math.sin(.002 * currentTime))) * params.size;
        } else {
            params.tail.gravity += params.size;
        }
    }

    mouse.x += (mouse.tX - mouse.x) * mouseThreshold;
    mouse.y += (mouse.tY - mouse.y) * mouseThreshold;

    gl.uniform1f(uniforms.u_smile, params.smile);
    gl.uniform2f(uniforms.u_pointer, mouse.x / window.innerWidth, 1. - mouse.y / window.innerHeight);
    gl.uniform2f(uniforms.u_target_pointer, mouse.tX / window.innerWidth, 1. - mouse.tY / window.innerHeight);

    updateTexture();

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureEl);
    requestAnimationFrame(render);
};

function resizeCanvas() {
    canvasEl.width = window.innerWidth * devicePixelRatio;
    canvasEl.height = window.innerHeight * devicePixelRatio;
    textureEl.width = window.innerWidth;
    textureEl.height = window.innerHeight;
    gl.viewport(0, 0, canvasEl.width, canvasEl.height);
    gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
    for (let i = 0; i < params.tail.dotsNumber; i++) {
        pointerTrail[i].r = dotSize(i);
    }
};

function createControlsold() {
    const gui = new GUI();
    gui.add(params, "size", .02, .3, .01)
        .onChange(v => {
            for (let i = 0; i < params.tail.dotsNumber; i++) {
                pointerTrail[i].r = dotSize(i);
            }
            gl.uniform1f(uniforms.u_size, params.size);
        });
    gui.addColor(params, "mainColor").onChange(v => {
        gl.uniform3f(uniforms.u_main_color, v[0], v[1], v[2]);
    });
    const borderColorControl = gui.addColor(params, "borderColor").onChange(v => {
        gl.uniform3f(uniforms.u_border_color, v[0], v[1], v[2]);
    });
    gui.add(params, "isFlatColor")
        .onFinishChange(v => {
            borderColorControl.disable(v);
            gl.uniform1f(uniforms.u_flat_color, v ? 1 : 0);
        });

    const controlsEl = document.querySelector(".lil-gui");
    controlsEl.addEventListener("mouseenter", () => {
        mouse.controlsPadding = -controlsEl.getBoundingClientRect().height;
    });
    controlsEl.addEventListener("mouseleave", () => {
        mouse.controlsPadding = 0;
    });
};
