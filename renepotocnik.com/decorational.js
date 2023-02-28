function init() {
    let partNum = 20;
    let c = document.getElementById('c');
    let ctx = c.getContext('2d');

    let w = window.innerWidth;
    let h = window.innerHeight;

    let mouse = {
        x: w / 2,
        y: 0
    };


    window.addEventListener("deviceorientation", function (e) {
        // Move points based on device gyro
        mouse.x = e.gamma * 2;
        mouse.y = e.beta * 2;
    }, true);

    window.addEventListener('mousemove', function (e) {
        // Move points only if there's no touch
        if (!('ontouchstart' in window) || !(navigator.maxTouchPoints > 0)) {
            mouse.x = e.clientX || e.pageX;
            mouse.y = e.clientY || e.pageY;
        }
    }, false);

    let particles = [];
    for (let i = 0; i < partNum; i++) {
        particles.push(new Particle);
    }

    function Particle() {
        this.x = Math.random() * (w + w / 8) - w / 8;
        this.y = Math.random() * (h + h / 8) - h / 8;

        this.r = Math.random() * (screen.width * 0.002) + 2;
    }

    let draw = function () {
        c.width = w;
        c.height = h;

        const ratios = [3.5, 5, 6.5, 8, 9.5, 11, 12.5];

        for (let t = 0; t < particles.length; t++) {
            let p = particles[t];
            let nowX = p.r + mouse.x / 4.6;
            let nowY = p.r + mouse.y / 4.6;
            let color = "rgb(255, 255, 255)";

            let ratioIndex = 0;
            while (ratioIndex < ratios.length && p.r < 9 - ratioIndex) {
                ratioIndex++;
            }
            nowX = p.x + mouse.x / p.r;
            nowY = p.y + mouse.y / p.r;

            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(nowX, nowY, p.r, Math.PI * 2, 0);
            ctx.fill();
        }
    }
    intervalDraw = setInterval(draw, 30);
}

let intervalDraw;
let throttled = false;
const delay = 100;
window.addEventListener('resize', function () {
    if (!throttled) {
        throttled = true;
        clearInterval(intervalDraw);
        // init();
        window.location.reload();
        setTimeout(function () {throttled = false;}, delay);
    }
});

init();