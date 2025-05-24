/**
 * Calendário para o sistema Beauty Clinic Finance
 * Implementação com FullCalendar
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de calendário
    if (!document.getElementById('calendar')) return;
    
    console.log('Inicializando calendário...');
    
    // Elementos do DOM
    const calendarEl = document.getElementById('calendar');
    const btnHoje = document.getElementById('btnHoje');
    const btnMes = document.getElementById('btnMes');
    const btnSemana = document.getElementById('btnSemana');
    const btnDia = document.getElementById('btnDia');
    
    // Inicializar o calendário
    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        initialView: 'dayGridMonth',
        height: 'auto',
        headerToolbar: false, // Usaremos nossos próprios botões
        themeSystem: 'bootstrap5',
        aspectRatio: 1.8,
        buttonIcons: {
            prev: 'chevron-left',
            next: 'chevron-right',
            today: 'calendar-check'
        },
        dayMaxEvents: true, // Permite "more" link quando há muitos eventos
        firstDay: 0, // Domingo como primeiro dia da semana
        
        // Navegação
        customButtons: {
            prev: {
                click: function() { calendar.prev(); }
            },
            next: {
                click: function() { calendar.next(); }
            }
        },
        
        // Arredondar cantos dos dias
        dayCellClassNames: function(info) {
            return ['rounded-day'];
        },
        
        // Carregar eventos da API
        events: function(info, successCallback, failureCallback) {
            // Verificar se a API está disponível
            if (typeof api !== 'undefined' && api.agendamentos) {
                api.agendamentos.listar({
                    inicio: info.start,
                    fim: info.end
                })
                .then(agendamentos => {
                    // Transformar os dados para o formato do FullCalendar
                    const events = agendamentos.map(a => {
                        // Definir cor com base na categoria
                        let className = 'fc-event-outro';
                        if (a.procedimento && a.procedimento.categoria) {
                            if (a.procedimento.categoria.includes('ESTETICA')) {
                                className = 'fc-event-estetica';
                            } else if (a.procedimento.categoria.includes('SAUDE')) {
                                className = 'fc-event-saude';
                            }
                        }
                        
                        // Adicionar classe para cancelados
                        if (a.status === 'CANCELADO') {
                            className += ' fc-event-cancelado';
                        }
                        
                        return {
                            id: a.id,
                            title: `${a.cliente.nome} - ${a.procedimento.nome}`,
                            start: a.dataHora,
                            end: a.dataHoraFim || getEndTime(a.dataHora, a.procedimento),
                            className: className,
                            extendedProps: {
                                agendamento: a
                            }
                        };
                    });
                    
                    successCallback(events);
                })
                .catch(error => {
                    console.error('Erro ao carregar agendamentos:', error);
                    failureCallback(error);
                    
                    // Carregar dados de demonstração em caso de erro
                    const demoEvents = generateDemoEvents(info.start, info.end);
                    successCallback(demoEvents);
                });
            } else {
                console.log('API não encontrada, carregando dados de demonstração');
                // Carregar dados de demonstração
                const demoEvents = generateDemoEvents(info.start, info.end);
                successCallback(demoEvents);
            }
        },
        
        // Clicar em um evento
        eventClick: function(info) {
            const event = info.event;
            const agendamento = event.extendedProps.agendamento;
            
            if (agendamento) {
                // Implementar aqui a lógica de exibição do modal de detalhes
                alert(`Detalhes do Agendamento:
                Cliente: ${agendamento.cliente.nome}
                Procedimento: ${agendamento.procedimento.nome}
                Data/Hora: ${formatDateTime(agendamento.dataHora)}
                Status: ${agendamento.status}`);
            } else {
                console.warn('Agendamento não encontrado para o evento:', event);
            }
            
            // Evitar navegação padrão
            info.jsEvent.preventDefault();
        },
        
        // Clicar em um dia
        dateClick: function(info) {
            openNewAppointmentModal(info.date);
        }
    });
    
    // Renderizar o calendário
    setTimeout(() => {
        calendar.render();
        console.log('Calendário renderizado');
    }, 100);
    
    // Event listeners para os botões de navegação
    if (btnHoje) {
        btnHoje.addEventListener('click', function() {
            calendar.today();
        });
    }
    
    if (btnMes) {
        btnMes.addEventListener('click', function() {
            calendar.changeView('dayGridMonth');
            updateActiveButton(btnMes);
        });
    }
    
    if (btnSemana) {
        btnSemana.addEventListener('click', function() {
            calendar.changeView('timeGridWeek');
            updateActiveButton(btnSemana);
        });
    }
    
    if (btnDia) {
        btnDia.addEventListener('click', function() {
            calendar.changeView('timeGridDay');
            updateActiveButton(btnDia);
        });
    }
    
    // Função para atualizar o botão ativo
    function updateActiveButton(activeBtn) {
        [btnMes, btnSemana, btnDia].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        if (activeBtn) activeBtn.classList.add('active');
    }
    
    // Função para abrir o modal de novo agendamento
    function openNewAppointmentModal(date) {
        // Formatar a data para o formato do input
        const formattedDate = formatDateForInput(date);
        
        // Definir um horário padrão (9:00)
        let hour = 9;
        let minute = 0;
        
        // Se for o dia atual, usar o próximo horário disponível
        const now = new Date();
        if (isSameDay(date, now)) {
            hour = now.getHours();
            minute = now.getMinutes() < 30 ? 30 : 0;
            if (minute === 0) hour++;
            if (hour >= 18) hour = 18;
        }
        
        // Formatar horário
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Preencher a data e horário no formulário do modal
        const dataInput = document.getElementById('dataAgendamento');
        const horaInput = document.getElementById('horaAgendamento');
        
        if (dataInput && horaInput) {
            dataInput.value = formattedDate;
            horaInput.value = formattedTime;
            
            // Abrir o modal
            const modal = new bootstrap.Modal(document.getElementById('novoAgendamentoModal'));
            modal.show();
        } else {
            console.error('Elementos do formulário não encontrados');
        }
    }
    
    // Função para gerar eventos de demonstração
    function generateDemoEvents(start, end) {
        const demoEvents = [];
        const procedimentos = [
            { nome: 'Limpeza de Pele', categoria: 'ESTETICA', duracao: 60 },
            { nome: 'Massagem Modeladora', categoria: 'ESTETICA', duracao: 90 },
            { nome: 'Microagulhamento', categoria: 'SAUDE', duracao: 45 },
            { nome: 'Depilação a Laser', categoria: 'ESTETICA', duracao: 30 },
            { nome: 'Peeling Químico', categoria: 'SAUDE', duracao: 60 }
        ];
        const clientes = [
            { nome: 'Ana Silva' },
            { nome: 'Carlos Oliveira' },
            { nome: 'Mariana Costa' },
            { nome: 'Paulo Santos' },
            { nome: 'Juliana Lima' }
        ];
        const status = ['AGENDADO', 'CONFIRMADO', 'CONCLUIDO', 'CANCELADO'];
        
        // Número de dias no intervalo
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Gerar entre 15 e 30 eventos aleatórios
        const numEvents = Math.floor(Math.random() * 15) + 15;
        
        for (let i = 0; i < numEvents; i++) {
            // Data aleatória no intervalo
            const randomDayOffset = Math.floor(Math.random() * diffDays);
            const eventDate = new Date(start);
            eventDate.setDate(eventDate.getDate() + randomDayOffset);
            
            // Hora aleatória entre 8h e 17h
            eventDate.setHours(Math.floor(Math.random() * 9) + 8, Math.floor(Math.random() * 4) * 15, 0);
            
            // Selecionar procedimento, cliente e status aleatórios
            const procedimento = procedimentos[Math.floor(Math.random() * procedimentos.length)];
            const cliente = clientes[Math.floor(Math.random() * clientes.length)];
            const eventoStatus = status[Math.floor(Math.random() * status.length)];
            
            // Calcular fim do evento
            const endDate = new Date(eventDate);
            endDate.setMinutes(endDate.getMinutes() + procedimento.duracao);
            
            // Definir classe com base na categoria
            let className = 'fc-event-outro';
            if (procedimento.categoria === 'ESTETICA') {
                className = 'fc-event-estetica';
            } else if (procedimento.categoria === 'SAUDE') {
                className = 'fc-event-saude';
            }
            
            // Adicionar classe para cancelados
            if (eventoStatus === 'CANCELADO') {
                className += ' fc-event-cancelado';
            }
            
            // Criar evento
            const event = {
                id: i + 1,
                title: `${cliente.nome} - ${procedimento.nome}`,
                start: eventDate,
                end: endDate,
                className: className,
                extendedProps: {
                    agendamento: {
                        id: i + 1,
                        cliente: cliente,
                        procedimento: procedimento,
                        dataHora: eventDate.toISOString(),
                        dataHoraFim: endDate.toISOString(),
                        status: eventoStatus
                    }
                }
            };
            
            demoEvents.push(event);
        }
        
        return demoEvents;
    }
    
    // Função para calcular o horário de término com base na duração do procedimento
    function getEndTime(startTime, procedimento) {
        if (!startTime) return null;
        
        const start = new Date(startTime);
        const end = new Date(start);
        
        // Usar a duração do procedimento ou padrão de 60 minutos
        const duracao = procedimento && procedimento.duracaoMinutos ? procedimento.duracaoMinutos : 60;
        end.setMinutes(end.getMinutes() + duracao);
        
        return end;
    }
    
    // Função para verificar se duas datas são o mesmo dia
    function isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }
    
    // Função para formatar data para input
    function formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }
    
    // Função para formatar data e hora
    function formatDateTime(dateTimeStr) {
        if (!dateTimeStr) return 'N/A';
        
        const date = new Date(dateTimeStr);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}); 