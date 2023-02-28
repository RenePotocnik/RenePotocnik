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

        if (!('ontouchstart' in window) || !(navigator.maxTouchPoints > 0)) {
            cursor.style.top = lastCursorY + "px";
        }
    });
}


const cursor = document.querySelector(".cursor");
const cursorPoint = document.querySelector(".cursorPoint");

addEventListener("mousemove", cursorUpdate);
function cursorUpdate (event) {
    // Move `#cursor` element to the mouse position
    if (!('ontouchstart' in window) || !(navigator.maxTouchPoints > 0)) {
        cursor.style.left = event.pageX + "px";
        cursor.style.top = event.pageY + "px";

        cursorPoint.style.left = event.pageX + "px";
        cursorPoint.style.top = event.pageY + "px";
    } else {
        cursor.style.display = "none";
        cursorPoint.style.display = "none";
    }
}

let hoverables = document.querySelectorAll(".hoverable");
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

