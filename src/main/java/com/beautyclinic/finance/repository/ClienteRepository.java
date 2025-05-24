package com.beautyclinic.finance.repository;

import com.beautyclinic.finance.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Buscar cliente por nome (like/contém)
    List<Cliente> findByNomeContainingIgnoreCase(String nome);
    
    // Buscar cliente por email
    Cliente findByEmailIgnoreCase(String email);
    
    // Buscar cliente por telefone
    Cliente findByTelefone(String telefone);
} 