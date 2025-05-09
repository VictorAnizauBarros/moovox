window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const cowSound = document.getElementById("cow-sound");

  if (!loading) return;

  // Impede rolagem enquanto carrega
  document.body.classList.add("loading-active");

  const hasLoggedIn = sessionStorage.getItem("hasLoggedIn");
  const delay = hasLoggedIn ? 300 : 3000;

  if (!hasLoggedIn && cowSound) {
    cowSound.play().catch(err => {
      console.warn("Autoplay bloqueado:", err);
    });
  }

  sessionStorage.setItem("hasLoggedIn", "true");

  // Espera o tempo necessário, depois esconde o loader com fade-out
  setTimeout(() => {
    loading.classList.add("fade-out");

    // Aguarda o fade terminar
    setTimeout(() => {
      loading.style.display = "none";
      document.body.classList.remove("loading-active");
    }, 500); // Bate com a duração da animação no CSS
  }, delay);
});


  
  document.addEventListener("DOMContentLoaded", () => {
    // Centraliza o mapa em uma coordenada fictícia
    const map = L.map("animal-map").setView([-22.90, -47.06], 13); // Exemplo: Campinas-SP

    // Adiciona o mapa base do OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Ícone personalizado com pulso
    const pulseIcon = L.divIcon({
      className: 'pulse-marker'
    });

    // Adiciona marcador com ícone pulsante
    L.marker([-22.90, -47.06], { icon: pulseIcon }).addTo(map);
  });

 
  function checkRequiredDoses(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const doses = parseInt(selectedOption.getAttribute('data-required_doses') || "1");

    const modal = selectElement.closest('.modal');
    const nextAppContainer = modal.querySelector('.nextApplicationContainer');

    if (doses > 1) {
      nextAppContainer.style.display = 'block';
    } else {
      nextAppContainer.style.display = 'none';
    }
  }
  // Garante o comportamento correto ao abrir o modal
document.addEventListener("DOMContentLoaded", function() {
  // Only call checkRequiredDoses if a select element exists
  const selectElement = document.querySelector('select');
  if (selectElement) {
    checkRequiredDoses(selectElement);
  }
});