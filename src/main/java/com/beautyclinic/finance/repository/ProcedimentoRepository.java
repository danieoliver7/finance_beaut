package com.beautyclinic.finance.repository;

import com.beautyclinic.finance.model.Procedimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcedimentoRepository extends JpaRepository<Procedimento, Long> {
    // Buscar procedimentos ativos
    List<Procedimento> findByAtivoTrue();
    
    // Buscar procedimentos por categoria
    List<Procedimento> findByCategoriaAndAtivoTrue(String categoria);
} 