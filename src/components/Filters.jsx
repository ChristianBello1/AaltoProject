import { useState } from 'react';
import '../styles/Filters.css';
import searchIcon from '../assets/search.svg'; // Importa l'icona di ricerca
import arrowDownIcon from '../assets/arrowdown.svg'; // Importa l'icona a freccia

export default function Filters({ onFilterChange }) {
  const [searchText, setSearchText] = useState('');
  const [completed, setCompleted] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Stato per gestire il dropdown

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onFilterChange({ searchText, completed, selectedUsers });
    }
  };

  const resetFilters = () => {
    setSearchText('');
    setCompleted(false);
    setSelectedUsers([]);
    onFilterChange({ searchText: '', completed: false, selectedUsers: [] });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleUserSelect = (userId) => {
    const newSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter(user => user !== userId)
      : [...selectedUsers, userId];

    setSelectedUsers(newSelectedUsers);
    onFilterChange({ searchText, completed, selectedUsers: newSelectedUsers });
  };

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
            onKeyUp={handleSearch}
          />
          <button
            className="search-button"
            onClick={() => onFilterChange({ searchText, completed, selectedUsers })}
          >
            <img src={searchIcon} alt="Search" />
          </button>
        </div>

        <div className="completed-filter">
          <span>COMPLETED</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => {
                setCompleted(e.target.checked);
                onFilterChange({ searchText, completed: e.target.checked, selectedUsers });
              }}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="user-filter">
          <label>SELECT USER ID</label>
          <div className="user-dropdown">
            <div className="dropdown-input" onClick={toggleDropdown}>
              {selectedUsers.length > 0 ? `Selected: ${selectedUsers.join(', ')}` : 'Select User'}
              <button className="dropdown-button">
                <img src={arrowDownIcon} alt="Dropdown" />
              </button>
            </div>

            {dropdownOpen && (
              <div className="dropdown-options">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i + 1}
                    className={`dropdown-option ${selectedUsers.includes((i + 1).toString()) ? 'selected' : ''}`}
                    onClick={() => handleUserSelect((i + 1).toString())}
                  >
                    User {i + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button onClick={resetFilters} className="reset-button">
          Reset filters
        </button>
      </div>
    </div>
  );
}
