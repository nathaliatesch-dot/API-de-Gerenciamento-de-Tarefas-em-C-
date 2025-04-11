import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendente'); // Definido como 'Pendente' por padrão
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Hook para navegação programática

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação de campos vazios
    if (!title || !description) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    }

    // Verificação para não permitir status "Concluída"
    if (status === 'Concluída') {
      setErrorMessage('Nao é possivel criar uma tarefa com status "Concluida".');
      return;
    }

    setIsSubmitting(true); // Define que estamos enviando a tarefa

    const task = { title, description, status };

    try {
      console.log('Enviando tarefa:', task); // Log para depuração

      const response = await fetch('https://localhost:5001/api/tasks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json;charset=UTF-8',  // Garantindo codificação UTF-8
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        // Tarefa criada com sucesso
        console.log('Tarefa criada com sucesso!');
        setTitle(''); // Limpa o título
        setDescription(''); // Limpa a descrição
        setStatus('Pendente'); // Reseta o status
        setErrorMessage(''); // Limpa qualquer erro anterior
        navigate('/'); // Redireciona para a lista de tarefas
      } else {
        const errorData = await response.json();
        // Caso a criação da tarefa falhe
        console.error('Erro ao criar tarefa:', errorData);
        console.log('Detalhes do erro:', errorData);
        setErrorMessage(`Erro ao criar tarefa: ${errorData.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      // Caso haja um erro ao conectar com o servidor
      console.error('Erro ao criar tarefa:', error);
      setErrorMessage('Erro ao conectar com o servidor!');
    } finally {
      setIsSubmitting(false); // Finaliza o estado de submissão
    }
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Criar Nova Tarefa</h2>
      {errorMessage && (
        <p style={{ color: 'red', fontWeight: 'bold', backgroundColor: '#f8d7da', padding: '10px' }}>
          {errorMessage}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title">
            Titulo:
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '5px 0' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="status">
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pendente">Pendente</option>
              <option value="EmProgresso">Em Progresso</option>
              <option value="Concluida">Concluída</option>
            </select>
          </label>
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            {isSubmitting ? 'Enviando...' : 'Criar Tarefa'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
