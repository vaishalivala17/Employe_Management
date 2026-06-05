import React, { useState } from 'react'

export default function EmployeeForm({ initial, onSubmit }){
  const [form, setForm] = useState(() => ({ ...initial }))
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.fullName) e.fullName = 'Required'
    if (!form.email) e.email = 'Required'
    if (!form.phoneNumber) e.phoneNumber = 'Required'
    if (!form.department) e.department = 'Required'
    if (!form.salary || Number(form.salary) < 0) e.salary = 'Invalid'
    if (!form.joiningDate) e.joiningDate = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const payload = { ...form, salary: Number(form.salary) }
    onSubmit(payload)
  }

  return (
    <form onSubmit={submit} className="form">
      <label>Full Name :
        <input value={form.fullName} id='name' onChange={e=>setForm({...form, fullName: e.target.value})} autoComplete ='on'/>
        {errors.fullName && <small>{errors.fullName}</small>}
      </label>
      <label>Email :
        <input value={form.email} id='email' onChange={e=>setForm({...form, email: e.target.value})} autoComplete='on'/>
        {errors.email && <small>{errors.email}</small>}
      </label>
      <label>Phone Number :
        <input value={form.phoneNumber} id='phone' onChange={e=>setForm({...form, phoneNumber: e.target.value})} autoComplete='on'/>
        {errors.phoneNumber && <small>{errors.phoneNumber}</small>}
      </label>
      <label>Department :
        <input value={form.department} id='department' onChange={e=>setForm({...form, department: e.target.value})} />
        {errors.department && <small>{errors.department}</small>}
      </label>
      <label>Salary :
        <input type="number" value={form.salary} id='salary' onChange={e=>setForm({...form, salary: e.target.value})} />
        {errors.salary && <small>{errors.salary}</small>}
      </label>
      <label>Joining Date :
        <input type="date" value={form.joiningDate?.slice?.(0,10) || ''} id='joiningDate' onChange={e=>setForm({...form, joiningDate: e.target.value})} />
        {errors.joiningDate && <small>{errors.joiningDate}</small>}
      </label>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}
