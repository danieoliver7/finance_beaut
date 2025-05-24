'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicionar lógica de autenticação aqui
    console.log('Tentativa de login com:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>Beauty Clinic</h2>
          <p className="mt-2 text-sm text-gray-600">Entre com suas credenciais para acessar o sistema</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-control"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-control"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="form-check">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="remember-me">
                Lembrar-me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-primary hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Entrar
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <Link href="/" className="text-primary hover:underline">
            <i className="bi bi-arrow-left me-2"></i> Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
} 