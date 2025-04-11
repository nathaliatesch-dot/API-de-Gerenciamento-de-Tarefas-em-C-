import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TaskEdit() {
  const [task, setTask] = useState({ title: '', description: '', status: 'Pendente' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`https://localhost:5001/api/tasks/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar tarefa');
        }
        const data = await response.json();
        setTask(data);
        setLoading(false);
      } catch (err) {
        setError('Tarefa não encontrada ou erro na comunicação com o servidor');
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.description) {
      setError('Todos os campos são obrigatórios!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://localhost:5001/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        alert('Tarefa atualizada com sucesso!');
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(`Erro ao atualizar tarefa: ${errorData.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      setError('Erro na comunicação com o servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Editar Tarefa</h2>
      {error && (
        <p style={{ color: 'red', fontWeight: 'bold', backgroundColor: '#f8d7da', padding: '10px' }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title">
            Titulo:
            <input
              id="title"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="description">
            Descricao:
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="status">
            Status:
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            >
              <option value="Pendente">Pendente</option>
              <option value="EmProgresso">Em Progresso</option>
              <option value="Concluida">Concluida</option>
            </select>
          </label>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ padding: '10px 20px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskEdit;
