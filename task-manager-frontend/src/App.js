import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEdit from './components/TaskEdit';

// Componente de Navegação
const Navbar = () => (
  <nav style={navbarStyle}>
    <ul style={navListStyle}>
      <li>
        <Link to="/" style={linkStyle}>
          Lista de Tarefas
        </Link>
      </li>
      <li>
        <Link to="/task/create" style={linkStyle}>
          Criar Nova Tarefa
        </Link>
      </li>
    </ul>
  </nav>
);

const navbarStyle = {
  padding: '10px',
  backgroundColor: '#007BFF',
  position: 'fixed',
  width: '100%',
  top: '0',
  left: '0',
  zIndex: '1000', // Garante que a barra fique por cima do conteúdo
};

const navListStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  margin: 0,
  padding: 0,
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
  fontWeight: 'bold',
  padding: '10px 15px',
  borderRadius: '5px',
  backgroundColor: '#0056b3', // Cor de fundo para links
  transition: 'background-color 0.3s ease', // Adiciona transição suave
};

const linkHoverStyle = {
  backgroundColor: '#003f7f', // Cor de fundo ao passar o mouse
};

// Definição do componente principal (App)
function App() {
  return (
    <Router>
      <div style={{ marginTop: '60px' }}> {/* Adiciona espaçamento para o conteúdo não ficar atrás da barra fixada */}
        <Navbar /> {/* Barra de navegação */}

        {/* Definindo as rotas */}
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/create" element={<TaskForm />} />
          <Route path="/task/edit/:id" element={<TaskEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
