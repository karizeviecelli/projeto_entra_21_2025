package service.hub.service_hub.model;

import jakarta.persistence.*;

@Entity
@Table(name = "servico")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idServico;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Long idCategoria;

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
    public Servico(Usuario usuario, Long idCategoria, String titulo, String descricao, Double preco, String cidade) {
        this.usuario = usuario;
        this.idCategoria = idCategoria;
        this.titulo = titulo;
        this.descricao = descricao;
        this.preco = preco;
        this.cidade = cidade;
    }

    // Getters e Setters
    public Long getIdServico() {
        return idServico;
    }

    public void setIdServico(Long idServico) {
        this.idServico = idServico;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
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
