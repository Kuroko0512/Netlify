document.addEventListener('DOMContentLoaded', () => {
  const correctDate = new Date(2025, 0, 1); // 1 de enero de 2025 (Enero es 0 en JS)
  const audio = document.getElementById('background-music');

  // Reproducir música al primer clic del usuario
  document.body.addEventListener('click', () => {
    if (audio && audio.paused) {
      audio.play().catch(error => console.log("Autoplay bloqueado:", error));
    }
  }, { once: true });

  // Si ya inició sesión antes, redirigir automáticamente
  if (localStorage.getItem('loggedIn') === 'true' && window.location.pathname.includes("index.html")) {
    window.location.href = "main.html";
  }

  const enterButton = document.getElementById('enter');
  if (enterButton) {
    enterButton.addEventListener('click', () => {
      const inputDate = document.getElementById('name').value.trim();
      
      // Convertir la entrada a formato de fecha válido
      const parsedDate = new Date(inputDate);

      // Comparar solo la fecha sin la hora
      if (parsedDate.toDateString() === correctDate.toDateString()) {
        localStorage.setItem('loggedIn', 'true'); // Guarda sesión
        window.location.href = "main.html"; // Redirige
      } else {
        alert('Fecha incorrecta. Intenta de nuevo.');
      }
    });
  }

  // Lógica de los botones "Sí" y "No" en main.html
  const buttonNo = document.querySelector('#no');
  const buttonYes = document.querySelector('#yes');

  if (buttonNo && buttonYes) {
    let fontSize = 2;
    let messages = [
      '¿Estás segurx?',
      'Piénsalo bien',
      'Piénsalo muy bien',
      'Piénsalo',
      'Mira el otro botón'
    ];

    buttonNo.addEventListener('click', () => {
      fontSize += 0.5;
      buttonYes.style.fontSize = `${fontSize}rem`;

      const indexRandom = Math.floor(Math.random() * messages.length);
      buttonNo.textContent = messages[indexRandom];
    });

    buttonYes.addEventListener('click', () => {
      document.querySelector('#message').style.display = 'flex';
    });
  }
});
