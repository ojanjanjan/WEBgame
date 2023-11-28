// Deklarasi Variabel:
const awan = document.querySelectorAll('.awan');   // NodeList dari elemen awan
const gagak = document.querySelectorAll('.gagak');  // NodeList dari elemen gagak (burung)
const papanSkor = document.querySelector('.papan-skor');  // Elemen papan skor
const pop = document.querySelector('#pop');  // Elemen suara

// Variabel Global:
let awanSebelumnya;  // Untuk melacak awan yang terakhir dipilih
let selesai;         // Flag untuk menandakan apakah permainan sudah selesai
let skor;            // Skor pemain

// Fungsi Pembantu - randomAwan:
function randomAwan(awan) {
  const t = Math.floor(Math.random() * awan.length);
  const tRandom = awan[t];
  // Memastikan awan yang dipilih secara acak berbeda dari sebelumnya
  if (tRandom === awanSebelumnya) {
    return randomAwan(awan);
  }
  awanSebelumnya = tRandom;
  return tRandom;
}

// Fungsi Pembantu - randomWaktu:
function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Fungsi - munculkanGagak:
function munculkanGagak() {
  const tRandom = randomAwan(awan);
  const wRandom = randomWaktu(300, 1000);
  tRandom.classList.add('muncul');

  // Sembunyikan burung setelah durasi acak
  setTimeout(() => {
    tRandom.classList.remove('muncul');
    // Jika permainan belum selesai, lanjutkan menampilkan burung
    if (!selesai) {
      munculkanGagak();
    }
  }, wRandom);
}

// Fungsi - mulai:
function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanGagak();
  // Atur waktu tunggu untuk durasi permainan (10 detik)
  setTimeout(() => {
    selesai = true;
  }, 10000);
}

// Fungsi - pukul:
function pukul() {
  skor++;
  this.classList.remove('muncul');  // Sembunyikan burung yang diklik
  pop.play();  // Putar suara
  papanSkor.textContent = skor;  // Perbarui skor yang ditampilkan
}

// Tambahkan event listener klik pada setiap elemen burung
gagak.forEach(t => {
  t.addEventListener('click', pukul);
});

// Tambahkan event listener klik pada elemen 'mulaiButton'
document.getElementById('mulaiButton').addEventListener('click', function () {
  mulai();
});
