import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import Login from '../components/Login'
import logo from '../images/diaryApp.png'

const LoginPage = () => {
  const { uid } = useContext(AuthContext)
  if (uid) return <Redirect to='/entries' />

  return (
    <div className='custom-form' style={{ marginTop: '12%' }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src={logo}
          alt='diaryApp'
          style={{ width: '40px', heigth: '40px' }}
        />
      </div>

      <Login />
    </div>
  )
}

export default LoginPage
