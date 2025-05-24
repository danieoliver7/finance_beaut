'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { FiEdit, FiPlus, FiSearch } from 'react-icons/fi';
import ClienteModal from '@/components/modals/ClienteModal';

// Estilo para manter o padrão de cores do sistema
const styles = {
  primaryColor: '#593043',
  textPrimary: { color: '#593043' },
  btnPrimary: { 
    backgroundColor: '#593043', 
    borderColor: '#593043',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none'
  }
}

export default function Clientes() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);

  // Dados de exemplo de clientes
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'Maria Silva', telefone: '(11) 98765-4321', ultimoAtendimento: '10/05/2025', email: 'maria.silva@email.com', dataNascimento: '1985-05-15', observacoes: 'Cliente preferencial' },
    { id: 2, nome: 'João Carlos', telefone: '(11) 91234-5678', ultimoAtendimento: '05/05/2025', email: 'joao.carlos@email.com', dataNascimento: '1990-10-20', observacoes: '' },
    { id: 3, nome: 'Ana Souza', telefone: '(11) 99876-5432', ultimoAtendimento: '01/05/2025', email: 'ana.souza@email.com', dataNascimento: '1978-02-28', observacoes: 'Alérgica a látex' },
    { id: 4, nome: 'Paulo Henrique', telefone: '(11) 94567-8901', ultimoAtendimento: '28/04/2025', email: 'paulo.h@email.com', dataNascimento: '1982-12-10', observacoes: '' },
    { id: 5, nome: 'Carla Mendes', telefone: '(11) 93456-7890', ultimoAtendimento: '25/04/2025', email: 'carla.m@email.com', dataNascimento: '1995-07-05', observacoes: '' },
    { id: 6, nome: 'Roberto Santos', telefone: '(11) 97890-1234', ultimoAtendimento: '20/04/2025', email: 'roberto.s@email.com', dataNascimento: '1975-03-18', observacoes: 'Hipertenso' },
    { id: 7, nome: 'Fernanda Lima', telefone: '(11) 92345-6789', ultimoAtendimento: '15/04/2025', email: 'fernanda.l@email.com', dataNascimento: '1988-09-22', observacoes: '' },
    { id: 8, nome: 'Bruno Costa', telefone: '(11) 98901-2345', ultimoAtendimento: '10/04/2025', email: 'bruno.costa@email.com', dataNascimento: '1992-11-30', observacoes: '' },
  ]);

  // Filtra clientes com base na busca
  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
    cliente.telefone.includes(search)
  );

  // Abre o modal para novo cliente
  const handleNovoCliente = () => {
    setSelectedCliente(null);
    setIsModalOpen(true);
  };

  // Abre o modal para editar cliente
  const handleEditarCliente = (cliente: any) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  // Salva o cliente (novo ou editado)
  const handleSaveCliente = (clienteData: any) => {
    if (clienteData.id) {
      // Editar cliente existente
      setClientes(prev => 
        prev.map(c => c.id === clienteData.id ? { ...clienteData, ultimoAtendimento: c.ultimoAtendimento } : c)
      );
    } else {
      // Adicionar novo cliente
      const novoId = Math.max(...clientes.map(c => c.id)) + 1;
      setClientes(prev => [
        ...prev, 
        { 
          ...clienteData, 
          id: novoId, 
          ultimoAtendimento: 'Sem atendimentos' 
        }
      ]);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
      />
      
      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="container-fluid px-4 py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0" style={styles.textPrimary}>Clientes</h1>
            <button 
              style={styles.btnPrimary}
              onClick={handleNovoCliente}
            >
              <FiPlus className="me-2" />
              Novo Cliente
            </button>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0" style={styles.textPrimary}>Todos os Clientes</h5>
              <div className="d-flex align-items-center">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <FiSearch size={18} />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light" 
                    placeholder="Buscar cliente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="ps-4">#</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Telefone</th>
                      <th scope="col">Último Atendimento</th>
                      <th scope="col" className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesFiltrados.map((cliente) => (
                      <tr key={cliente.id}>
                        <td className="ps-4">{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.telefone}</td>
                        <td>{cliente.ultimoAtendimento}</td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-outline-secondary" 
                            title="Editar cliente"
                            onClick={() => handleEditarCliente(cliente)}
                          >
                            <FiEdit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {clientesFiltrados.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          Nenhum cliente encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-white d-flex justify-content-between align-items-center py-3">
              <div>
                <span className="text-muted">Mostrando {clientesFiltrados.length} de {clientes.length} clientes</span>
              </div>
              <div>
                <nav aria-label="Paginação">
                  <ul className="pagination pagination-sm mb-0">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1}>Anterior</a>
                    </li>
                    <li className="page-item active" style={{ backgroundColor: styles.primaryColor }}>
                      <a className="page-link" href="#" style={{ borderColor: styles.primaryColor, backgroundColor: styles.primaryColor }}>1</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">Próximo</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Cadastro/Edição de Cliente */}
      <ClienteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCliente}
        cliente={selectedCliente}
      />
    </div>
  );
} 