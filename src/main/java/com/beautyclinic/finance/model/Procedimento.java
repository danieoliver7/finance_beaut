package com.beautyclinic.finance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "procedimentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Procedimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 100)
    @NotBlank(message = "O nome do procedimento é obrigatório")
    @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres")
    private String nome;

    @Column(name = "descricao", length = 500)
    private String descricao;

    @Column(name = "valor", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "O valor do procedimento é obrigatório")
    @Min(value = 0, message = "O valor não pode ser negativo")
    private BigDecimal valor;

    @Column(name = "duracao_minutos", nullable = false)
    @NotNull(message = "A duração do procedimento é obrigatória")
    @Min(value = 5, message = "A duração mínima é de 5 minutos")
    private Integer duracaoMinutos;

    @Column(name = "categoria", nullable = false, length = 50)
    @NotBlank(message = "A categoria do procedimento é obrigatória")
    private String categoria;

    @Column(name = "percentual_comissao", precision = 5, scale = 2)
    private BigDecimal percentualComissao;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo = true;

    @OneToMany(mappedBy = "procedimento")
    private List<Agendamento> agendamentos = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    // Método utilitário para calcular a duração como objeto Duration
    @Transient
    public Duration getDuracao() {
        return Duration.ofMinutes(duracaoMinutos);
    }
} 