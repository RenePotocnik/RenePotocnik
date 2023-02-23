const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('showing');
        } else {
            entry.target.classList.remove('showing');
        }
    });
});


function splitLetters(className) {
    const parent = document.querySelector(`.${className}`);
    const txt = parent.innerText;
    parent.innerText = "";

    // Split the sentence into letters and create a `span` element for each letter
    let speed = 1;
    for (let i = 0; i < txt.length; i++) {
        let letter = document.createElement("span");
        letter.speed = speed;
        letter.innerText = txt[i];
        letter.classList.add("nameLetter");
        parent.appendChild(letter)
        letter.style.opacity = 1;

        // The speed increase of each letter - higher number = letters rise faster
        speed = speed * 1.3;
    }

    let letters = document.querySelectorAll(`.${className} > *`);
    window.addEventListener("scroll", function () {
        for (let i = 0; i < txt.length; i++) {
            letters[i].style.transform = `translate(0, -${window.scrollY * letters[i].speed}px)`;
            letters[i].style.opacity = `${1 - (window.scrollY / 900)}`;
            letters[i].style.filter = `blur(${window.scrollY / 500}px)`;
        }
    });
}


addEventListener("mousemove", (event) => {
    // Move `#cursor` element to the mouse position
    const cursor = document.querySelector(".cursor");
    cursor.style.left = event.pageX + "px";
    cursor.style.top = event.pageY + "px";
});

let hoverables = document.querySelectorAll(".hoverable");
const cursor = document.querySelector(".cursor");
hoverables.forEach((el) => {
    el.addEventListener("mouseover", function () {
        cursor.classList.add("cursorBig");
    });
    el.addEventListener("mouseleave", function () {
        cursor.classList.remove("cursorBig");
    });
});


window.addEventListener("load", function () {
    // Call functions to modify both containers
    splitLetters("nameLetterContainer1");
    splitLetters("nameLetterContainer2");

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});


let partNum = 50;
let c = document.getElementById('c');
let ctx = c.getContext('2d');

let w = window.innerWidth;
let h = window.innerHeight;

let mouse = {
    x: w / 2,
    y: 0
};

window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX || e.pageX;
    mouse.y = e.clientY || e.pageY
}, false);

let particles = [];
for (i = 0; i < partNum; i++) {
    particles.push(new Particle);
}

function Particle() {
    this.x = Math.random() * w - w / 20;
    this.y = Math.random() * h;

    this.r = Math.random() * 7.5 + 3.25;
}

let draw = function () {
    c.width = w;
    c.height = h;

    for (let t = 0; t < particles.length; t++) {
        let p = particles[t];
        let nowX = p.r + mouse.x / 4.6;
        let nowY = p.r + mouse.y / 4.6;
        let color = "rgba(255, 255, 255, 0.9";

        if (p.r < 10) {
            nowX = p.x + mouse.x / 0.5;
            nowY = p.y + mouse.y / 0.5;
        }
        if (p.r < 9) {
            nowX = p.x + mouse.x / 2;
            nowY = p.y + mouse.y / 2;
        }
        if (p.r < 8) {
            nowX = p.x + mouse.x / 3.5;
            nowY = p.y + mouse.y / 3.5;
        }
        if (p.r < 7) {
            nowX = p.x + mouse.x / 5;
            nowY = p.y + mouse.y / 5;
        }
        if (p.r < 6) {
            nowX = p.x + mouse.x / 6.5;
            nowY = p.y + mouse.y / 6.5;
        }
        if (p.r < 5) {
            nowX = p.x + mouse.x / 8;
            nowY = p.y + mouse.y / 8;
        }
        if (p.r < 4) {
            nowX = p.x + mouse.x / 9.5;
            nowY = p.y + mouse.y / 9.5;
        }
        if (p.r < 3) {
            nowX = p.x + mouse.x / 11;
            nowY = p.y + mouse.y / 11;
        }
        if (p.r < 2) {
            nowX = p.x + mouse.x / 12.5;
            nowY = p.y + mouse.y / 12.5;
        }
        if (p.r < 1) {
            nowX = p.x + mouse.x / 15;
            nowY = p.y + mouse.y / 15;
        }

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(nowX, nowY, p.r, Math.PI * 2, false);
        ctx.fill();
    }
}

setInterval(draw, 33);