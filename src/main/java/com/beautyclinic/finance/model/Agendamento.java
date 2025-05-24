package com.beautyclinic.finance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @NotNull(message = "O cliente é obrigatório")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "procedimento_id", nullable = false)
    @NotNull(message = "O procedimento é obrigatório")
    private Procedimento procedimento;

    @ManyToOne
    @JoinColumn(name = "profissional_id", nullable = false)
    @NotNull(message = "O profissional é obrigatório")
    private Profissional profissional;

    @Column(name = "data_hora", nullable = false)
    @NotNull(message = "A data e hora são obrigatórias")
    @FutureOrPresent(message = "A data do agendamento não pode estar no passado")
    private LocalDateTime dataHora;

    @Column(name = "data_hora_fim")
    private LocalDateTime dataHoraFim;

    @Column(name = "valor", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "O valor é obrigatório")
    private BigDecimal valor;

    @Column(name = "valor_comissao")
    private BigDecimal valorComissao;

    @Column(name = "observacoes", length = 500)
    private String observacoes;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @NotNull(message = "O status é obrigatório")
    private StatusAgendamento status = StatusAgendamento.AGENDADO;

    @CreationTimestamp
    @Column(name = "data_criacao", updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    public enum StatusAgendamento {
        AGENDADO,
        CONFIRMADO,
        CONCLUIDO,
        CANCELADO,
        REAGENDADO,
        FALTOU
    }

    // Métodos de utilidade
    public void calcularHoraFim() {
        if (this.dataHora != null && this.procedimento != null && this.procedimento.getDuracaoMinutos() > 0) {
            this.dataHoraFim = this.dataHora.plusMinutes(this.procedimento.getDuracaoMinutos());
        }
    }

    public void calcularComissao() {
        if (this.valor != null && this.profissional != null && this.profissional.getComissaoPadrao() != null) {
            BigDecimal percentual = this.procedimento != null && this.procedimento.getPercentualComissao() != null ? 
                this.procedimento.getPercentualComissao() : this.profissional.getComissaoPadrao();
            
            this.valorComissao = this.valor.multiply(percentual.divide(new BigDecimal("100")));
        }
    }

    // Método utilitário para verificar se o agendamento está ativo
    @Transient
    public boolean isAtivo() {
        return this.status == StatusAgendamento.AGENDADO 
            || this.status == StatusAgendamento.CONFIRMADO;
    }
    
    // Método para calcular o valor da comissão
    @Transient
    public BigDecimal getValorComissao() {
        if (procedimento != null && procedimento.getPercentualComissao() != null) {
            return valor.multiply(procedimento.getPercentualComissao().divide(new BigDecimal("100")));
        }
        return BigDecimal.ZERO;
    }
} 