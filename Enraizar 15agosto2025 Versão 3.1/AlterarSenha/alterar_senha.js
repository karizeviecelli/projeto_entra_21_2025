// Handler do formulário de alteração de senha (mock para testes)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formAlterarSenha');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const atual = document.getElementById('senhaAtual').value;
    const nova = document.getElementById('novaSenha').value;
    const confirmar = document.getElementById('confirmarSenha').value;

    // Validação simples (exemplo)
    if (nova !== confirmar) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }

    // Aqui futuramente você chama a API para alterar a senha
    alert("Senha alterada com sucesso! (Teste - implementar backend depois)");
    window.location.href = 'adm.html';
  });
});
