function loginUser(event) {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Login de colaborador padrão
  if (email === "admin@empresa.com" && senha === "1234") {
    alert("✅ Login bem-sucedido!");
    window.location.href = "../perfil/perfil.html";
  
  // Login de administrador
  } else if (email === "adm@empresa.com" && senha === "1234") {
    alert("✅ Login de administrador bem-sucedido!");
    window.location.href = "../Adm/adm.html";
  
  // Verifica no localStorage para contas de colaborador criadas no painel de admin
  } else {
    const colaboradores = JSON.parse(localStorage.getItem("colaboradores")) || [];
    const colaboradorEncontrado = colaboradores.find(c => c.email === email && c.senha === senha);

    if (colaboradorEncontrado) {
      alert(`✅ Bem-vindo(a) ${colaboradorEncontrado.nome}!`);
      window.location.href = "../perfil/perfil.html"; // ou outra página específica para colaborador
    } else {
      alert("❌ Email ou senha incorretos!");
    }
  }
}
