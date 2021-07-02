import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import Signup from '../components/Signup'
import { AuthContext } from '../context/AuthContext'
import logo from '../images/diaryApp.png'

const SignupPage = () => {
  const { uid } = useContext(AuthContext)
  if (uid) return <Redirect to='/entries' />

  return (
    <div className='custom-form'>
      <div style={{ textAlign: 'center' }}>
        <img
          src={logo}
          alt='diaryApp'
          style={{ width: '40px', heigth: '40px' }}
        />
      </div>
      <Signup />
    </div>
  )
}

export default SignupPage
