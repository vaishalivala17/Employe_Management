import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchEmployees, deleteEmployee } from '../api'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchEmployees({ search, department, page, limit: 10, sortBy: 'joiningDate', sortOrder: 'desc' })
      setEmployees(res.data.data)
      setTotal(res.data.total)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [search, department, page])

  const onDelete = async (id) => {
    if (!confirm('Delete this employee?')) return
    try {
      await deleteEmployee(id)
      load()
    } catch (err) {
      alert('Delete failed')
    }
  }

  return (
    <div>
      <div className="controls">
        <input placeholder="Search name" value={search} onChange={e=>setSearch(e.target.value)} />
        <input placeholder="Department" value={department} onChange={e=>setDepartment(e.target.value)} />
        <button onClick={()=>{setPage(1); load()}}>Search</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Joining</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees.map(emp=> (
            <tr key={emp._id}>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.phoneNumber}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
              <td>
                <Link to={`/edit/${emp._id}`}>Edit</Link>
                {' | '}
                <button onClick={()=>onDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span>Page {page}</span>
        <button disabled={employees.length===0 || page*10>=total} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}
