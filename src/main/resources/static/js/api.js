/**
 * API.js - Funções para comunicação com o backend da Beauty Clinic Finance
 */

// URL base da API
const API_BASE_URL = '/api';

// Objeto que contém todas as funções da API
const api = {
    // ========== PROFISSIONAIS ==========
    profissionais: {
        listar: async function() {
            try {
                const response = await fetch(`${API_BASE_URL}/profissionais`);
                if (!response.ok) throw new Error('Erro ao buscar profissionais');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        obter: async function(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/profissionais/${id}`);
                if (!response.ok) throw new Error('Profissional não encontrado');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        criar: async function(profissional) {
            try {
                const response = await fetch(`${API_BASE_URL}/profissionais`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(profissional)
                });
                
                if (!response.ok) throw new Error('Erro ao criar profissional');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        atualizar: async function(id, profissional) {
            try {
                const response = await fetch(`${API_BASE_URL}/profissionais/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(profissional)
                });
                
                if (!response.ok) throw new Error('Erro ao atualizar profissional');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        excluir: async function(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/profissionais/${id}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) throw new Error('Erro ao excluir profissional');
                return true;
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        }
    },
    
    // ========== PROCEDIMENTOS ==========
    procedimentos: {
        listar: async function(somenteAtivos = true) {
            try {
                let url = `${API_BASE_URL}/procedimentos`;
                if (somenteAtivos) {
                    url += '?ativos=true';
                }
                
                const response = await fetch(url);
                if (!response.ok) throw new Error('Erro ao buscar procedimentos');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        obter: async function(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/procedimentos/${id}`);
                if (!response.ok) throw new Error('Procedimento não encontrado');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        criar: async function(procedimento) {
            try {
                const response = await fetch(`${API_BASE_URL}/procedimentos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(procedimento)
                });
                
                if (!response.ok) throw new Error('Erro ao criar procedimento');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        atualizar: async function(id, procedimento) {
            try {
                const response = await fetch(`${API_BASE_URL}/procedimentos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(procedimento)
                });
                
                if (!response.ok) throw new Error('Erro ao atualizar procedimento');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        excluir: async function(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/procedimentos/${id}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) throw new Error('Erro ao excluir procedimento');
                return true;
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        }
    },
    
    // ========== CLIENTES ==========
    clientes: {
        listar: async function(filtroNome = '') {
            try {
                let url = `${API_BASE_URL}/clientes`;
                if (filtroNome) {
                    url += `?nome=${encodeURIComponent(filtroNome)}`;
                }
                
                const response = await fetch(url);
                if (!response.ok) throw new Error('Erro ao buscar clientes');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        obter: async function(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/clientes/${id}`);
                if (!response.ok) throw new Error('Cliente não encontrado');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        criar: async function(cliente) {
            try {
                const response = await fetch(`${API_BASE_URL}/clientes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cliente)
                });
                
                if (!response.ok) throw new Error('Erro ao criar cliente');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        atualizar: async function(id, cliente) {
            try {
                const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cliente)
                });
                
                if (!response.ok) throw new Error('Erro ao atualizar cliente');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        excluir: async function(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) throw new Error('Erro ao excluir cliente');
                return true;
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        }
    },
    
    // ========== AGENDAMENTOS ==========
    agendamentos: {
        listar: async function(params = {}) {
            try {
                let url = `${API_BASE_URL}/agendamentos`;
                const queryParams = [];
                
                if (params.inicio) {
                    queryParams.push(`inicio=${params.inicio.toISOString()}`);
                }
                
                if (params.fim) {
                    queryParams.push(`fim=${params.fim.toISOString()}`);
                }
                
                if (params.profissionalId) {
                    queryParams.push(`profissionalId=${params.profissionalId}`);
                }
                
                if (queryParams.length > 0) {
                    url += `?${queryParams.join('&')}`;
                }
                
                const response = await fetch(url);
                if (!response.ok) throw new Error('Erro ao buscar agendamentos');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        hoje: async function() {
            try {
                const response = await fetch(`${API_BASE_URL}/agendamentos/hoje`);
                if (!response.ok) throw new Error('Erro ao buscar agendamentos de hoje');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        futuros: async function() {
            try {
                const response = await fetch(`${API_BASE_URL}/agendamentos/futuros`);
                if (!response.ok) throw new Error('Erro ao buscar agendamentos futuros');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        obter: async function(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/agendamentos/${id}`);
                if (!response.ok) throw new Error('Agendamento não encontrado');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        criar: async function(agendamento) {
            try {
                const response = await fetch(`${API_BASE_URL}/agendamentos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(agendamento)
                });
                
                if (!response.ok) throw new Error('Erro ao criar agendamento');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        atualizar: async function(id, agendamento) {
            try {
                const response = await fetch(`${API_BASE_URL}/agendamentos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(agendamento)
                });
                
                if (!response.ok) throw new Error('Erro ao atualizar agendamento');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        atualizarStatus: async function(id, status) {
            try {
                const response = await fetch(`${API_BASE_URL}/agendamentos/${id}/status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status })
                });
                
                if (!response.ok) throw new Error('Erro ao atualizar status do agendamento');
                return await response.json();
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        },
        
        excluir: async function(id) {
            try {
                const response = await fetch(`${API_BASE_URL}/agendamentos/${id}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) throw new Error('Erro ao excluir agendamento');
                return true;
            } catch (error) {
                console.error('Erro na API:', error);
                throw error;
            }
        }
    },
    
    // Função auxiliar para tratamento de erros
    handleError: function(error, mensagemPadrao = 'Ocorreu um erro na operação') {
        if (error instanceof Error) {
            alert(`${mensagemPadrao}: ${error.message}`);
        } else {
            alert(mensagemPadrao);
        }
        console.error(error);
    }
}; 