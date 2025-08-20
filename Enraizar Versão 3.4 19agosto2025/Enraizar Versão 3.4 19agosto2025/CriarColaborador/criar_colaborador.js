document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formColaborador').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeColaborador').value.trim();
    const email = document.getElementById('emailColaborador').value.trim();
    const setorValue = document.getElementById('setorColaborador').value.trim();
    const senha = document.getElementById('senhaColaborador').value;

    try {
      let setorId = parseInt(setorValue);
      if (Number.isNaN(setorId)) {
        // tenta resolver por nome
        const setResp = await fetch('http://localhost:8080/api/setores');
        const setores = await setResp.json();
        const match = setores.find(s => (s.nomeSetor || '').toLowerCase() === setorValue.toLowerCase());
        if (!match) { alert('Setor não encontrado. Use o ID ou um nome válido.'); return; }
        setorId = match.id;
      }

      const resp = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeCompleto: nome,
          email: email,
          senha: senha,
          tipoUsuario: 'COLABORADOR',
          setorId: setorId
        })
      });

      if (!resp.ok) throw new Error(await resp.text());
      alert(`Colaborador criado: ${nome}`);
      window.location.href = '../Adm/adm.html';
    } catch (err) {
      console.error(err);
      alert('Falha ao criar colaborador: ' + err.message);
    }
  });
});
