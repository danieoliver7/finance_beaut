package com.beautyclinic.finance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "profissionais")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profissional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @Column(length = 20)
    private String identificacao;

    @Column
    private String telefone;

    @Column
    private String email;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    @NotBlank(message = "A especialidade é obrigatória")
    @Column(nullable = false)
    private String especialidade;

    @NotNull(message = "O percentual de comissão é obrigatório")
    @Column(name = "comissao_padrao")
    private BigDecimal comissaoPadrao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusProfissional status = StatusProfissional.ATIVO;

    @OneToMany
    @JoinColumn(name = "profissional_id")
    private List<Procedimento> procedimentos = new ArrayList<>();

    @OneToMany(mappedBy = "profissional")
    private List<Agendamento> agendamentos = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    @UpdateTimestamp
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @Embedded
    private Disponibilidade disponibilidade;

    public enum StatusProfissional {
        ATIVO,
        INATIVO,
        FERIAS,
        AFASTADO
    }
} 