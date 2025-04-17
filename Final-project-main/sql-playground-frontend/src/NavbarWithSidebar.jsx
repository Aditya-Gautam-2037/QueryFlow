import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavbarWithSidebar.css'; // Ensure this file contains styles for transitions

function NavbarWithSidebar({ children }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [selectedTableInfo, setSelectedTableInfo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const fetchTableList = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('❌ No token found in localStorage');
        return;
      }

      const res = await fetch('http://localhost:5000/api/tables', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setTableList(data.tables);
      } else {
        console.error('❌ Failed to fetch table list:', data.error);
      }
    } catch (err) {
      console.error('❌ Error fetching table list:', err);
    }
  };

  const fetchTableInfo = async (tableName) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/table-info/${tableName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setSelectedTableInfo(data.columns);
      else console.error('Failed to fetch table info:', data.error);
    } catch (err) {
      console.error('Error fetching table info:', err);
    }
  };

  const removeTable = async (tableName) => {
    try {
      if (!tableName) {
        alert('❌ No table selected to remove.');
        return;
      }

      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/table/${tableName}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setTableList((prev) => prev.filter((table) => table !== tableName));
        setSelectedTableInfo(null);
      } else {
        console.error('❌ Failed to remove table:', data.error);
        alert(`❌ Failed to remove table: ${data.error}`);
      }
    } catch (err) {
      console.error('❌ Error removing table:', err);
      alert('❌ Error removing table. Check console for details.');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    document.body.classList.toggle('dark-mode', savedTheme);
    fetchTableList();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark-mode', newMode);
  };

  return (
    <div className={`d-flex ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="bg-light border-end p-3 sidebar" style={{ width: '220px', minHeight: '100vh' }}>
          <h5 className="mb-4">SQL Playground</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button className="btn btn-outline-primary w-100" onClick={() => navigate('/dashboard')}>
                Dashboard
              </button>
            </li>
            {/* Dropdown for tables */}
            <li className="nav-item mb-2">
              <select
                className="form-select"
                onChange={(e) => fetchTableInfo(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a table
                </option>
                {tableList.map((table) => (
                  <option key={table} value={table}>
                    {table}
                  </option>
                ))}
              </select>
            </li>
          </ul>
          {/* Display selected table info */}
          {selectedTableInfo && (
            <div className="mt-3">
              <h6>Table Info:</h6>
              <ul>
                {selectedTableInfo.map((col) => (
                  <li key={col.Field}>
                    <strong>{col.Field}</strong>: {col.Type}
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-danger mt-2"
                onClick={() => removeTable(document.querySelector('.form-select').value)}
              >
                Remove Table
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-expand navbar-light bg-white border-bottom px-3 justify-content-between">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-sm btn-outline-secondary me-3"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar visibility
            >
              ☰
            </button>
            <span className={`navbar-brand ${darkMode ? 'text-white' : 'text-dark'}`}>
              Welcome, {JSON.parse(localStorage.getItem('user'))?.username || 'User'}
            </span>
          </div>
          <div>
            <button className="btn btn-sm btn-outline-secondary me-2" onClick={toggleDarkMode}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <button className="btn btn-sm btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}

export default NavbarWithSidebar;