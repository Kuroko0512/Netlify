document.querySelector("#login").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  // Hacemos una solicitud POST a la función de Netlify
  const response = await fetch("/netlify/functions/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  if (result.status === "success") {
    // Si el login es exitoso, ocultamos el formulario y mostramos el contenido
    document.getElementById("login-form").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  } else {
    // Si el login falla, mostramos un mensaje de error
    alert(result.message);
  }
});
