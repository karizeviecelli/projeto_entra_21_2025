async function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value; // no momento não validamos hash aqui

  try {
    // Busca usuários no backend
    const resp = await fetch("http://localhost:8080/api/usuarios");
    if (!resp.ok) throw new Error("Falha ao consultar usuários");
    const usuarios = await resp.json();

    const user = usuarios.find(u => (u.email || '').toLowerCase() === email.toLowerCase());
    if (!user) {
      alert("Usuário não encontrado.");
      return;
    }

    // Guarda identificação simples no navegador (apenas id e tipo)
    localStorage.clear();
    localStorage.setItem("currentUserId", String(user.id));
    localStorage.setItem("currentUserTipo", user.tipoUsuario || "NORMAL");
    localStorage.setItem("currentUserNome", user.nomeCompleto || "");

    if ((user.tipoUsuario || '').toUpperCase() === "ADMIN") {
      window.location.href = "../Adm/adm.html";
    } else {
      window.location.href = "../Perfil/perfil.html";
    }
  } catch (e) {
    console.error(e);
    alert("Erro de login. Verifique se o backend está rodando em http://localhost:8080");
  }
}
