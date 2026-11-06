
const track = document.getElementById("reviewTrack");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const dotsBox = document.getElementById("dots");

const cards = document.querySelectorAll(".card");

let current = 0;

function getVisibleCards() {
    if (window.innerWidth <= 550) {
        return 1;
    } else if (window.innerWidth <= 800) {
        return 2;
    }
    return 3;
}

function updateSlider() {
    const visible = getVisibleCards();
    const maxIndex = cards.length - visible;

    current = Math.min(current, maxIndex);

    const gap = 20;
    const cardWidth = cards[0].offsetWidth + gap;

    track.style.transform = `translateX(-${current * cardWidth}px)`;

    dotsBox.innerHTML = "";

    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement("span");

        dot.className = "dot";

        if (i === current) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            current = i;
            updateSlider();
        });

        dotsBox.appendChild(dot);
    }
}

next.addEventListener("click", () => {
    const maxIndex = cards.length - getVisibleCards();

    current++;

    if (current > maxIndex) {
        current = 0;
    }

    updateSlider();
});

prev.addEventListener("click", () => {
    const maxIndex = cards.length - getVisibleCards();

    current--;

    if (current < 0) {
        current = maxIndex;
    }

    updateSlider();
});

window.addEventListener("resize", updateSlider);

updateSlider();

setInterval(() => {
    const maxIndex = cards.length - getVisibleCards();

    current++;

    if (current > maxIndex) {
        current = 0;
    }

    updateSlider();
}, 5000);
