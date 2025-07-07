document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn");
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.getElementById("search-box");
  const searchResults = document.getElementById("search-results");

  let products = [];

  // Ürünleri products.json'dan al
  fetch("JS/products.json")
    .then((res) => res.json())
    .then((data) => {
      products = data;
    });

  // Arama kutusunu aç/kapat
  searchBtn.addEventListener("click", () => {
    searchForm.classList.toggle("active");
    searchInput.focus();
  });

  // Arama yapıldıkça filtrele
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (query === "") {
      searchResults.style.display = "none";
      return;
    }

    const matched = products.filter((p) =>
      p.name.toLowerCase().includes(query)
    );

    if (matched.length === 0) {
      searchResults.innerHTML = `<div class="no-results">Sonuç bulunamadı</div>`;
    } else {
      matched.forEach((p) => {
        const item = document.createElement("a");
        item.href = p.url;
        item.innerHTML = `
          <img src="${p.image}" style="width:30px; vertical-align:middle; margin-right:10px;">
          <strong>${p.name}</strong> - ${p.price}
        `;
        searchResults.appendChild(item);
      });
    }

    searchResults.style.display = "block";
  });

  // Dışarı tıklanınca gizle
  document.addEventListener("click", (e) => {
    if (!searchForm.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = "none";
      searchForm.classList.remove("active");
    }
  });
});