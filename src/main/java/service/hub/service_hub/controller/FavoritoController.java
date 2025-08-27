package service.hub.service_hub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.hub.service_hub.model.Servico;
import service.hub.service_hub.model.Usuario;
import service.hub.service_hub.repository.ServicoRepository;
import service.hub.service_hub.repository.UsuarioRepository;

import java.util.Set;

@RestController
@RequestMapping("/favoritos")
public class FavoritoController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    // Adicionar um serviço aos favoritos de um usuário
    @PostMapping("/{usuarioId}/adicionar/{servicoId}")
    public ResponseEntity<String> adicionarFavorito(
            @PathVariable Long usuarioId,
            @PathVariable Long servicoId) {

        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        Servico servico = servicoRepository.findById(servicoId).orElse(null);

        if (usuario == null || servico == null) {
            return ResponseEntity.badRequest().body("Usuário ou serviço não encontrado.");
        }

        usuario.getFavoritos().add(servico);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Serviço adicionado aos favoritos!");
    }

    // Remover um serviço dos favoritos de um usuário
    @DeleteMapping("/{usuarioId}/remover/{servicoId}")
    public ResponseEntity<String> removerFavorito(
            @PathVariable Long usuarioId,
            @PathVariable Long servicoId) {

        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        Servico servico = servicoRepository.findById(servicoId).orElse(null);

        if (usuario == null || servico == null) {
            return ResponseEntity.badRequest().body("Usuário ou serviço não encontrado.");
        }

        usuario.getFavoritos().remove(servico);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Serviço removido dos favoritos!");
    }

    // Listar todos os favoritos de um usuário
    @GetMapping("/{usuarioId}")
    public ResponseEntity<Set<Servico>> listarFavoritos(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);

        if (usuario == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(usuario.getFavoritos());
    }
}
