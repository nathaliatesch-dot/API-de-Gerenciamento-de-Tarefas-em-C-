import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link para navegação

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);  // Armazenar as tarefas filtradas
    const [statusFilter, setStatusFilter] = useState('Todos');  // Armazenar o filtro de status
    const [errorMessage, setErrorMessage] = useState(''); // Para armazenar a mensagem de erro
    const [loading, setLoading] = useState(true); // Para controlar o estado de carregamento

    // Função para buscar as tarefas
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://localhost:5001/api/tasks');
                if (!response.ok) {
                    throw new Error('Erro ao buscar tarefas');
                }
                const data = await response.json();
                setTasks(data);
                setFilteredTasks(data);  // Inicializa com todas as tarefas
            } catch (error) {
                setErrorMessage('Erro ao carregar tarefas: ' + error.message);
                console.error('Erro ao buscar tarefas:', error);
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };
        
        fetchTasks();
    }, []); // A função é executada uma vez após o componente ser montado

    // Função para excluir uma tarefa
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
            try {
                const response = await fetch(`https://localhost:5001/api/tasks/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setTasks(tasks.filter(task => task.id !== id));
                    setFilteredTasks(filteredTasks.filter(task => task.id !== id));  // Remove da lista filtrada
                    alert('Tarefa excluida com sucesso!');
                } else {
                    alert('Erro ao excluir tarefa!');
                }
            } catch (error) {
                alert('Erro ao excluir tarefa: ' + error.message);
                console.error('Erro ao excluir tarefa:', error);
            }
        }
    };

    // Função para filtrar as tarefas por status
    const handleFilterChange = (e) => {
        const selectedStatus = e.target.value;
        setStatusFilter(selectedStatus);

        if (selectedStatus === 'Todos') {
            setFilteredTasks(tasks);  // Exibe todas as tarefas
        } else {
            setFilteredTasks(tasks.filter(task => task.status === selectedStatus));  // Filtra por status
        }
    };

    if (loading) {
        return <p>Carregando tarefas...</p>; // Mensagem enquanto os dados são carregados
    }

    return (
        <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Lista de Tarefas</h2>

            {/* Filtro de Status */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="statusFilter">Filtrar por status: </label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={handleFilterChange}
                    style={{ padding: '5px', marginLeft: '10px' }}
                >
                    <option value="Todos">Todos</option>
                    <option value="Pendente">Pendente</option>
                    <option value="EmProgresso">Em Progresso</option>
                    <option value="Concluida">Concluida</option>
                </select>
            </div>

            <Link to="/task/create">
                <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Criar Nova Tarefa</button> {/* Botão para criação de tarefa */}
            </Link>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Exibe a mensagem de erro, se houver */}
            <ul>
                {filteredTasks.length === 0 ? (
                    <p>Nenhuma tarefa encontrada.</p> // Caso não haja tarefas
                ) : (
                    filteredTasks.map(task => (
                        <li key={task.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                            <strong>{task.title}</strong> - {task.status}
                            <button 
                                onClick={() => handleDelete(task.id)} 
                                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
                                Excluir
                            </button>
                            <Link 
                                to={`/task/edit/${task.id}`} 
                                style={{ marginLeft: '10px', textDecoration: 'none', color: 'blue' }}>
                                Editar
                            </Link> {/* Link para editar a tarefa */}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default TaskList;
