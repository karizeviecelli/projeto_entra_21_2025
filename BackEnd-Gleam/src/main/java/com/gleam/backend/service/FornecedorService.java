package com.gleam.backend.service;

import com.gleam.backend.dto.FornecedorDTO;
import com.gleam.backend.model.Fornecedor;
import com.gleam.backend.repository.FornecedorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FornecedorService {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    /**
     * Cria e salva um novo fornecedor no banco de dados.
     * @param dto Os dados do novo fornecedor.
     * @return A entidade Fornecedor salva.
     */
    public Fornecedor save(FornecedorDTO dto) {
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setNome(dto.getNome());
        fornecedor.setCnpj(dto.getCnpj());
        fornecedor.setTelefone(dto.getTelefone());
        fornecedor.setDescricao(dto.getDescricao());
        fornecedor.setCodigoAnel(dto.getCodigoAnel());
        fornecedor.setCodigoBracelete(dto.getCodigoBracelete());
        fornecedor.setCodigoColar(dto.getCodigoColar());
        fornecedor.setCodigoBrinco(dto.getCodigoBrinco());
        fornecedor.setCodigoPulseira(dto.getCodigoPulseira());
        fornecedor.setCodigoPingente(dto.getCodigoPingente());
        fornecedor.setCodigoConjunto(dto.getCodigoConjunto());
        fornecedor.setCodigoBerloque(dto.getCodigoBerloque());
        fornecedor.setCodigoPiercing(dto.getCodigoPiercing());

        return fornecedorRepository.save(fornecedor);
    }

    /**
     * Atualiza um fornecedor existente com base no seu ID.
     * @param id O ID do fornecedor a ser atualizado.
     * @param dto Os novos dados para o fornecedor.
     * @return A entidade Fornecedor atualizada.
     */
    public Fornecedor update(Long id, FornecedorDTO dto) {
        // Busca o fornecedor no banco. Se não encontrar, lança uma exceção.
        Fornecedor fornecedorExistente = fornecedorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fornecedor não encontrado com o ID: " + id));

        // Atualiza todos os campos
        fornecedorExistente.setNome(dto.getNome());
        fornecedorExistente.setCnpj(dto.getCnpj());
        fornecedorExistente.setTelefone(dto.getTelefone());
        fornecedorExistente.setDescricao(dto.getDescricao());
        fornecedorExistente.setCodigoAnel(dto.getCodigoAnel());
        fornecedorExistente.setCodigoBracelete(dto.getCodigoBracelete());
        fornecedorExistente.setCodigoColar(dto.getCodigoColar());
        fornecedorExistente.setCodigoBrinco(dto.getCodigoBrinco());
        fornecedorExistente.setCodigoPulseira(dto.getCodigoPulseira());
        fornecedorExistente.setCodigoPingente(dto.getCodigoPingente());
        fornecedorExistente.setCodigoConjunto(dto.getCodigoConjunto());
        fornecedorExistente.setCodigoBerloque(dto.getCodigoBerloque());
        fornecedorExistente.setCodigoPiercing(dto.getCodigoPiercing());

        return fornecedorRepository.save(fornecedorExistente);
    }

    /**
     * Apaga um fornecedor do banco de dados pelo seu ID.
     * @param id O ID do fornecedor a ser apagado.
     */
    public void delete(Long id) {
        if (!fornecedorRepository.existsById(id)) {
            throw new EntityNotFoundException("Fornecedor não encontrado com o ID: " + id);
        }
        fornecedorRepository.deleteById(id);
    }
}
