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



   const API_URL = "https://script.google.com/macros/s/AKfycbzd6So0tCOAmwWl7h1Y6ZgvhpuzDVv05Jx3Ues8CRZlDUuWa6YPB7Pp0A-J1zV-QtSA/exec";
    const form = document.getElementById("rsvpForm");
    const listRsvp = document.getElementById("listRsvp");

    function loadRSVP() {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          listRsvp.innerHTML = ""; // kosongin dulu
          data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.nama} - ${item.status}`;
            listRsvp.appendChild(li);
          });
        })
        .catch(err => console.error("Error:", err));
    }

    form.addEventListener("submit", e => {
      e.preventDefault();

      const nama = document.getElementById("nama").value;
      const status = document.getElementById("status").value;

      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ nama, status }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(data => {
          if (data.result === "success") {
            loadRSVP();   // refresh daftar
            form.reset(); // kosongin form
          } else {
            alert("Gagal menyimpan data, coba lagi ya 🙏");
          }
        })
        .catch(err => console.error("Error:", err));
    });

    // load daftar saat pertama kali buka halaman
    loadRSVP();


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
