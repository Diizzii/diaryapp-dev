import React from 'react'

import EntryForm from './EntryForm'

const NewEntry = () => {
  return (
    <>
      <h1 className='mb-4 mt-5'>Create a new entry!</h1>
      <EntryForm
        titleLabel="How would you summarize today's entry?"
        entryTextLabel='What would you like to add to your diary?'
        submitButtonLabel='Add entry'
      />
    </>
  )
}

export default NewEntry
