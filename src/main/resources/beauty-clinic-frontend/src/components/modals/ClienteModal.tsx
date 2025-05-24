'use client';

import { useState, useEffect } from 'react';

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  cliente?: {
    id?: number;
    nome: string;
    telefone: string;
    email: string;
    dataNascimento: string;
    observacoes: string;
  } | null;
}

const ClienteModal: React.FC<ClienteModalProps> = ({ isOpen, onClose, onSave, cliente }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    observacoes: ''
  });

  // Preenche o formulário com os dados do cliente se estiver editando
  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome || '',
        telefone: cliente.telefone || '',
        email: cliente.email || '',
        dataNascimento: cliente.dataNascimento || '',
        observacoes: cliente.observacoes || ''
      });
    } else {
      // Reset do formulário quando for um novo cliente
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        dataNascimento: '',
        observacoes: ''
      });
    }
  }, [cliente, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...formData,
        id: cliente?.id // Mantém o ID original se estiver editando
      });
    }
    onClose();
    alert('Cliente salvo com sucesso!');
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
            {cliente?.id ? 'Editar Cliente' : 'Novo Cliente'}
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
          <form id="formCliente" onSubmit={handleSubmit}>
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
                  <label htmlFor="dataNascimento" style={{ display: 'block', marginBottom: '0.5rem' }}>Data de Nascimento</label>
                  <input 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem'
                    }}
                    type="date" 
                    id="dataNascimento" 
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={{ margin: '0 -0.5rem' }}>
                <div style={{ padding: '0 0.5rem', marginBottom: '1rem' }}>
                  <label htmlFor="observacoes" style={{ display: 'block', marginBottom: '0.5rem' }}>Observações</label>
                  <textarea 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ced4da',
                      borderRadius: '0.25rem',
                      minHeight: '100px'
                    }}
                    id="observacoes"
                    name="observacoes"
                    rows={3}
                    value={formData.observacoes}
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

export default ClienteModal; 