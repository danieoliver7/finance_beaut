package com.beautyclinic.finance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "financeiro")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Financeiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    @NotNull(message = "O tipo da transação é obrigatório")
    private TipoTransacao tipo;

    @Column(name = "valor", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "O valor é obrigatório")
    private BigDecimal valor;

    @Column(name = "data_transacao", nullable = false)
    @NotNull(message = "A data da transação é obrigatória")
    @PastOrPresent(message = "A data da transação não pode ser futura")
    private LocalDate dataTransacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false)
    @NotNull(message = "A categoria é obrigatória")
    private CategoriaTransacao categoria;

    @Column(name = "descricao", length = 500)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "forma_pagamento", nullable = false)
    @NotNull(message = "A forma de pagamento é obrigatória")
    private FormaPagamento formaPagamento;

    @ManyToOne
    @JoinColumn(name = "agendamento_id")
    private Agendamento agendamento;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    @Column(name = "comprovante_url")
    private String comprovanteUrl;

    @Column(name = "pago", nullable = false)
    private Boolean pago = false;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    public enum TipoTransacao {
        RECEITA,
        DESPESA
    }

    public enum CategoriaTransacao {
        // Categorias de Receita
        PROCEDIMENTO,
        VENDA_PRODUTO,
        OUTRA_RECEITA,
        
        // Categorias de Despesa
        SALARIO,
        COMISSAO,
        ALUGUEL,
        ENERGIA,
        AGUA,
        TELEFONE,
        INTERNET,
        MATERIAL_CONSUMO,
        MANUTENCAO,
        MARKETING,
        IMPOSTOS,
        OUTRA_DESPESA
    }

    public enum FormaPagamento {
        DINHEIRO,
        CARTAO_CREDITO,
        CARTAO_DEBITO,
        PIX,
        TRANSFERENCIA,
        BOLETO,
        CHEQUE
    }
} 