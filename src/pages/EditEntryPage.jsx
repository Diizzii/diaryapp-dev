import React from 'react'

import Header from '../components/Header'
import EditEntry from '../components/EditEntry'

const EditEntryPage = () => {
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
