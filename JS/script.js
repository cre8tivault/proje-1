const searchForm = document.querySelector(".search-form");
const cartItem = document.querySelector(".cart-items-container");
const menubar = document.querySelector(".menubar");


//!Aktif olan butonlar start

// Mobilde butonları yönetmek için
document.addEventListener('DOMContentLoaded', function() {
    const buttonsContainer = document.querySelector('.header .buttons');
    const menuBtn = document.getElementById('menu-btn');
    const searchBtn = document.getElementById('search-btn');
    const cartBtn = document.getElementById('cart-btn');
    const searchForm = document.querySelector('.search-form');
    const cartItem = document.querySelector('.cart-items-container');
    const menubar = document.querySelector('.menubar');

    // Mobil kontrolü
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Butonları göster/gizle
    function toggleButtons() {
        if (isMobile()) {
            buttonsContainer.classList.toggle('menu-active');
        }
    }

    // Menü butonuna tıklama
    if(menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleButtons();
            menubar.classList.toggle('active');
        });
    }

    // Dökümana tıklandığında butonları gizle
    document.addEventListener('click', function() {
        if (isMobile() && buttonsContainer.classList.contains('menu-active')) {
            buttonsContainer.classList.remove('menu-active');
        }
    });

    // Arama butonuna tıklama
    if(searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isMobile()) buttonsContainer.classList.remove('menu-active');
            searchForm.classList.toggle('active');
        });
    }

    // Sepet butonuna tıklama
    if(cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isMobile()) buttonsContainer.classList.remove('menu-active');
            cartItem.classList.toggle('active');
        });
    }

    // Mobilde menüyü kapatmak için
    if(menubar) {
        menubar.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

//!Aktif olan butonlar stop

// Document click handler to close both elements
document.addEventListener("click", function(e) {
    if (!searchForm.contains(e.target) && e.target !== searchBtn) {
        searchForm.classList.remove("active");
    }
    if (!cartItem.contains(e.target) && e.target !== cartBtn) {
        cartItem.classList.remove("active");
    }
    if (!menubar.contains(e.target) && e.target !== menuBtn) {
        menubar.classList.remove("active");
    }
});

// Prevent clicks inside forms from closing them
searchForm.addEventListener("click", function(e) {
    e.stopPropagation();
});

cartItem.addEventListener("click", function(e) {
    e.stopPropagation();
});

menubar.addEventListener("click", function(e) {
    e.stopPropagation();
});

// Formu whatsapp a göndermek

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Form verilerini al
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  
  // WhatsApp mesajını oluştur
  const whatsappMessage = 
    `Yeni Mesaj!\n\n` +
    `Ad: ${name}\n` +
    `Email: ${email}\n` +
    `Telefon: ${phone}\n` +
    `Mesaj: ${message}`;
  
  // URL encode işlemi
  const encodedMessage = encodeURIComponent(whatsappMessage);
  
  // WhatsApp bağlantısını oluştur ve yönlendir
  const whatsappUrl = `https://wa.me/905353016020?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
});

function autoResize(textarea) {
  textarea.style.height = 'auto'; /* Önce sıfırla */
  textarea.style.height = (textarea.scrollHeight) + 'px';
  
  /* Maksimum yükseklik kontrolü */
  if (textarea.scrollHeight > 150) {
    textarea.style.overflowY = 'scroll';
  } else {
    textarea.style.overflowY = 'hidden';
  }
}


// Tüm WhatsApp butonlarını seç
document.querySelectorAll('.whatsapp-btn').forEach(button => {
  button.addEventListener('click', function() {
    // Ürün bilgilerini al
    const product = this.getAttribute('data-product');
    const price = this.getAttribute('data-price');
    const img = this.getAttribute('data-img');
    
    // WhatsApp mesajını oluştur
    const message = `Merhaba, aşağıdaki ürünü sipariş vermek istiyorum:\n\n` +
                   `*Ürün Adı:* ${product}\n` +
                   `*Fiyat:* ${price}\n` +
                   `*Resim:* ${window.location.origin}/${img}\n\n` +
                   `Bilgi verebilir misiniz?`;
    
    // URL encode işlemi
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp bağlantısını aç
    window.open(`https://wa.me/905353016020?text=${encodedMessage}`, '_blank');
  });
});



