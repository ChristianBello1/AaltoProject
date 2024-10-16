import { useState } from 'react'
import '../styles/Filters.css'

export default function Filters({ onFilterChange }) {
  const [searchText, setSearchText] = useState('')
  const [completed, setCompleted] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onFilterChange({ searchText, completed, selectedUsers })
    }
  }

  const resetFilters = () => {
    setSearchText('')
    setCompleted(false)
    setSelectedUsers([])
    onFilterChange({ searchText: '', completed: false, selectedUsers: [] })
  }

  return (
    <div className="filters-panel">
      <h2 className="filters-title">FILTERS</h2>
      
      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>

        <div className="completed-filter">
          <span>COMPLETED</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => {
                setCompleted(e.target.checked)
                onFilterChange({ searchText, completed: e.target.checked, selectedUsers })
              }}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="user-filter">
          <label>SELECT USER ID</label>
          <select
            multiple
            className="user-select"
            value={selectedUsers}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value)
              setSelectedUsers(values)
              onFilterChange({ searchText, completed, selectedUsers: values })
            }}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                User {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button onClick={resetFilters} className="reset-button">
          Reset filters
        </button>
      </div>
    </div>
  )
}