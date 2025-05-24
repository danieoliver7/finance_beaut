import { useState, useEffect } from 'react';
import api from '../services/api';

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await api.get('/clientes');
                setClientes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar clientes');
                setLoading(false);
            }
        };

        fetchClientes();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Lista de Clientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.cpf}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClienteList; 