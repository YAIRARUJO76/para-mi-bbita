const scenes = [...document.querySelectorAll(".scene")];
const startButton = document.getElementById("startButton");
const nextButtons = [...document.querySelectorAll(".next-button")];
const gardenNext = document.getElementById("gardenNext");
const openLetter = document.getElementById("openLetter");
const envelope = document.getElementById("envelope");
const flowerField = document.getElementById("flower-field");
const loveMusic = document.getElementById("loveMusic");

let currentScene = 0;
let flowersCreated = 0;

const changeScene = index => {
    if (index < 0 || index >= scenes.length) return;

    scenes[currentScene].classList.remove("active");

    currentScene = index;

    setTimeout(() => {
        scenes[currentScene].classList.add("active");
    }, 100);

    if (currentScene === 6) {
    createFinalGarden();
}
};

const startMusic = () => {
    loveMusic.volume = 0.7;
    loveMusic.play().catch(() => {});
};

const createStars = () => {
    const stars = document.getElementById("stars");
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 180; i++) {
        const star = document.createElement("span");

        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty("--duration", `${2 + Math.random() * 5}s`);
        star.style.setProperty("--delay", `${Math.random() * 5}s`);
        star.style.opacity = Math.random();

        fragment.appendChild(star);
    }

    stars.appendChild(fragment);
};

const createParticles = () => {
    const particles = document.getElementById("particles");
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 35; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 7}s`;
        particle.style.animationDuration = `${5 + Math.random() * 7}s`;
        particle.style.opacity = Math.random() * .5;

        fragment.appendChild(particle);
    }

    particles.appendChild(fragment);
};

const createFlower = (x, y) => {
    const flower = document.createElement("div");

    flower.className = "mini-flower";
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;

    flowerField.appendChild(flower);

    flowersCreated++;

    if (flowersCreated >= 5) {
        gardenNext.classList.add("visible");
    }
};

const createFinalGarden = () => {
    const finalGarden = document.getElementById("final-garden");

    if (finalGarden.children.length > 0) return;

    for (let i = 0; i < 65; i++) {
        const flower = document.createElement("span");

        flower.className = "final-flower";
        flower.textContent = "✿";
        flower.style.left = `${5 + Math.random() * 90}%`;
        flower.style.top = `${8 + Math.random() * 84}%`;
        flower.style.fontSize = `${15 + Math.random() * 25}px`;
        flower.style.animationDelay = `${Math.random() * 2.5}s`;

        finalGarden.appendChild(flower);
    }
};

startButton.addEventListener("click", () => {
    startMusic();
    changeScene(1);
});

nextButtons.forEach(button => {
    button.addEventListener("click", () => {
        changeScene(currentScene + 1);
    });
});

gardenNext.addEventListener("click", event => {
    event.stopPropagation();
    changeScene(5);
});

openLetter.addEventListener("click", () => {
    envelope.classList.add("open");

    setTimeout(() => {
        changeScene(6);
    }, 1100);
});

document.getElementById("scene-interactive").addEventListener("click", event => {
    if (event.target.closest("#gardenNext")) return;

    const rect = flowerField.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    createFlower(x, y);
});

window.addEventListener("resize", () => {
    if (currentScene === 6) {
        createFinalGarden();
    }
});

createStars();
createParticles();
const startDate = new Date("2025-12-26T03:00:00-05:00");

const updateCounter = () => {
    const now = new Date();

    let months =
        (now.getFullYear() - startDate.getFullYear()) * 12 +
        (now.getMonth() - startDate.getMonth());

    let anniversary = new Date(startDate);
    anniversary.setMonth(startDate.getMonth() + months);

    if (anniversary > now) {
        months--;
        anniversary = new Date(startDate);
        anniversary.setMonth(startDate.getMonth() + months);
    }

    const difference = now - anniversary;

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    document.getElementById("counterMonths").textContent = months;
    document.getElementById("counterDays").textContent = days;
    document.getElementById("counterHours").textContent = String(hours).padStart(2, "0");
    document.getElementById("counterMinutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("counterSeconds").textContent = String(seconds).padStart(2, "0");
};

updateCounter();
setInterval(updateCounter, 1000);

