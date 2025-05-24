'use client';

import AdminLayout from '@/components/layouts/AdminLayout';
import './dashboard.css';

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="dashboard-container w-100">
        <div className="d-flex justify-content-between align-items-center mt-4 mb-4 px-4">
          <h1>Dashboard</h1>
          <div className="d-flex">
            <div className="period-selector me-2">
              <button className="btn btn-light">
                <i className="bi bi-calendar3"></i> Período: Este mês
              </button>
            </div>
            <button className="btn btn-primary export-btn">
              <i className="bi bi-download me-1"></i> Exportar
            </button>
          </div>
        </div>
        
        <div className="row mx-2">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="icon-circle mb-2">
                    <i className="bi bi-calendar-check"></i>
                  </div>
                  <h6 className="card-subtitle text-muted">Total de Agendamentos</h6>
                  <h2 className="card-value">48</h2>
                  <div className="growth-indicator positive">
                    <i className="bi bi-arrow-up"></i> +12% este mês
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="icon-circle mb-2">
                    <i className="bi bi-people"></i>
                  </div>
                  <h6 className="card-subtitle text-muted">Novos Clientes</h6>
                  <h2 className="card-value">12</h2>
                  <div className="growth-indicator positive">
                    <i className="bi bi-arrow-up"></i> +8% este mês
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="icon-circle mb-2">
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                  <h6 className="card-subtitle text-muted">Receita</h6>
                  <h2 className="card-value">R$ 8.250</h2>
                  <div className="growth-indicator positive">
                    <i className="bi bi-arrow-up"></i> +15% este mês
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card dashboard-card h-100">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="icon-circle mb-2">
                    <i className="bi bi-clock"></i>
                  </div>
                  <h6 className="card-subtitle text-muted">Taxa de Ocupação</h6>
                  <h2 className="card-value">78%</h2>
                  <div className="growth-indicator negative">
                    <i className="bi bi-arrow-down"></i> -2% este mês
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-2 mt-4">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Receita Mensal</h5>
                <div className="dropdown">
                  <button className="btn btn-light btn-sm dropdown-toggle" type="button" id="yearDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Este Ano
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="yearDropdown">
                    <li><a className="dropdown-item" href="#">Este Ano</a></li>
                    <li><a className="dropdown-item" href="#">Ano Anterior</a></li>
                  </ul>
                </div>
              </div>
              <div className="card-body chart-container">
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '300px' }}>
                  <i className="bi bi-bar-chart-line" style={{ fontSize: '3rem', color: '#ddd' }}></i>
                  <p className="text-center mt-3">Aqui será implementado o gráfico de receita mensal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 