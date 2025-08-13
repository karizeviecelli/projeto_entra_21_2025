package service.hub.service_hub.repository;

import service.hub.service_hub.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
// Aqui tu pode colocar métodos customizados, tipo buscar por email
// Exemplo: Optional<Usuario> findByEmail(String email);
}