function sendCartToWhatsApp() {
  let message = "Merhaba, sepetimdeki ürünler:\n\n";
  let total = 0;
  
  // Sepetteki ürünleri döngüye al
  document.querySelectorAll('.cart-item').forEach(item => {
    const name = item.querySelector('h3').innerText;
    const price = item.querySelector('.price').innerText;
    
    message += `✔ ${name} - ${price}\n`;
    total += parseFloat(price.replace('TL', '').trim());
  });
  
  message += `\n*Toplam Tutar:* ${total.toFixed(2)} TL\n\n` +
             "Bu ürünleri sipariş vermek istiyorum.";
  
  window.open(`https://wa.me/905353016020?text=${encodeURIComponent(message)}`, '_blank');
}


function sendProductDetails() {
  const productName = document.querySelector('.product-title').innerText;
  const price = document.querySelector('.product-price').innerText;
  const description = document.querySelector('.product-desc').innerText;
  
  const message = `*${productName}*\n\n` +
                 `Fiyat: ${price}\n\n` +
                 `Açıklama: ${description}\n\n` +
                 `Bu ürün hakkında bilgi almak istiyorum.`;
  
  window.open(`https://wa.me/905353016020?text=${encodeURIComponent(message)}`, '_blank');
}


// Tüm WhatsApp butonlarını seç
document.querySelectorAll('.whatsapp-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Data attribute'lardan bilgileri al
    const product = this.getAttribute('data-product');
    const price = this.getAttribute('data-price');
    const category = this.getAttribute('data-category');
    const img = this.getAttribute('data-img');
    
    // Varsa ekstra bilgileri DOM'dan al
    const box = this.closest('.box');
    const oldPrice = box.querySelector('.price span')?.textContent || '';
    
    // Mesajı oluştur
    const message = `Merhaba, HobiGari'den sipariş vermek istiyorum:\n\n` +
                   `*Ürün Kategorisi:* ${category}\n` +
                   `*Ürün Adı:* ${product}\n` +
                   `*Fiyat:* ${price} ${oldPrice ? `(İndirimli, Eski Fiyat: ${oldPrice})` : ''}\n` +
                   `*Resim:* ${window.location.origin}/${img}\n\n` +
                   `Bu ürünle ilgileniyorum.`;
    
    // WhatsApp bağlantısını aç
    const phone = "905353016020"; // WhatsApp işletme numaranız
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  });
});


// Logo için tıklama efekti
document.querySelector('.logo').addEventListener('click', function(e) {
    e.preventDefault();
    const logo = this.querySelector('img');
    
    // Animasyon efekti
    logo.style.transform = 'scale(0.25)';
    setTimeout(() => {
        logo.style.transform = 'scale(1)';
    }, 200);
    
    // İsteğe bağlı: Tıklamada başka bir işlem yapılacaksa
    // window.location.href = this.href;
});

// Sepetteki ürünleri silme fonksiyonu
function setupCartItemRemoval() {
    document.querySelectorAll('.cart-items-container .fa-times').forEach(closeBtn => {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const cartItem = this.closest('.cart-item');
            cartItem.remove();
            
            // Sepet boşsa gösterilecek mesaj
            updateEmptyCartMessage();
        });
    });
}

// Sepet boşsa mesaj göster
function updateEmptyCartMessage() {
    const cartContainer = document.querySelector('.cart-items-container');
    const cartItems = cartContainer.querySelectorAll('.cart-item');
    const buyButtons = cartContainer.querySelectorAll('.btn');
    
    if (cartItems.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.textContent = 'Sepetiniz boş';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '2rem';
        emptyMessage.style.fontSize = '1.8rem';
        
        // Var olan mesajı kontrol et
        if (!cartContainer.querySelector('.empty-cart-message')) {
            cartContainer.insertBefore(emptyMessage, cartContainer.firstChild);
        }
        
        // Satın alma butonlarını gizle
        buyButtons.forEach(btn => btn.style.display = 'none');
    } else {
        // Mesajı kaldır
        const existingMessage = cartContainer.querySelector('.empty-cart-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Satın alma butonlarını göster
        buyButtons.forEach(btn => btn.style.display = 'block');
    }
}

// Sayfa yüklendiğinde ve sepete ürün eklendiğinde bu fonksiyonları çağır
document.addEventListener('DOMContentLoaded', function() {
    setupCartItemRemoval();
    updateEmptyCartMessage();
    
    // Sepet açıldığında da kontrol et
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            setTimeout(() => {
                setupCartItemRemoval();
                updateEmptyCartMessage();
            }, 100);
        });
    }
});

