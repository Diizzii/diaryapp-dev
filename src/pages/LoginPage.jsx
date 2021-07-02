import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import Login from '../components/Login'

const LoginPage = () => {
  const { uid } = useContext(AuthContext)
  if (uid) return <Redirect to='/entries' />

  return (
    <div className='custom-form' style={{ marginTop: '12%' }}>
      <Login />
    </div>
  )
}

export default LoginPage
