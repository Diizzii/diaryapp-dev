import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import Header from '../components/Header'
import EditEntry from '../components/EditEntry'
import { AuthContext } from '../context/AuthContext'

const EditEntryPage = () => {
  const { uid } = useContext(AuthContext)

  if (!uid) return <Redirect to='/login' />

  return (
    <div>
      <Header />
      <div className='container'>
        <EditEntry />
      </div>
    </div>
  )
}

export default EditEntryPage
