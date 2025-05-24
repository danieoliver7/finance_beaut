package com.beautyclinic.finance.repository;

import com.beautyclinic.finance.model.Agendamento;
import com.beautyclinic.finance.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    // Buscar agendamentos de um profissional específico
    List<Agendamento> findByProfissionalOrderByDataHoraAsc(Profissional profissional);
    
    // Buscar agendamentos entre datas
    List<Agendamento> findByDataHoraBetweenOrderByDataHoraAsc(LocalDateTime inicio, LocalDateTime fim);
    
    // Buscar agendamentos de hoje
    @Query("SELECT a FROM Agendamento a WHERE YEAR(a.dataHora) = YEAR(CURRENT_DATE) AND MONTH(a.dataHora) = MONTH(CURRENT_DATE) AND DAY(a.dataHora) = DAY(CURRENT_DATE) ORDER BY a.dataHora ASC")
    List<Agendamento> findAgendamentosHoje();
    
    // Buscar agendamentos por status
    List<Agendamento> findByStatusOrderByDataHoraAsc(Agendamento.StatusAgendamento status);
    
    // Buscar agendamentos futuros
    List<Agendamento> findByDataHoraAfterOrderByDataHoraAsc(LocalDateTime agora);
} 