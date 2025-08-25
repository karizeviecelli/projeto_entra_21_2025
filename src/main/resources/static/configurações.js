document.addEventListener("DOMContentLoaded", function() {
  // Alternar Tabs
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // Dark Mode
  const darkToggle = document.getElementById("darkMode");
  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkToggle.checked);
  });

  // Alterar Senha
  const btnAlterarSenha = document.getElementById("alterarSenhaBtn");
  btnAlterarSenha.addEventListener("click", () => {
    const novaSenha = prompt("Digite sua nova senha:");
    if(novaSenha) alert("Senha alterada com sucesso!");
    else alert("Alteração cancelada.");
  });

  // 2 Fatores
  const doisFatores = document.getElementById("twoFactor");
  doisFatores.addEventListener("change", () => {
    if(doisFatores.checked) alert("Autenticação em 2 fatores ativada!");
    else alert("Autenticação em 2 fatores desativada!");
  });

  // Idioma
  const idiomaSelect = document.getElementById("idiomaSelect");
  idiomaSelect.addEventListener("change", () => {
    alert(`Idioma alterado para: ${idiomaSelect.options[idiomaSelect.selectedIndex].text}`);
  });
});
  lucide.createIcons();