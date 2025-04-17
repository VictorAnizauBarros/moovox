window.addEventListener("load", () => {
    const loading = document.getElementById("loading-screen");
  
    if (loading) {
      const hasLoggedIn = sessionStorage.getItem("hasLoggedIn");
      const delay = hasLoggedIn ? 300 : 3000;
  
      sessionStorage.setItem("hasLoggedIn", "true");
  
      setTimeout(() => {
        loading.classList.add("fade-out");
  
        // Aguarda a transição terminar antes de esconder
        setTimeout(() => {
          loading.style.display = "none";
        }, 600); // mesmo valor do transition no CSS
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