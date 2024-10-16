import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoList from './components/TodoList'
import Filters from './components/Filters'
import './styles/App.css'
import { useState } from 'react'

const queryClient = new QueryClient()

export default function App() {
  const [filters, setFilters] = useState({
    searchText: '',
    completed: false,
    selectedUsers: []
  })

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="header">
          <img src="/src/assets/aalto.png" alt="Aalto" className="logo" />
        </header>
        <main className="main-content">
          <Filters onFilterChange={handleFilterChange} />
          <TodoList filters={filters} />
        </main>
      </div>
    </QueryClientProvider>
  )
}
