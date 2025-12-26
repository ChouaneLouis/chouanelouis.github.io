const menuToggle = document.getElementById("menu-toggle");
const sideMenu = document.getElementById("side-menu");
const overlay = document.getElementById("overlay");

// Ouvrir / fermer avec ≡
menuToggle.addEventListener("click", () => {console.log("Bouton menu cliqué");
  sideMenu.classList.toggle("open");
  overlay.classList.toggle("show");
});

// Fermer en cliquant sur l’overlay
overlay.addEventListener("click", closeMenu);

// Fermer après clic sur un bouton du menu
document.querySelectorAll("#side-menu button").forEach(btn => {
  btn.addEventListener("click", closeMenu);
});

function closeMenu() {
  sideMenu.classList.remove("open");
  overlay.classList.remove("show");
}
