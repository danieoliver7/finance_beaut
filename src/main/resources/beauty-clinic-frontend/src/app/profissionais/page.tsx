'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { FiEdit, FiPlus, FiSearch } from 'react-icons/fi';
import ProfissionalModal from '@/components/modals/ProfissionalModal';

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

export default function Profissionais() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfissional, setSelectedProfissional] = useState<any>(null);

  // Dados de exemplo de profissionais
  const [profissionais, setProfissionais] = useState([
    { id: 1, nome: 'Dra. Ana Oliveira', telefone: '(11) 98765-4321', identificacao: '123.456.789-00', especialidade: 'Dermatologista', email: 'ana.oliveira@email.com', formacao: 'Medicina - USP', dataContratacao: '2020-03-15' },
    { id: 2, nome: 'Dr. Carlos Santos', telefone: '(11) 91234-5678', identificacao: '987.654.321-00', especialidade: 'Esteticista', email: 'carlos.santos@email.com', formacao: 'Estética Avançada - SENAC', dataContratacao: '2021-01-10' },
    { id: 3, nome: 'Dra. Márcia Lima', telefone: '(11) 99876-5432', identificacao: '111.222.333-44', especialidade: 'Nutricionista', email: 'marcia.lima@email.com', formacao: 'Nutrição - UFRJ', dataContratacao: '2019-07-05' },
    { id: 4, nome: 'Dra. Paula Mendes', telefone: '(11) 94567-8901', identificacao: '444.555.666-77', especialidade: 'Dermatologista', email: 'paula.mendes@email.com', formacao: 'Medicina - UFMG', dataContratacao: '2022-05-20' },
    { id: 5, nome: 'Dr. Roberto Alves', telefone: '(11) 93456-7890', identificacao: '12.345.678/0001-90', especialidade: 'Fisioterapeuta', email: 'roberto.alves@email.com', formacao: 'Fisioterapia - UNIFESP', dataContratacao: '2018-11-03' },
  ]);

  // Filtra profissionais com base na busca
  const profissionaisFiltrados = profissionais.filter(profissional => 
    profissional.nome.toLowerCase().includes(search.toLowerCase()) ||
    profissional.especialidade.toLowerCase().includes(search.toLowerCase()) ||
    profissional.identificacao.includes(search)
  );

  // Abre o modal para novo profissional
  const handleNovoProfissional = () => {
    setSelectedProfissional(null);
    setIsModalOpen(true);
  };

  // Abre o modal para editar profissional
  const handleEditarProfissional = (profissional: any) => {
    setSelectedProfissional(profissional);
    setIsModalOpen(true);
  };

  // Salva o profissional (novo ou editado)
  const handleSaveProfissional = (profissionalData: any) => {
    if (profissionalData.id) {
      // Editar profissional existente
      setProfissionais(prev => 
        prev.map(p => p.id === profissionalData.id ? { ...profissionalData } : p)
      );
    } else {
      // Adicionar novo profissional
      const novoId = Math.max(...profissionais.map(p => p.id)) + 1;
      setProfissionais(prev => [
        ...prev, 
        { 
          ...profissionalData, 
          id: novoId
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
            <h1 className="h3 mb-0" style={styles.textPrimary}>Profissionais</h1>
            <button 
              style={styles.btnPrimary}
              onClick={handleNovoProfissional}
            >
              <FiPlus className="me-2" />
              Novo Profissional
            </button>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0" style={styles.textPrimary}>Todos os Profissionais</h5>
              <div className="d-flex align-items-center">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <FiSearch size={18} />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light" 
                    placeholder="Buscar profissional..."
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
                      <th scope="col">Identificação</th>
                      <th scope="col">Especialidade</th>
                      <th scope="col" className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profissionaisFiltrados.map((profissional) => (
                      <tr key={profissional.id}>
                        <td className="ps-4">{profissional.id}</td>
                        <td>{profissional.nome}</td>
                        <td>{profissional.telefone}</td>
                        <td>{profissional.identificacao}</td>
                        <td>{profissional.especialidade}</td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-outline-secondary" 
                            title="Editar profissional"
                            onClick={() => handleEditarProfissional(profissional)}
                          >
                            <FiEdit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {profissionaisFiltrados.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          Nenhum profissional encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-white d-flex justify-content-between align-items-center py-3">
              <div>
                <span className="text-muted">Mostrando {profissionaisFiltrados.length} de {profissionais.length} profissionais</span>
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
                      <a className="page-link" href="#">Próximo</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Cadastro/Edição de Profissional */}
      <ProfissionalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProfissional}
        profissional={selectedProfissional}
      />
    </div>
  );
} 