// --- Arama kutusu ve sonuçları ---
const searchInput = document.getElementById('search-box');
const searchResults = document.getElementById('search-results');
const searchCloseBtn = document.getElementById('search-close-btn');
const searchBtn = document.getElementById('search-btn');
const searchFormEl = document.getElementById('search-form');

// Ürünleri products.json'dan yükle
let allProducts = [];
let productsLoaded = false;
let pendingSearchQuery = null;
fetch('JS/products.json')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    productsLoaded = true;
    // Eğer ürünler yüklenmeden önce bir arama yapılmak istendiyse, şimdi göster
    if (pendingSearchQuery !== null) {
      showSearchResults(pendingSearchQuery);
      pendingSearchQuery = null;
    }
  });

// Arama fonksiyonu
function showSearchResults(query) {
  if (!productsLoaded) {
    searchResults.innerHTML = '<div class="no-results">Ürünler yükleniyor...</div>';
    searchResults.style.display = 'block';
    pendingSearchQuery = query;
    return;
  }
  if (!query) {
    searchResults.style.display = 'none';
    searchResults.innerHTML = '';
    return;
  }
  const results = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">Sonuç bulunamadı</div>';
  } else {
    // Tüm ürünler project.html'e yönlendirsin
    searchResults.innerHTML = results.map((product, idx) => `
      <a href="project.html" class="search-result-link" data-index="${idx}">
        <img src="${product.image}" alt="${product.name}" style="height:32px;width:32px;vertical-align:middle;margin-right:8px;">${product.name} <span style="float:right;color:#888;font-size:1.2rem;">${product.price}</span>
      </a>
    `).join('');
  }
  searchResults.style.display = 'block';
}

// Arama kutusuna yazıldıkça
if (searchInput) {
  searchInput.addEventListener('input', function() {
    showSearchResults(this.value);
  });
  // Sonuçlar dışında bir yere tıklanınca kapat
  document.addEventListener('click', function(e) {
    if (!searchResults.contains(e.target) && e.target !== searchInput && e.target !== searchBtn) {
      searchResults.style.display = 'none';
      if (searchFormEl) searchFormEl.classList.remove('active');
    }
  });
  // Sonuçlar tıklanınca kapanır, ancak ürünler yüklenmeden tıklanamaz
searchResults.addEventListener('mousedown', function(e) {
  if (!productsLoaded) {
    e.preventDefault();
    return;
  }
  const link = e.target.closest('a.search-result-link');
  if (link) {
    searchResults.style.display = 'none';
    if (searchFormEl) searchFormEl.classList.remove('active');
    window.location.href = 'project.html';
    e.preventDefault();
  }
});
}

// Arama butonuna tıklanınca input'a odaklan ve arama kutusunu aç
if (searchBtn && searchInput && searchFormEl) {
  searchBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    searchFormEl.classList.add('active');
    searchInput.focus();
    // Ürünler yüklenmediyse "yükleniyor" mesajı göster
    if (!productsLoaded) {
      showSearchResults(searchInput.value || '');
    } else {
      showSearchResults(searchInput.value);
    }
  });
}
// Arama kutusunu kapatma butonu
if (searchCloseBtn && searchFormEl) {
  searchCloseBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    searchFormEl.classList.remove('active');
    searchResults.style.display = 'none';
    searchInput.value = '';
  });
}



// Scroll animasyon fonksiyonu
function initScrollAnimations() {
    // Efekt uygulanacak elementler
    const animatableElements = document.querySelectorAll(
        '.urun .box, .videos .box, .about .row, .Review .box, .contact .row'
    );
    
    // Navbar scroll efekti
    const header = document.querySelector('.header');
    
    // Intersection Observer ayarları
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
            }
        });
    }, observerOptions);
    
    // Elementlere observer ekleme
    animatableElements.forEach(element => {
        // Rastgele efekt sınıfı ekle (isteğe bağlı)
        const effects = ['fade-in', 'slide-left', 'slide-right', 'zoom-in'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        element.classList.add(randomEffect);
        
        observer.observe(element);
    });
    
    // Navbar scroll efekti
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', initScrollAnimations);




window.addEventListener('scroll', function() {
    if (menubar.classList.contains('active')) {
        menubar.classList.remove('active');
        menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    }
});


document.querySelectorAll('.urun .box-container .box').forEach((box, index) => {
  box.style.setProperty('--box-order', index);
});

// Videolar için animasyon sırası
document.querySelectorAll('.videos .box-container .box').forEach((box, index) => {
  box.style.setProperty('--video-order', index);
});