package service.hub.service_hub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.hub.service_hub.model.Servico;
import service.hub.service_hub.repository.ServicoRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servicos")
@CrossOrigin
public class ServicoController {

    @Autowired
    private ServicoRepository servicoRepository;

    // Listar todos os serviços
    @GetMapping
    public List<Servico> listarServicos() {
        return servicoRepository.findAll();
    }

    // Buscar serviço por ID
    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarPorId(@PathVariable Long id) {
        Optional<Servico> servico = servicoRepository.findById(id);
        return servico.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Criar novo serviço
    @PostMapping
    public Servico criarServico(@RequestBody Servico servico) {
        System.out.println("oi");
        return servicoRepository.save(servico);
    }

    // Atualizar serviço
    @PutMapping("/{id}")
    public ResponseEntity<Servico> atualizarServico(@PathVariable Long id, @RequestBody Servico servicoAtualizado) {
        return servicoRepository.findById(id).map(servico -> {
            servico.setUsuario_id(servicoAtualizado.getUsuario_id());
            servico.setCategoria_id(servicoAtualizado.getCategoria_id());
            servico.setTitulo(servicoAtualizado.getTitulo());
            servico.setDescricao(servicoAtualizado.getDescricao());
            servico.setPreco(servicoAtualizado.getPreco());
            servico.setCidade(servicoAtualizado.getCidade());
            Servico atualizado = servicoRepository.save(servico);
            return ResponseEntity.ok(atualizado);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Deletar serviço
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarServico(@PathVariable Long id) {
        if (servicoRepository.existsById(id)) {
            servicoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
