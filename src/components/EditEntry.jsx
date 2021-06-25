import React from 'react'

import EntryForm from './EntryForm'

const EditEntry = () => {
  return (
    <>
      <h1 className='mb-4 mt-5'>Edit your entry!</h1>
      <EntryForm
        titleLabel='What will be the new title?'
        entryTextLabel='What will be the new text?'
        submitButtonLabel='Update entry'
      />
    </>
  )
}

export default EditEntry
