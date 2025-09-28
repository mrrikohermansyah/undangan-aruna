// Hitung mundur ke acara
const eventDate = new Date("2025-10-11T13:00:00").getTime();
const timerEl = document.getElementById("timer");

setInterval(() => {
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff <= 0) {
    timerEl.innerText = "Acara sedang berlangsung 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000*60*60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000*60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timerEl.innerText = `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
}, 1000);

// RSVP sederhana
const form = document.getElementById("rsvpForm");
const listRsvp = document.getElementById("listRsvp");
const data = [];

form.addEventListener("submit", e => {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const status = document.getElementById("status").value;
  data.push({ nama, status });
  render();
  form.reset();
});

function render() {
  listRsvp.innerHTML = "";
  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nama} - ${item.status}`;
    listRsvp.appendChild(li);
  });
}

// Musik latar kontrol
const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("toggleMusic");

// Coba play otomatis (dengan mute dulu)
music.play().catch(() => {
  console.log("Autoplay diblokir, tunggu interaksi user...");
});

// Begitu user klik pertama kali di mana saja → unmute musik
document.body.addEventListener("click", function () {
  if (music.muted) {
    music.muted = false;
    music.play();
  }
}, { once: true });

// Kontrol tombol
toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "🔊";
  } else {
    music.pause();
    toggleBtn.textContent = "🎵";
  }
});
