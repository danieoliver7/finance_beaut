'use client';

import { useState, useEffect } from 'react';

interface ProfissionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  profissional?: {
    id?: number;
    nome: string;
    telefone: string;
    identificacao: string;
    especialidade: string;
    email: string;
    formacao: string;
    dataContratacao: string;
  } | null;
}

const ProfissionalModal: React.FC<ProfissionalModalProps> = ({ isOpen, onClose, onSave, profissional }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    identificacao: '',
    especialidade: '',
    email: '',
    formacao: '',
    dataContratacao: ''
  });

  // Preenche o formulário com os dados do profissional se estiver editando
  useEffect(() => {
    if (profissional) {
      setFormData({
        nome: profissional.nome || '',
        telefone: profissional.telefone || '',
        identificacao: profissional.identificacao || '',
        especialidade: profissional.especialidade || '',
        email: profissional.email || '',
        formacao: profissional.formacao || '',
        dataContratacao: profissional.dataContratacao || ''
      });
    } else {
      // Reset do formulário quando for um novo profissional
      setFormData({
        nome: '',
        telefone: '',
        identificacao: '',
        especialidade: '',
        email: '',
        formacao: '',
        dataContratacao: new Date().toISOString().split('T')[0]
      });
    }
  }, [profissional, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...formData,
        id: profissional?.id // Mantém o ID original se estiver editando
      });
    }
    onClose();
    alert('Profissional salvo com sucesso!');
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
          <h5 style={{ margin: 0, fontWeight: 500 }}>
            {profissional?.id ? 'Editar Profissional' : 'Novo Profissional'}
          </h5>
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
          <form id="formProfissional" onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -0.5rem' }}>
                <div style={{ flex: '0 0 100%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="nome" style={{ display: 'block', marginBottom: '0.5rem' }}>Nome Completo*</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="text" 
                    id="nome" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -0.5rem' }}>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="telefone" style={{ display: 'block', marginBottom: '0.5rem' }}>Telefone*</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="text" 
                    id="telefone" 
                    name="telefone"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="identificacao" style={{ display: 'block', marginBottom: '0.5rem' }}>CPF/CNPJ*</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="text" 
                    id="identificacao" 
                    name="identificacao"
                    placeholder="000.000.000-00"
                    value={formData.identificacao}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -0.5rem' }}>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="especialidade" style={{ display: 'block', marginBottom: '0.5rem' }}>Especialidade*</label>
                  <select 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    id="especialidade" 
                    name="especialidade"
                    value={formData.especialidade}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Dermatologista">Dermatologista</option>
                    <option value="Esteticista">Esteticista</option>
                    <option value="Nutricionista">Nutricionista</option>
                    <option value="Fisioterapeuta">Fisioterapeuta</option>
                    <option value="Massoterapeuta">Massoterapeuta</option>
                  </select>
                </div>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>E-mail</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -0.5rem' }}>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="formacao" style={{ display: 'block', marginBottom: '0.5rem' }}>Formação</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="text" 
                    id="formacao" 
                    name="formacao"
                    placeholder="Curso - Instituição"
                    value={formData.formacao}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ flex: '0 0 50%', padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="dataContratacao" style={{ display: 'block', marginBottom: '0.5rem' }}>Data de Contratação</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="date" 
                    id="dataContratacao" 
                    name="dataContratacao"
                    value={formData.dataContratacao}
                    onChange={handleChange}
                  />
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

export default ProfissionalModal; 