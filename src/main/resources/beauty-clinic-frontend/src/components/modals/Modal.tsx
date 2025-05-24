import React, { useEffect, useRef } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  id,
  title,
  children,
  footer,
  size,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const bootstrapModalRef = useRef<BootstrapModal | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      bootstrapModalRef.current = new BootstrapModal(modalRef.current, {
        backdrop: 'static',
        keyboard: false
      });
    }

    return () => {
      bootstrapModalRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!bootstrapModalRef.current) return;

    if (isOpen) {
      bootstrapModalRef.current.show();
    } else {
      bootstrapModalRef.current.hide();
    }
  }, [isOpen]);

  // Manipulador de evento para o fechamento do modal
  useEffect(() => {
    const modalElement = modalRef.current;
    
    const handleHidden = () => {
      onClose();
    };

    modalElement?.addEventListener('hidden.bs.modal', handleHidden);
    
    return () => {
      modalElement?.removeEventListener('hidden.bs.modal', handleHidden);
    };
  }, [onClose]);

  const sizeClass = size ? `modal-${size}` : '';

  return (
    <div className="modal fade" id={id} tabIndex={-1} ref={modalRef} aria-labelledby={`${id}Label`} aria-hidden="true">
      <div className={`modal-dialog ${sizeClass}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {footer && (
            <div className="modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal; 