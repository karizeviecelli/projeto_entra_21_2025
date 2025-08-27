package service.hub.service_hub.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "servico")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "favoritos")
    private Set<Usuario> usuariosFavoritaram = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario_id;

    @Column(name = "categoria_id")
    private Long categoria_id;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(length = 500)
    private String descricao;

    @Column(nullable = false)
    private Double preco;

    @Column(nullable = false, length = 100)
    private String cidade;

    // Construtor vazio (necessário para JPA)
    public Servico() {
    }

    // Construtor com todos os campos (exceto id gerado automaticamente)
    public Servico(Usuario usuario_id, Long categoria_id, String titulo, String descricao, Double preco, String cidade) {
        this.usuario_id = usuario_id;
        this.categoria_id = categoria_id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.preco = preco;
        this.cidade = cidade;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Usuario usuario_id) {
        this.usuario_id = usuario_id;
    }

    public Long getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(Long categoria_id) {
        this.categoria_id = categoria_id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }
}
