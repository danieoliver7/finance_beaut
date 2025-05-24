'use client';

import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import './update-index.css';

export default function UpdateIndex() {
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [formData, setFormData] = useState({
    title: 'REVELE SUA MELHOR VERSÃO NA SUA ATUAL IDADE',
    subtitle: 'Nossa clínica oferece os mais avançados tratamentos estéticos para que você alcance resultados excepcionais.',
    mainText: 'O tempo não para e, com ele, as mudanças na nossa pele se tornam mais evidentes. Mas isso não significa que você precisa aceitar o envelhecimento sem cuidados. Com o plano de tratamento personalizado, você pode gerenciar o envelhecimento de forma eficaz e natural, valorizando a sua beleza única.',
    contact: {
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100',
      phone: '(11) 99999-9999',
      email: 'contato@beautyclinic.com',
      hours: 'Segunda a Sexta: 9h às 18h\nSábado: 9h às 13h'
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      whatsapp: '',
      youtube: ''
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHeroImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica para enviar os dados para o backend
    console.log('Dados do formulário:', formData);
    console.log('Imagem:', heroImage);
  };

  return (
    <AdminLayout>
      <div className="update-index-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Atualizar Página Inicial</h1>
          <button className="btn btn-primary" onClick={handleSubmit}>
            <i className="bi bi-save me-2"></i>Salvar Alterações
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Seção Hero */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Seção Hero</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="heroImage" className="form-label">Imagem Principal</label>
                    <input
                      type="file"
                      className="form-control"
                      id="heroImage"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  {previewImage && (
                    <div className="mb-3">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título Principal</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subtitle" className="form-label">Subtítulo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subtitle"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mainText" className="form-label">Texto Principal</label>
                    <textarea
                      className="form-control"
                      id="mainText"
                      name="mainText"
                      rows={4}
                      value={formData.mainText}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Informações de Contato</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="contact.address" className="form-label">Endereço</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact.address"
                      name="contact.address"
                      value={formData.contact.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact.phone" className="form-label">Telefone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact.phone"
                      name="contact.phone"
                      value={formData.contact.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="contact.email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="contact.email"
                      name="contact.email"
                      value={formData.contact.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contact.hours" className="form-label">Horário de Funcionamento</label>
                    <textarea
                      className="form-control"
                      id="contact.hours"
                      name="contact.hours"
                      rows={2}
                      value={formData.contact.hours}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Redes Sociais</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="socialMedia.facebook" className="form-label">
                      <i className="bi bi-facebook me-2"></i>Facebook
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="socialMedia.facebook"
                      name="socialMedia.facebook"
                      value={formData.socialMedia.facebook}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/sua-pagina"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="socialMedia.instagram" className="form-label">
                      <i className="bi bi-instagram me-2"></i>Instagram
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="socialMedia.instagram"
                      name="socialMedia.instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleInputChange}
                      placeholder="https://instagram.com/seu-perfil"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="socialMedia.whatsapp" className="form-label">
                      <i className="bi bi-whatsapp me-2"></i>WhatsApp
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="socialMedia.whatsapp"
                      name="socialMedia.whatsapp"
                      value={formData.socialMedia.whatsapp}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="socialMedia.youtube" className="form-label">
                      <i className="bi bi-youtube me-2"></i>YouTube
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="socialMedia.youtube"
                      name="socialMedia.youtube"
                      value={formData.socialMedia.youtube}
                      onChange={handleInputChange}
                      placeholder="https://youtube.com/seu-canal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
} 