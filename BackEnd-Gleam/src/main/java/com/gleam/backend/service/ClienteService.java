package com.gleam.backend.service;

import com.gleam.backend.dto.ClienteDTO;
import com.gleam.backend.model.Cliente;
import com.gleam.backend.repository.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    /**
     * Cria e salva um novo cliente no banco de dados.
     *
     * @param dto Os dados do novo cliente.
     * @return A entidade Cliente salva.
     */

    public Cliente save(ClienteDTO dto) {
        if (dto.getNome() == null || dto.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do cliente é obrigatório.");
        }
        Cliente cliente = new Cliente();
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        cliente.setTelefone(dto.getTelefone());
        cliente.setCpf(dto.getCpf());
        cliente.setDescricao(dto.getDescricao());
        return clienteRepository.save(cliente);
    }

    /**
     * Atualiza um cliente existente com base no seu ID.
     *
     * @param id  O ID do cliente a ser atualizado.
     * @param dto Os novos dados para o cliente.
     * @return A entidade Cliente atualizada.
     */
    public Cliente update(Long id, ClienteDTO dto) {
        // Busca o cliente no banco de dados. Se não encontrar, lança uma exceção.
        Cliente clienteExistente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com o ID: " + id));

        // Atualiza os campos do cliente existente com os dados do DTO
        clienteExistente.setNome(dto.getNome());
        clienteExistente.setEmail(dto.getEmail());
        clienteExistente.setTelefone(dto.getTelefone());
        clienteExistente.setCpf(dto.getCpf());
        clienteExistente.setDescricao(dto.getDescricao());

        // Salva e retorna o cliente atualizado
        return clienteRepository.save(clienteExistente);
    }

    /**
     * Apaga um cliente do banco de dados pelo seu ID.
     *
     * @param id O ID do cliente a ser apagado.
     */
    public void delete(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new EntityNotFoundException("Cliente não encontrado com o ID: " + id);
        }
        clienteRepository.deleteById(id);
    }

    /**
     * Retorna uma lista de todos os clientes.
     *
     * @return Uma lista de entidades Cliente.
     */
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    /**
     * Busca um único cliente pelo seu ID.
     *
     * @param id O ID do cliente a ser encontrado.
     * @return A entidade Cliente encontrada.
     */
    public Cliente findById(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com o ID: " + id));
    }
}
