// Like sayaçları (her video için ayrı sayaç, localStorage ile kalıcı)
const likeKey = 'videoLikes';
let likeCounts = [0, 0, 0];

// LocalStorage'dan oku
if (localStorage.getItem(likeKey)) {
  try {
    const stored = JSON.parse(localStorage.getItem(likeKey));
    if (Array.isArray(stored) && stored.length === likeCounts.length) {
      likeCounts = stored;
    }
  } catch {}
}

document.addEventListener('DOMContentLoaded', function() {
  // Sayfa açılışında mevcut sayıları göster
  document.querySelectorAll('.info .like').forEach(function(el, idx) {
    el.textContent = `like (${likeCounts[idx]})`;
  });

  // Her bir like butonunu bul
  document.querySelectorAll('.videos-btn-1 .fa-thumbs-up').forEach(function(btn, idx) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      likeCounts[idx]++;
      // Sayaç gösterimini güncelle
      const infoDiv = btn.closest('.box-bottom').querySelector('.info .like');
      infoDiv.textContent = `like (${likeCounts[idx]})`;
      // LocalStorage'a kaydet
      localStorage.setItem(likeKey, JSON.stringify(likeCounts));
    });
  });
});
