'use client';

import AdminLayout from '@/components/layouts/AdminLayout';
import './agendamentos.css';
import Link from 'next/link';
import { useState } from 'react';
import AgendamentoModal from '@/components/modals/AgendamentoModal';

// Dados simulados para a tabela de agendamentos recentes
const agendamentosRecentes = [
  { 
    id: 1, 
    cliente: 'Maria Silva', 
    procedimento: 'Limpeza de Pele', 
    dataHora: '12/06 10:00', 
    status: 'Confirmado' 
  },
  { 
    id: 2, 
    cliente: 'João Carlos', 
    procedimento: 'Massagem', 
    dataHora: '12/06 14:30', 
    status: 'Pendente' 
  },
  { 
    id: 3, 
    cliente: 'Ana Souza', 
    procedimento: 'Botox', 
    dataHora: '12/06 16:00', 
    status: 'Cancelado' 
  },
  { 
    id: 4, 
    cliente: 'Paulo Henrique', 
    procedimento: 'Acupuntura', 
    dataHora: '13/06 09:00', 
    status: 'Confirmado' 
  },
  { 
    id: 5, 
    cliente: 'Clara Oliveira', 
    procedimento: 'Drenagem', 
    dataHora: '13/06 11:30', 
    status: 'Confirmado' 
  },
  { 
    id: 6, 
    cliente: 'Roberto Alves', 
    procedimento: 'Hidroterapia', 
    dataHora: '13/06 15:00', 
    status: 'Pendente' 
  }
];

// Gerar lista de dias para o calendário
const gerarDiasDoMes = () => {
  const dias = [];
  for (let i = 1; i <= 31; i++) {
    dias.push(i);
  }
  return dias;
};

