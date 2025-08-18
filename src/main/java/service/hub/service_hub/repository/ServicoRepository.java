package service.hub.service_hub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import service.hub.service_hub.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {
}
