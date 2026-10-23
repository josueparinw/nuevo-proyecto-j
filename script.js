const photos = [
  { src: "media/foto-1.jpg", caption: "Un momento que siempre guardaré ❤️" },
  { src: "media/foto-2.jpg", caption: "De esos recuerdos que me hacen sonreír ✨" },
  { src: "media/foto-3.jpg", caption: "te acuerdas de esta comida.💗" },
  { src: "media/foto-4.jpg", caption: "Probando el filtro. ✨" },
  { src: "media/foto-5.jpg", caption: "Un pequeño brindis, me hiciste feliz. 💗" },
  { src: "media/foto-6.jpg", caption: "nos volveremos a disfrazar ✨" },
  { src: "media/foto-7.jpg", caption: "solo dire Camilo"},
  { src: "media/foto-8.jpg", caption: "Nuestro Viaje.💗" }
];

let currentPhoto = 0;
const image = document.getElementById("carouselImage");
const caption = document.getElementById("photoCaption");
const dotsContainer = document.getElementById("carouselDots");

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  image.style.opacity = "0";
  window.setTimeout(() => {
    image.src = photos[currentPhoto].src;
    caption.textContent = photos[currentPhoto].caption;
    image.style.opacity = "1";
  }, 150);
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentPhoto);
    dot.setAttribute("aria-pressed", i === currentPhoto ? "true" : "false");
  });
}

photos.forEach((photo, index) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (index === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Ver fotografía ${index + 1}`);
  dot.setAttribute("aria-pressed", index === 0 ? "true" : "false");
  dot.addEventListener("click", () => showPhoto(index));
  dotsContainer.appendChild(dot);
});
document.getElementById("prevPhoto").addEventListener("click", () => showPhoto(currentPhoto - 1));
document.getElementById("nextPhoto").addEventListener("click", () => showPhoto(currentPhoto + 1));

// Música: por las restricciones del navegador, se intenta iniciar tras el clic del usuario.
const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");
const musicIcon = document.getElementById("musicIcon");
const musicVolume = document.getElementById("musicVolume");
music.volume = Number(musicVolume.value);

async function toggleMusic(forcePlay = false) {
  if (forcePlay || music.paused) {
    try {
      await music.play();
      musicButton.classList.add("playing");
      musicButton.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Pausar";
      musicIcon.textContent = "♫";
    } catch (error) {
      musicLabel.textContent = "Toca para reproducir la canción";
      console.info("El navegador no pudo reproducir la música todavía.", error);
    }
  } else {
    music.pause();
    musicButton.classList.remove("playing");
    musicButton.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Reproducir";
    musicIcon.textContent = "♫";
  }
}
musicButton.addEventListener("click", () => toggleMusic());
musicVolume.addEventListener("input", () => { music.volume = Number(musicVolume.value); });

document.getElementById("openLetter").addEventListener("click", () => {
  const intro = document.getElementById("intro");
  intro.style.transition = "opacity .7s ease, transform .7s ease";
  intro.style.opacity = "0";
  intro.style.transform = "scale(1.03)";
  // Intentamos arrancar la música mientras el clic del usuario sigue habilitando el audio.
  toggleMusic(true);
  window.setTimeout(() => {
    intro.classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "instant" });
    const video = document.querySelector(".hero-video");
    if (video) video.play().catch(() => {});
  }, 650);
});

const heartContainer = document.getElementById("floatingHearts");
function makeHearts(amount = 24) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = ["♥", "♡", "❤", "✦"][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 1.8 + "s";
    heart.style.fontSize = (15 + Math.random() * 25) + "px";
    heartContainer.appendChild(heart);
    window.setTimeout(() => heart.remove(), 7000);
  }
}

document.getElementById("revealQuestion").addEventListener("click", () => {
  const letter = document.getElementById("finalLetter");
  letter.classList.add("opened");
  document.getElementById("finalChoices").classList.remove("hidden");
  document.getElementById("revealQuestion").classList.add("hidden");
  makeHearts(18);
});

document.getElementById("yesButton").addEventListener("click", () => {
  document.getElementById("answerMessage").textContent =
    "Gracias por darme la oportunidad de intentarlo contigo. Quiero cuidarlo con paciencia, amor y hechos. Vamos paso a paso, juntos. ❤️";
  makeHearts(38);
});

document.getElementById("talkButton").addEventListener("click", () => {
  document.getElementById("answerMessage").textContent =
    "Quiero escucharte, entender cómo te sientes y hablarlo con calma. No tienes que decidir nada por presión; lo importante es que los dos estemos bien. ❤️";
  makeHearts(22);
});
