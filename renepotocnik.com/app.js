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
            letters[i].style.opacity = `${1 - (window.scrollY / 400)}`;
            letters[i].style.filter = `blur(${window.scrollY / 20}px)`;
        }
    });
}

window.addEventListener("load", function () {
    // Call functions to modify both containers
    splitLetters("nameLetterContainer1");
    splitLetters("nameLetterContainer2");

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});