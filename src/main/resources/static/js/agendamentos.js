/**
 * Funcionalidades relacionadas ao gerenciamento de agendamentos
 */
document.addEventListener('DOMContentLoaded', function() {
    initAgendamentoModal();
    initCalendar();
});

/**
 * Inicializa o modal de novo agendamento
 */
function initAgendamentoModal() {
    const btnSalvarAgendamento = document.getElementById('btnSalvarAgendamento');
    if (btnSalvarAgendamento) {
        btnSalvarAgendamento.addEventListener('click', function() {
            salvarAgendamento();
        });
    }
    
    // Inicializa os componentes de data e hora com valores padrão
    const dataAgendamento = document.getElementById('dataAgendamento');
    const horaAgendamento = document.getElementById('horaAgendamento');
    
    if (dataAgendamento) {
        // Define a data padrão como hoje
        const hoje = new Date();
        const dataFormatada = hoje.toISOString().split('T')[0];
        dataAgendamento.value = dataFormatada;
    }
    
    if (horaAgendamento) {
        // Define a hora padrão como hora atual arredondada para próxima hora
        const agora = new Date();
        agora.setHours(agora.getHours() + 1);
        agora.setMinutes(0);
        const horaFormatada = `${String(agora.getHours()).padStart(2, '0')}:00`;
        horaAgendamento.value = horaFormatada;
    }
    
    // Preenche o valor quando o procedimento é selecionado
    const procedimentoSelect = document.getElementById('procedimentoAgendamento');
    const valorInput = document.getElementById('valorAgendamento');
    
    if (procedimentoSelect && valorInput) {
        procedimentoSelect.addEventListener('change', function() {
            // Aqui seria necessário buscar o valor do procedimento da API ou usar um dataset
            // Por enquanto, usando valores de exemplo
            const valorProcedimentos = {
                "1": 150.00, // Limpeza de Pele
                "2": 200.00, // Massagem
                "3": 350.00  // Botox
            };
            
            const valorSelecionado = valorProcedimentos[this.value] || 0;
            valorInput.value = valorSelecionado;
        });
    }
}

/**
 * Cria o modal de agendamento dinamicamente se ele não existir na página
 */
function criarModalAgendamento() {
    // Verifica se o modal já existe
    if (document.getElementById('novoAgendamentoModal')) {
        return;
    }
    
    // Cria o elemento do modal
    const modalHtml = `
        <div class="modal fade" id="novoAgendamentoModal" tabindex="-1" aria-labelledby="novoAgendamentoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="novoAgendamentoModalLabel">Novo Agendamento</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formNovoAgendamento">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="clienteAgendamento" class="form-label">Cliente</label>
                                    <select class="form-select" id="clienteAgendamento" required>
                                        <option value="" selected disabled>Selecione</option>
                                        <option value="1">Maria Silva</option>
                                        <option value="2">João Carlos</option>
                                        <option value="3">Ana Souza</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="procedimentoAgendamento" class="form-label">Procedimento</label>
                                    <select class="form-select" id="procedimentoAgendamento" required>
                                        <option value="" selected disabled>Selecione</option>
                                        <option value="1">Limpeza de Pele</option>
                                        <option value="2">Massagem</option>
                                        <option value="3">Botox</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="profissionalAgendamento" class="form-label">Profissional</label>
                                    <select class="form-select" id="profissionalAgendamento" required>
                                        <option value="" selected disabled>Selecione</option>
                                        <option value="1">Dra. Ana Oliveira</option>
                                        <option value="2">Dr. Carlos Santos</option>
                                        <option value="3">Dra. Márcia Lima</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="valorAgendamento" class="form-label">Valor (R$)</label>
                                    <input type="number" class="form-control" id="valorAgendamento" placeholder="0,00" step="0.01" min="0" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="dataAgendamento" class="form-label">Data</label>
                                    <input type="date" class="form-control" id="dataAgendamento" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="horaAgendamento" class="form-label">Hora</label>
                                    <input type="time" class="form-control" id="horaAgendamento" required>
                                </div>
                                <div class="col-12">
                                    <label for="observacoesAgendamento" class="form-label">Observações</label>
                                    <textarea class="form-control" id="observacoesAgendamento" rows="3"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnSalvarAgendamento">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adiciona o modal ao final do body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Inicializa os componentes do modal
    initAgendamentoModal();
}

/**
 * Salva um novo agendamento
 */
function salvarAgendamento() {
    const form = document.getElementById('formNovoAgendamento');
    if (form && form.checkValidity()) {
        // Aqui você pode implementar a lógica para enviar os dados ao servidor
        // Exemplo usando fetch:
        /*
        const formData = new FormData(form);
        fetch('/api/agendamentos', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Agendamento salvo com sucesso!');
            // Fechar modal e atualizar calendário
            const modal = bootstrap.Modal.getInstance(document.getElementById('novoAgendamentoModal'));
            modal.hide();
            atualizarCalendario();
        })
        .catch(error => {
            console.error('Erro ao salvar agendamento:', error);
            alert('Erro ao salvar agendamento. Tente novamente.');
        });
        */
        
        // Por enquanto, apenas mostra uma mensagem de sucesso
        alert('Agendamento salvo com sucesso!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('novoAgendamentoModal'));
        if (modal) {
            modal.hide();
        }
        
        // Se o calendário estiver disponível, atualiza-o
        if (typeof calendar !== 'undefined') {
            calendar.refetchEvents();
        }
    } else if (form) {
        form.reportValidity();
    }
}

/**
 * Inicializa o calendário de agendamentos
 */
function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;
    
    window.calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: ''
        },
        height: 500,
        events: [
            {
                title: 'Limpeza - Maria',
                start: '2023-06-12T10:00:00',
                end: '2023-06-12T11:00:00',
                className: 'bg-estetica'
            },
            {
                title: 'Massagem - João',
                start: '2023-06-12T14:30:00',
                end: '2023-06-12T15:30:00',
                className: 'bg-saude'
            },
            {
                title: 'Botox - Ana (CANCELADO)',
                start: '2023-06-12T16:00:00',
                end: '2023-06-12T17:00:00',
                className: 'bg-cancelado'
            }
        ],
        eventClick: function(info) {
            alert('Agendamento: ' + info.event.title);
        }
    });
    
    calendar.render();
    
    // Configuração dos botões de navegação
    document.getElementById('btnHoje')?.addEventListener('click', function() {
        calendar.today();
    });
    
    document.getElementById('btnMes')?.addEventListener('click', function() {
        calendar.changeView('dayGridMonth');
        setActiveButton(this);
    });
    
    document.getElementById('btnSemana')?.addEventListener('click', function() {
        calendar.changeView('timeGridWeek');
        setActiveButton(this);
    });
    
    document.getElementById('btnDia')?.addEventListener('click', function() {
        calendar.changeView('timeGridDay');
        setActiveButton(this);
    });
}

/**
 * Define o botão ativo na navegação do calendário
 */
function setActiveButton(button) {
    const buttons = document.querySelectorAll('.btn-group .btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

/**
 * Abre o modal de novo agendamento
 */
function abrirModalNovoAgendamento() {
    // Cria o modal se ele não existir
    criarModalAgendamento();
    
    // Abre o modal
    const modal = new bootstrap.Modal(document.getElementById('novoAgendamentoModal'));
    modal.show();
} 