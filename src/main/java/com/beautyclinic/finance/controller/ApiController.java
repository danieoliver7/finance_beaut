package com.beautyclinic.finance.controller;

import com.beautyclinic.finance.model.Agendamento;
import com.beautyclinic.finance.model.Cliente;
import com.beautyclinic.finance.model.Procedimento;
import com.beautyclinic.finance.model.Profissional;
import com.beautyclinic.finance.repository.AgendamentoRepository;
import com.beautyclinic.finance.repository.ClienteRepository;
import com.beautyclinic.finance.repository.ProcedimentoRepository;
import com.beautyclinic.finance.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;
    
    @Autowired
    private ProfissionalRepository profissionalRepository;
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private ProcedimentoRepository procedimentoRepository;
    
    // ============ ENDPOINTS DE PROFISSIONAIS ============
    
    @GetMapping("/profissionais")
    public List<Profissional> listarProfissionais() {
        return profissionalRepository.findAll();
    }
    
    @GetMapping("/profissionais/{id}")
    public ResponseEntity<Profissional> obterProfissional(@PathVariable Long id) {
        Optional<Profissional> profissional = profissionalRepository.findById(id);
        return profissional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping("/profissionais")
    public ResponseEntity<Profissional> criarProfissional(@RequestBody Profissional profissional) {
        Profissional novoProfissional = profissionalRepository.save(profissional);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProfissional);
    }
    
    @PutMapping("/profissionais/{id}")
    public ResponseEntity<Profissional> atualizarProfissional(@PathVariable Long id, @RequestBody Profissional profissional) {
        if (!profissionalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        profissional.setId(id);
        Profissional profissionalAtualizado = profissionalRepository.save(profissional);
        return ResponseEntity.ok(profissionalAtualizado);
    }
    
    @DeleteMapping("/profissionais/{id}")
    public ResponseEntity<Void> excluirProfissional(@PathVariable Long id) {
        if (!profissionalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        profissionalRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    // ============ ENDPOINTS DE PROCEDIMENTOS ============
    
    @GetMapping("/procedimentos")
    public List<Procedimento> listarProcedimentos(@RequestParam(required = false) Boolean ativos) {
        if (ativos != null && ativos) {
            return procedimentoRepository.findByAtivoTrue();
        }
        return procedimentoRepository.findAll();
    }
    
    @GetMapping("/procedimentos/{id}")
    public ResponseEntity<Procedimento> obterProcedimento(@PathVariable Long id) {
        Optional<Procedimento> procedimento = procedimentoRepository.findById(id);
        return procedimento.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping("/procedimentos")
    public ResponseEntity<Procedimento> criarProcedimento(@RequestBody Procedimento procedimento) {
        Procedimento novoProcedimento = procedimentoRepository.save(procedimento);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProcedimento);
    }
    
    @PutMapping("/procedimentos/{id}")
    public ResponseEntity<Procedimento> atualizarProcedimento(@PathVariable Long id, @RequestBody Procedimento procedimento) {
        if (!procedimentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        procedimento.setId(id);
        Procedimento procedimentoAtualizado = procedimentoRepository.save(procedimento);
        return ResponseEntity.ok(procedimentoAtualizado);
    }
    
    @DeleteMapping("/procedimentos/{id}")
    public ResponseEntity<Void> excluirProcedimento(@PathVariable Long id) {
        if (!procedimentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        // Em vez de excluir fisicamente, marcamos como inativo
        Optional<Procedimento> procedimento = procedimentoRepository.findById(id);
        if (procedimento.isPresent()) {
            Procedimento proc = procedimento.get();
            proc.setAtivo(false);
            procedimentoRepository.save(proc);
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // ============ ENDPOINTS DE CLIENTES ============
    
    @GetMapping("/clientes")
    public List<Cliente> listarClientes(@RequestParam(required = false) String nome) {
        if (nome != null && !nome.trim().isEmpty()) {
            return clienteRepository.findByNomeContainingIgnoreCase(nome);
        }
        return clienteRepository.findAll();
    }
    
    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> obterCliente(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping("/clientes")
    public ResponseEntity<Cliente> criarCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteRepository.save(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
    }
    
    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        if (!clienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        cliente.setId(id);
        Cliente clienteAtualizado = clienteRepository.save(cliente);
        return ResponseEntity.ok(clienteAtualizado);
    }
    
    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Void> excluirCliente(@PathVariable Long id) {
        if (!clienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        clienteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    // ============ ENDPOINTS DE AGENDAMENTOS ============
    
    @GetMapping("/agendamentos")
    public List<Agendamento> listarAgendamentos(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim,
            @RequestParam(required = false) Long profissionalId) {
        
        if (profissionalId != null) {
            Optional<Profissional> profissional = profissionalRepository.findById(profissionalId);
            return profissional.map(agendamentoRepository::findByProfissionalOrderByDataHoraAsc)
                    .orElse(List.of());
        }
        
        if (inicio != null && fim != null) {
            return agendamentoRepository.findByDataHoraBetweenOrderByDataHoraAsc(inicio, fim);
        }
        
        return agendamentoRepository.findAll();
    }
    
    @GetMapping("/agendamentos/hoje")
    public List<Agendamento> agendamentosHoje() {
        return agendamentoRepository.findAgendamentosHoje();
    }
    
    @GetMapping("/agendamentos/futuros")
    public List<Agendamento> agendamentosFuturos() {
        return agendamentoRepository.findByDataHoraAfterOrderByDataHoraAsc(LocalDateTime.now());
    }
    
    @GetMapping("/agendamentos/{id}")
    public ResponseEntity<Agendamento> obterAgendamento(@PathVariable Long id) {
        Optional<Agendamento> agendamento = agendamentoRepository.findById(id);
        return agendamento.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping("/agendamentos")
    public ResponseEntity<Agendamento> criarAgendamento(@RequestBody Agendamento agendamento) {
        agendamento.calcularHoraFim();
        agendamento.calcularComissao();
        Agendamento novoAgendamento = agendamentoRepository.save(agendamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAgendamento);
    }
    
    @PutMapping("/agendamentos/{id}")
    public ResponseEntity<Agendamento> atualizarAgendamento(@PathVariable Long id, @RequestBody Agendamento agendamento) {
        if (!agendamentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        agendamento.setId(id);
        agendamento.calcularHoraFim();
        agendamento.calcularComissao();
        Agendamento agendamentoAtualizado = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(agendamentoAtualizado);
    }
    
    @PatchMapping("/agendamentos/{id}/status")
    public ResponseEntity<Agendamento> atualizarStatusAgendamento(
            @PathVariable Long id, 
            @RequestBody Map<String, String> status) {
        
        Optional<Agendamento> agendamentoOpt = agendamentoRepository.findById(id);
        if (agendamentoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        String novoStatus = status.get("status");
        if (novoStatus == null) {
            return ResponseEntity.badRequest().build();
        }
        
        try {
            Agendamento agendamento = agendamentoOpt.get();
            agendamento.setStatus(Agendamento.StatusAgendamento.valueOf(novoStatus));
            return ResponseEntity.ok(agendamentoRepository.save(agendamento));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/agendamentos/{id}")
    public ResponseEntity<Void> excluirAgendamento(@PathVariable Long id) {
        if (!agendamentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        agendamentoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 