import React, { useContext } from 'react'

import EditForm from './EditForm'
import { AuthContext } from '../context/AuthContext'

const EditEntry = () => {
  const { userName } = useContext(AuthContext)

  return (
    <>
      <h1 className='mb-4 mt-5'>Edit your entry, {userName}!</h1>
      <EditForm
        titleLabel='What will be the new title?'
        entryTextLabel='What will be the new text?'
        submitButtonLabel='Update entry'
      />
    </>
  )
}

export default EditEntry
