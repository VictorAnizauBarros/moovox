window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const cowSound = document.getElementById("cow-sound");

  if (loading) {
    const hasLoggedIn = sessionStorage.getItem("hasLoggedIn");
    const delay = hasLoggedIn ? 300 : 3000;

    if (!hasLoggedIn && cowSound) {
      // Toca o som de vaca se for a primeira vez
      cowSound.play().catch(err => {
        // Caso o navegador bloqueie autoplay, exibe no console
        console.warn("Autoplay bloqueado:", err);
      });
    }

    sessionStorage.setItem("hasLoggedIn", "true");

    setTimeout(() => {
      loading.classList.add("fade-out");

      setTimeout(() => {
        loading.style.display = "none";
      }, 600);
    }, delay);
  }
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
    checkRequiredDoses();
  });

