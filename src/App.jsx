import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoList from './components/TodoList'
import Filters from './components/Filters'
import Footer from './components/Footer'
import './styles/App.css'
import { useState } from 'react'
import aaltoLogo from '/src/assets/aalto.png'; // Importa l'immagine direttamente

const queryClient = new QueryClient()

export default function App() {
  const [filters, setFilters] = useState({
    searchText: '',
    completed: null, // Cambia a 'null' per indicare nessun filtro all'inizio
    selectedUsers: []
  })

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="header">
          <img src={aaltoLogo} alt="Aalto" className="logo" /> {/* Usa l'immagine importata */}
        </header>
        <main className="main-content">
          <Filters onFilterChange={handleFilterChange} />
          <TodoList filters={filters} />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}

