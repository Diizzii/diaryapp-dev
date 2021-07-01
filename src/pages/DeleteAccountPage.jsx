import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

import DeleteAccount from '../components/DeleteAccount'
import Header from '../components/Header'

const DeleteAccountPage = () => {
  const { uid } = useContext(AuthContext)
  if (!uid) return <Redirect to='/login' />

  return (
    <>
      <Header />
      <div className='custom-form'>
        <DeleteAccount />
      </div>
    </>
  )
}

export default DeleteAccountPage
