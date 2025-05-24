'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AgendamentoModal from './modals/AgendamentoModal';
import ProfissionalModal from './modals/ProfissionalModal';

// Definição dos itens do menu
const menuItems = [
  { id: 1, name: 'Dashboard', icon: 'speedometer2', path: '/dashboard' },
  { id: 2, name: 'Agendamentos', icon: 'calendar-event', path: '/agendamentos' },
  { id: 3, name: 'Agendamento Rápido', icon: 'plus-circle', path: '#', modalType: 'agendamento' },
  { id: 4, name: 'Clientes', icon: 'person', path: '/clientes' },
  { id: 5, name: 'Profissionais', icon: 'people', path: '/profissionais' },
  { id: 6, name: 'Novo Profissional', icon: 'person-plus', path: '#', modalType: 'profissional' },
  { id: 7, name: 'Atualizar Página Inicial', icon: 'house', path: '/dashboard/update-index' },
  { id: 8, name: 'Financeiro', icon: 'cash-coin', path: '/dashboard/financeiro' },
  { id: 9, name: 'Configurações', icon: 'gear', path: '/configuracoes' },
];

interface SidebarProps {
  userName?: string;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  userName = 'Admin', 
  userRole = 'Administrador' 
}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAgendamentoModalOpen, setIsAgendamentoModalOpen] = useState(false);
  const [isProfissionalModalOpen, setIsProfissionalModalOpen] = useState(false);
  
  // Verifica se a tela é menor que 768px para colapsar o menu em dispositivos móveis
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    
    handleResize(); // Configura o estado inicial
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openModal = (modalType: string) => {
    if (modalType === 'agendamento') {
      setIsAgendamentoModalOpen(true);
    } else if (modalType === 'profissional') {
      setIsProfissionalModalOpen(true);
    }
  };
  
  const closeAgendamentoModal = () => {
    setIsAgendamentoModalOpen(false);
  };
  
  const closeProfissionalModal = () => {
    setIsProfissionalModalOpen(false);
  };
  
  const handleSaveAgendamento = (data: any) => {
    console.log('Novo agendamento rápido:', data);
    // Aqui você adicionaria lógica para salvar o agendamento
  };

  const handleSaveProfissional = (data: any) => {
    console.log('Novo profissional:', data);
    // Aqui você adicionaria lógica para salvar o profissional
  };

  return (
    <>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Header/Profile section */}
        <div className="sidebar-header py-3">
          <div className="d-flex align-items-center">
            <div className="avatar">
              <i className="bi bi-person-circle text-primary"></i>
            </div>
            {!isCollapsed && (
              <div className="ms-2">
                <h6 className="m-0 fw-bold">Olá, {userName}</h6>
                <small className="text-white-50">{userRole}</small>
              </div>
            )}
          </div>
        </div>

        {/* Menu items */}
        <div className="sidebar-menu">
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                {item.modalType ? (
                  <a 
                    href="#" 
                    className={`nav-link ${pathname === item.path ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openModal(item.modalType);
                    }}
                  >
                    <i className={`bi bi-${item.icon}`}></i>
                    {!isCollapsed && <span className="ms-2">{item.name}</span>}
                  </a>
                ) : (
                  <Link 
                    href={item.path}
                    className={`nav-link ${pathname === item.path ? 'active' : ''}`}
                  >
                    <i className={`bi bi-${item.icon}`}></i>
                    {!isCollapsed && <span className="ms-2">{item.name}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Toggle button for mobile */}
        <button
          className="toggle-btn d-md-none"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className={`bi bi-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
        </button>
      </aside>
      
      {/* Modal de Agendamento Rápido */}
      <AgendamentoModal 
        isOpen={isAgendamentoModalOpen} 
        onClose={closeAgendamentoModal} 
        onSave={handleSaveAgendamento}
      />

      {/* Modal de Novo Profissional */}
      <ProfissionalModal 
        isOpen={isProfissionalModalOpen} 
        onClose={closeProfissionalModal} 
        onSave={handleSaveProfissional}
        profissional={null}
      />
    </>
  );
};

export default Sidebar; 