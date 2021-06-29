import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import Header from '../components/Header'
import InputEntry from '../components/NewEntry'
import { AuthContext } from '../context/AuthContext'

const NewEntryPage = () => {
  const { uid } = useContext(AuthContext)

  if (!uid) return <Redirect to='/' />

  return (
    <div>
      <Header />
      <div className='container'>
        <InputEntry />
      </div>
    </div>
  )
}

export default NewEntryPage
