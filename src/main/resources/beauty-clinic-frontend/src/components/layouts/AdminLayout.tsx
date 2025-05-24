'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userRole?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children,
  userName = 'Admin',
  userRole = 'Administrador'
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Detectar tamanho da tela para responsividade
  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 768);
    };
    
    handleResize(); // Configura o estado inicial
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar 
        userName={userName}
        userRole={userRole}
      />
      
      <main 
        className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 