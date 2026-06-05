import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, getEmployee, updateEmployee } from '../api'
import EmployeeForm from '../components/EmployeeForm'

export default function AddEditEmployee(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [initial, setInitial] = useState(null)

  useEffect(()=>{
    if (id) {
      getEmployee(id).then(res=> setInitial(res.data)).catch(()=>{})
    } else {
      setInitial({ fullName:'', email:'', phoneNumber:'', department:'', salary:0, joiningDate: new Date().toISOString().slice(0,10) })
    }
  },[id])

  const onSubmit = async (values) => {
    try {
      if (id) await updateEmployee(id, values)
      else await createEmployee(values)
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  if (!initial) return <div>Loading...</div>
  return <EmployeeForm initial={initial} onSubmit={onSubmit} />
}
