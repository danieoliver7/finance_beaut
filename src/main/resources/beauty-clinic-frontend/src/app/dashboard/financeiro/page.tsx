'use client';

import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import './financeiro.css';

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: 'receita' | 'despesa';
  category: string;
  value: number;
  status: 'pago' | 'pendente';
}

export default function Financeiro() {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: '2024-03-15',
      description: 'Limpeza de Pele - Maria Silva',
      type: 'receita',
      category: 'Procedimentos',
      value: 250.00,
      status: 'pago'
    },
    {
      id: 2,
      date: '2024-03-14',
      description: 'Aluguel',
      type: 'despesa',
      category: 'Custos Fixos',
      value: 3500.00,
      status: 'pago'
    },
    {
      id: 3,
      date: '2024-03-13',
      description: 'Massagem Modeladora - João Santos',
      type: 'receita',
      category: 'Procedimentos',
      value: 180.00,
      status: 'pendente'
    }
  ]);

  const totalReceitas = transactions
    .filter(t => t.type === 'receita')
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalDespesas = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, curr) => acc + curr.value, 0);

  const saldo = totalReceitas - totalDespesas;

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    // Aqui você implementaria a lógica para filtrar as transações pelo período
  };

  return (
    <AdminLayout>
      <div className="financeiro-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Financeiro</h1>
          <div className="d-flex gap-2">
            <div className="period-selector">
              <select 
                className="form-select"
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value)}
              >
                <option value="hoje">Hoje</option>
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mês</option>
                <option value="ano">Este Ano</option>
              </select>
            </div>
            <button className="btn btn-primary">
              <i className="bi bi-plus-lg me-2"></i>Nova Transação
            </button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card summary-card">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Total de Receitas</h6>
                <h3 className="card-title text-success">R$ {totalReceitas.toFixed(2)}</h3>
                <div className="trend-indicator positive">
                  <i className="bi bi-arrow-up"></i> 12% em relação ao mês anterior
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card summary-card">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Total de Despesas</h6>
                <h3 className="card-title text-danger">R$ {totalDespesas.toFixed(2)}</h3>
                <div className="trend-indicator negative">
                  <i className="bi bi-arrow-down"></i> 5% em relação ao mês anterior
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card summary-card">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Saldo</h6>
                <h3 className={`card-title ${saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                  R$ {saldo.toFixed(2)}
                </h3>
                <div className="trend-indicator">
                  <i className="bi bi-dash"></i> Saldo atual
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Transações */}
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Últimas Transações</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-filter me-2"></i>Filtrar
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-download me-2"></i>Exportar
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.category}</td>
                      <td>
                        <span className={`badge ${transaction.type === 'receita' ? 'bg-success' : 'bg-danger'}`}>
                          {transaction.type === 'receita' ? 'Receita' : 'Despesa'}
                        </span>
                      </td>
                      <td>R$ {transaction.value.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${transaction.status === 'pago' ? 'bg-success' : 'bg-warning'}`}>
                          {transaction.status === 'pago' ? 'Pago' : 'Pendente'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Receitas vs Despesas</h5>
              </div>
              <div className="card-body">
                <div className="chart-placeholder">
                  <p className="text-center text-muted">Gráfico de Receitas vs Despesas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Categorias de Despesas</h5>
              </div>
              <div className="card-body">
                <div className="chart-placeholder">
                  <p className="text-center text-muted">Gráfico de Categorias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 