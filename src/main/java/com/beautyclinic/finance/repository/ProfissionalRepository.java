package com.beautyclinic.finance.repository;

import com.beautyclinic.finance.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {
    // Métodos personalizados podem ser adicionados aqui
} 