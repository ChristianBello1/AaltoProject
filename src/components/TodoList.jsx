import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import '../styles/TodoList.css';

export default function TodoList({ filters }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
      return data;
    },
  });

  const filteredTodos = todos?.filter(todo => {
    if (filters?.searchText && !todo.title.toLowerCase().includes(filters.searchText.toLowerCase())) {
      return false;
    }
    if (filters?.completed !== null && todo.completed !== filters.completed) {
      return false;
    }
    if (filters?.selectedUsers?.length && !filters.selectedUsers.includes(todo.userId.toString())) {
      return false;
    }
    return true;
  }) ?? [];

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const currentTodos = filteredTodos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    
    // Aggiungi frecce per la navigazione
    if (currentPage > 1) {
      buttons.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)} className="page-button">
          &lt;
        </button>
      );
    }

    // Logica per mostrare i numeri delle pagine
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-button ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Mostra la prima pagina
      buttons.push(
        <button key={1} onClick={() => handlePageChange(1)} className={`page-button ${currentPage === 1 ? 'active' : ''}`}>
          1
        </button>
      );

      // Mostra pagine centrali
      if (currentPage > 3) {
        buttons.push(<span key="dots1">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-button ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }

      // Mostra l'ultima pagina
      if (currentPage < totalPages - 2) {
        buttons.push(<span key="dots2">...</span>);
        buttons.push(
          <button key={totalPages} onClick={() => handlePageChange(totalPages)} className={`page-button ${currentPage === totalPages ? 'active' : ''}`}>
            {totalPages}
          </button>
        );
      }
    }

    // Aggiungi freccia per avanzare
    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)} className="page-button">
          &gt;
        </button>
      );
    }

    return buttons;
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="todo-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {currentTodos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td className="completed-cell">{todo.completed ? '✔️' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {renderPaginationButtons()}
      </div>
    </div>
  );
}
