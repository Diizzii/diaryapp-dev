import React from 'react'

import EditForm from './EditForm'

const EditEntry = () => {
  return (
    <>
      <h1 className='mb-4 mt-5'>Edit your entry!</h1>
      <EditForm
        titleLabel='What will be the new title?'
        entryTextLabel='What will be the new text?'
        submitButtonLabel='Update entry'
      />
    </>
  )
}

export default EditEntry
