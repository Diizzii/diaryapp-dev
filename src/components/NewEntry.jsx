import React, { useContext, useEffect } from 'react'

import EntryForm from './EntryForm'
import { AuthContext } from '../context/AuthContext'

const NewEntry = () => {
  const { userName, setUserName } = useContext(AuthContext)

  useEffect(() => {
    const uName = localStorage.getItem('userName')
    setUserName(uName)
  }, [setUserName])

  return (
    <>
      <h1 className='mb-4 mt-5'>Create a new entry, {userName}!</h1>
      <EntryForm
        titleLabel="How would you summarize today's entry?"
        entryTextLabel='What would you like to add to your diary?'
        submitButtonLabel='Add entry'
      />
    </>
  )
}

export default NewEntry
