import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import Signup from '../components/Signup'
import { AuthContext } from '../context/AuthContext'

const SignupPage = () => {
  const { uid } = useContext(AuthContext)
  if (uid) return <Redirect to='/entries' />

  return (
    <div className='custom-form' style={{ marginTop: '6%' }}>
      <Signup />
    </div>
  )
}

export default SignupPage
