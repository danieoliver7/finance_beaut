import React from 'react';
import Button from './Button';

interface ClientProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastVisit?: string;
  upcomingAppointment?: string;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ClientCard: React.FC<ClientProps> = ({
  id,
  name,
  email,
  phone,
  lastVisit,
  upcomingAppointment,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0 font-medium">{name}</h5>
          <span className="badge bg-info rounded-pill">ID: {id}</span>
        </div>
        
        <div className="card-text">
          <div className="mb-2">
            <i className="bi bi-envelope me-2"></i> {email}
          </div>
          <div className="mb-2">
            <i className="bi bi-telephone me-2"></i> {phone}
          </div>
          
          {lastVisit && (
            <div className="text-muted small mb-1">
              <span className="fw-semibold">Última visita:</span> {lastVisit}
            </div>
          )}
          
          {upcomingAppointment && (
            <div className="alert alert-primary py-1 px-2 small mt-2 mb-3">
              <span className="fw-semibold">Próximo agendamento:</span> {upcomingAppointment}
            </div>
          )}
        </div>
        
        <div className="d-flex gap-2 mt-3">
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onView(id)}
            className="flex-grow-0"
          >
            Visualizar
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => onEdit(id)}
            className="flex-grow-0"
          >
            Editar
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => onDelete(id)}
            className="flex-grow-0 ms-auto"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard; 