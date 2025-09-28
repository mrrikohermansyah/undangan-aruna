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

 // -------------------------
  // Ganti dengan Form ID Google Form kamu
  // Ganti YOUR_FORM_ID dengan ID form kamu
  const FORM_URL = "https://docs.google.com/forms/d/1t_fzWzI6Vr4JVn_IDOJIwpEDv4XrJTqviYJLV7F9Izw/formResponse";

  // Ganti dengan entry ID dari pre-filled link
  const ENTRY_NAMA = "entry.355986079";   
  const ENTRY_STATUS = "entry.3451422"; 

  // Web App untuk ambil daftar RSVP
  const API_URL = "https://script.google.com/macros/s/AKfycbyMydZ4H2uHSwy2Bugj7IdwiHRQXfzp-5yANxcd8dfcZcu5iaj0yNmt6JTZPmdWeRCZWg/exec";

  // -------------------------

  const form = document.getElementById("rsvpForm");
  const listRsvp = document.getElementById("listRsvp");
  let rsvpData = [];

  // Submit RSVP ke Google Form
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const status = document.getElementById("status").value;

    // Cek duplikasi
    if (rsvpData.some(item => item.nama.toLowerCase() === nama.toLowerCase())) {
      alert("Nama ini sudah RSVP sebelumnya!");
      return;
    }

    const formData = new FormData();
    formData.append(ENTRY_NAMA, nama);
    formData.append(ENTRY_STATUS, status);

    fetch(FORM_URL, { method: "POST", body: formData, mode: "no-cors" })
      .then(() => {
        alert("RSVP berhasil dikirim! 🎉");
        form.reset();
        fetchRSVP(); // refresh daftar
      })
      .catch(err => console.error(err));
  });

  // Callback JSONP dari Apps Script
  function loadRSVP(data) {
    rsvpData = data;
    listRsvp.innerHTML = "";
    data.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nama} - ${item.status}`;
      listRsvp.appendChild(li);
    });
  }

  // Ambil daftar RSVP via JSONP
  function fetchRSVP() {
    const script = document.createElement("script");
    script.src = `${API_URL}?callback=loadRSVP&_=${Date.now()}`;
    document.body.appendChild(script);
    script.onload = () => document.body.removeChild(script);
  }

  // Load pertama kali
  fetchRSVP();
  // Refresh otomatis tiap 10 detik
  setInterval(fetchRSVP, 10000);


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
