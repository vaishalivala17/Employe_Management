import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import EmployeeList from './pages/EmployeeList'
import AddEditEmployee from './pages/AddEditEmployee'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Employee Management</h1>
        <nav>
          <Link to="/">List</Link>
          <Link to="/add">Add Employee</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEditEmployee />} />
          <Route path="/edit/:id" element={<AddEditEmployee />} />
        </Routes>
      </main>
    </div>
  )
}
