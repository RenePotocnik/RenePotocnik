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