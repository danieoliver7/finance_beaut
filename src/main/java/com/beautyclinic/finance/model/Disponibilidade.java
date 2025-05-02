package com.beautyclinic.finance.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Disponibilidade {

    @Column(name = "disp_segunda_inicio")
    private String segundaInicio;
    
    @Column(name = "disp_segunda_fim")
    private String segundaFim;
    
    @Column(name = "disp_terca_inicio")
    private String tercaInicio;
    
    @Column(name = "disp_terca_fim")
    private String tercaFim;
    
    @Column(name = "disp_quarta_inicio")
    private String quartaInicio;
    
    @Column(name = "disp_quarta_fim")
    private String quartaFim;
    
    @Column(name = "disp_quinta_inicio")
    private String quintaInicio;
    
    @Column(name = "disp_quinta_fim")
    private String quintaFim;
    
    @Column(name = "disp_sexta_inicio")
    private String sextaInicio;
    
    @Column(name = "disp_sexta_fim")
    private String sextaFim;
    
    @Column(name = "disp_sabado_inicio")
    private String sabadoInicio;
    
    @Column(name = "disp_sabado_fim")
    private String sabadoFim;
    
    @Column(name = "disp_domingo_inicio")
    private String domingoInicio;
    
    @Column(name = "disp_domingo_fim")
    private String domingoFim;
} 