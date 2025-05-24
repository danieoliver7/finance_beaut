'use client';

import { useState, useEffect } from 'react';

interface AgendamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

const AgendamentoModal: React.FC<AgendamentoModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    clienteAgendamento: '',
    procedimentoAgendamento: '',
    profissionalAgendamento: '',
    valorAgendamento: '',
    dataAgendamento: '',
    horaAgendamento: '',
    observacoesAgendamento: ''
  });

  // Inicializa os componentes de data e hora com valores padrão
  useEffect(() => {
    if (isOpen) {
      // Define a data padrão como hoje
      const hoje = new Date();
      const dataFormatada = hoje.toISOString().split('T')[0];
      
      // Define a hora padrão como hora atual arredondada para próxima hora
      const agora = new Date();
      agora.setHours(agora.getHours() + 1);
      agora.setMinutes(0);
      const horaFormatada = `${String(agora.getHours()).padStart(2, '0')}:00`;
      
      setFormData(prev => ({
        ...prev,
        dataAgendamento: dataFormatada,
        horaAgendamento: horaFormatada
      }));
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Preenche o valor quando o procedimento é selecionado
    if (name === 'procedimentoAgendamento') {
      // Valores de exemplo
      const valorProcedimentos: {[key: string]: number} = {
        "1": 150.00, // Limpeza de Pele
        "2": 200.00, // Massagem
        "3": 350.00  // Botox
      };
      
      const valorSelecionado = valorProcedimentos[value] || 0;
      setFormData(prev => ({ ...prev, valorAgendamento: valorSelecionado.toString() }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
    alert('Agendamento salvo com sucesso!');
  };

  if (!isOpen) return null;

  // Estilos customizados para o modal
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1050
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    margin: '1.75rem'
  };

  const modalHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #dee2e6'
  };

  const modalBodyStyle: React.CSSProperties = {
    padding: '1.5rem'
  };

  const modalFooterStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1.5rem',
    borderTop: '1px solid #dee2e6',
    gap: '10px'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 500
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white'
  };

  const saveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#593043',
    color: 'white'
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <h5 style={{ margin: 0, fontWeight: 500 }}>Novo Agendamento</h5>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ 
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
        <div style={modalBodyStyle}>
          <form id="formNovoAgendamento" onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -0.5rem' }}>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="clienteAgendamento" style={{ display: 'block', marginBottom: '0.5rem' }}>Cliente</label>
                  <select 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    id="clienteAgendamento" 
                    name="clienteAgendamento"
                    value={formData.clienteAgendamento}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="1">Maria Silva</option>
                    <option value="2">João Carlos</option>
                    <option value="3">Ana Souza</option>
                  </select>
                </div>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="procedimentoAgendamento" style={{ display: 'block', marginBottom: '0.5rem' }}>Procedimento</label>
                  <select 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    id="procedimentoAgendamento"
                    name="procedimentoAgendamento"
                    value={formData.procedimentoAgendamento}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="1">Limpeza de Pele</option>
                    <option value="2">Massagem</option>
                    <option value="3">Botox</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -0.5rem' }}>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="profissionalAgendamento" style={{ display: 'block', marginBottom: '0.5rem' }}>Profissional</label>
                  <select 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    id="profissionalAgendamento"
                    name="profissionalAgendamento"
                    value={formData.profissionalAgendamento}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="1">Dra. Ana Oliveira</option>
                    <option value="2">Dr. Carlos Santos</option>
                    <option value="3">Dra. Márcia Lima</option>
                  </select>
                </div>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="valorAgendamento" style={{ display: 'block', marginBottom: '0.5rem' }}>Valor (R$)</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="number" 
                    id="valorAgendamento"
                    name="valorAgendamento"
                    placeholder="0,00" 
                    step="0.01" 
                    min="0"
                    value={formData.valorAgendamento}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -0.5rem' }}>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="dataAgendamento" style={{ display: 'block', marginBottom: '0.5rem' }}>Data</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="date" 
                    id="dataAgendamento"
                    name="dataAgendamento"
                    value={formData.dataAgendamento}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="horaAgendamento" style={{ display: 'block', marginBottom: '0.5rem' }}>Hora</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="time" 
                    id="horaAgendamento"
                    name="horaAgendamento"
                    value={formData.horaAgendamento}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={{ margin: '0 -0.5rem' }}>
                <div style={{ padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="observacoesAgendamento" style={{ display: 'block', marginBottom: '0.5rem' }}>Observações</label>
                  <textarea 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem',
                      minHeight: '100px'
                    }}
                    id="observacoesAgendamento"
                    name="observacoesAgendamento"
                    rows={3}
                    value={formData.observacoesAgendamento}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div style={modalFooterStyle}>
          <button type="button" style={cancelButtonStyle} onClick={onClose}>Cancelar</button>
          <button type="button" style={saveButtonStyle} onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoModal; 