export default function Agendamentos() {
  const [filtroAtivo, setFiltroAtivo] = useState('mes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSaveAgendamento = (data: any) => {
    console.log('Novo agendamento:', data);
    // Aqui você adicionaria lógica para salvar o agendamento
  };
  
  return (
    <AdminLayout>
      <div className="dashboard-container w-100">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4 px-4">
          <h1>Agendamentos</h1>
          <div className="d-flex">
            <button className="btn btn-light me-2">
              <i className="bi bi-list"></i> Lista mês
            </button>
            <button className="btn btn-primary novo-btn" onClick={openModal}>
              <i className="bi bi-plus-lg me-1"></i> Novo Agendamento
            </button>
          </div>
        </div>
        
        {/* Cards informativos */}
        <div className="row mx-2">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card dashboard-card h-100">
              <div className="card-body p-3">
                <div className="d-flex flex-column">
                  <h6 className="text-uppercase fw-bold small text-muted mb-1">TOTAL DE AGENDAMENTOS</h6>
                  <h2 className="mb-1">48</h2>
                  <span className="small text-success">
                    <i className="bi bi-arrow-up"></i> +12% este mês
                  </span>
                </div>
                <div className="card-icon-right">
                  <i className="bi bi-calendar-check"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card dashboard-card h-100">
              <div className="card-body p-3">
                <div className="d-flex flex-column">
                  <h6 className="text-uppercase fw-bold small text-muted mb-1">NOVOS CLIENTES</h6>
                  <h2 className="mb-1">12</h2>
                  <span className="small text-success">
                    <i className="bi bi-arrow-up"></i> +8% este mês
                  </span>
                </div>
                <div className="card-icon-right">
                  <i className="bi bi-people"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card dashboard-card h-100">
              <div className="card-body p-3">
                <div className="d-flex flex-column">
                  <h6 className="text-uppercase fw-bold small text-muted mb-1">RECEITA</h6>
                  <h2 className="mb-1">R$ 8.250</h2>
                  <span className="small text-success">
                    <i className="bi bi-arrow-up"></i> +15% este mês
                  </span>
                </div>
                <div className="card-icon-right">
                  <i className="bi bi-currency-dollar"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card dashboard-card h-100">
              <div className="card-body p-3">
                <div className="d-flex flex-column">
                  <h6 className="text-uppercase fw-bold small text-muted mb-1">TAXA DE OCUPAÇÃO</h6>
                  <h2 className="mb-1">78%</h2>
                  <span className="small text-success">
                    <i className="bi bi-arrow-up"></i> +2% este mês
                  </span>
                </div>
                <div className="card-icon-right">
                  <i className="bi bi-clock"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filtros de período */}
        <div className="row mx-2">
          <div className="col-12">
            <div className="period-filters d-flex mb-3">
              <button 
                className={`btn btn-sm me-1 ${filtroAtivo === 'hoje' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setFiltroAtivo('hoje')}
              >
                Hoje
              </button>
              <button 
                className={`btn btn-sm me-1 ${filtroAtivo === 'mes' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setFiltroAtivo('mes')}
              >
                Mês
              </button>
              <button 
                className={`btn btn-sm me-1 ${filtroAtivo === 'semana' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setFiltroAtivo('semana')}
              >
                Semana
              </button>
              <button 
                className={`btn btn-sm ${filtroAtivo === 'dia' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setFiltroAtivo('dia')}
              >
                Dia
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendário Mensal */}
        <div className="row mx-2">
          <div className="col-12">
            <div className="card shadow mb-4">
              <div className="card-body p-0">
                <div className="calendar-header d-flex justify-content-between align-items-center p-3">
                  <div className="calendar-navigation">
                    <button className="btn btn-sm btn-light me-2">
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="btn btn-sm btn-light">
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                  <h5 className="m-0">maio de 2025</h5>
                  <div className="calendar-legend d-flex">
                    <div className="legend-item me-3">
                      <span className="dot dot-available"></span> Elétrica
                    </div>
                    <div className="legend-item me-3">
                      <span className="dot dot-occupied"></span> Saúde
                    </div>
                    <div className="legend-item">
                      <span className="dot dot-canceled"></span> Cancelada
                    </div>
                  </div>
                </div>
                
                <div className="calendar-grid">
                  <div className="calendar-weekdays">
                    <div className="weekday text-center">dom.</div>
                    <div className="weekday text-center">seg.</div>
                    <div className="weekday text-center">ter.</div>
                    <div className="weekday text-center">qua.</div>
                    <div className="weekday text-center">qui.</div>
                    <div className="weekday text-center">sex.</div>
                    <div className="weekday text-center">sáb.</div>
                  </div>
                  
                  <div className="calendar-days">
                    {/* Primeira linha: dias anteriores + início do mês */}
                    <div className="day text-center">
                      <span className="day-number opacity-50">27</span>
                    </div>
                    <div className="day text-center">
                      <span className="day-number opacity-50">28</span>
                    </div>
                    <div className="day text-center">
                      <span className="day-number opacity-50">29</span>
                    </div>
                    <div className="day text-center">
                      <span className="day-number opacity-50">30</span>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">1</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">2</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">3</Link>
                    </div>
                    
                    {/* Semana 2 */}
                    <div className="day text-center">
                      <Link href="#" className="day-number">4</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">5</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number has-events">6</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">7</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number has-events">8</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">9</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">10</Link>
                    </div>
                    
                    {/* Semana 3 */}
                    <div className="day text-center">
                      <Link href="#" className="day-number">11</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number has-events">12</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number has-events">13</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number has-events">14</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">15</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">16</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">17</Link>
                    </div>
                    
                    {/* Semana 4 */}
                    <div className="day text-center">
                      <Link href="#" className="day-number">18</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">19</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number has-events">20</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number has-events">21</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">22</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">23</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">24</Link>
                    </div>
                    
                    {/* Semana 5 */}
                    <div className="day text-center">
                      <Link href="#" className="day-number">25</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">26</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">27</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number has-events">28</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">29</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">30</Link>
                    </div>
                    <div className="day text-center">
                      <Link href="#" className="day-number">31</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabela de Agendamentos Recentes */}
        <div className="row mx-2 mb-4">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Agendamentos Recentes</h5>
                <div>
                  <select className="form-select form-select-sm">
                    <option>Hoje</option>
                    <option>Esta Semana</option>
                    <option>Este Mês</option>
                  </select>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover m-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">CLIENTE</th>
                        <th scope="col">PROCEDIMENTO</th>
                        <th scope="col">DATA/HORA</th>
                        <th scope="col">STATUS</th>
                        <th scope="col" className="text-center">AÇÕES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agendamentosRecentes.map((agendamento) => (
                        <tr key={agendamento.id}>
                          <td>{agendamento.cliente}</td>
                          <td>{agendamento.procedimento}</td>
                          <td>{agendamento.dataHora}</td>
                          <td>
                            <span className={`badge status-${agendamento.status.toLowerCase()}`}>
                              {agendamento.status}
                            </span>
                          </td>
                          <td className="text-center">
                            <button className="btn btn-sm btn-light btn-icon me-1" title="Editar">
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-sm btn-light btn-icon" title="Ver detalhes">
                              <i className="bi bi-eye"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal de Novo Agendamento */}
        <AgendamentoModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onSave={handleSaveAgendamento}
        />
      </div>
    </AdminLayout>
  );
} 