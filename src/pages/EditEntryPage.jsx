import React from 'react'

import Header from '../components/Header'
import EditEntry from '../components/EditEntry'
import Footer from '../components/Footer'

const EditEntryPage = () => {
  return (
    <div>
      <Header />
      <div className='container'>
        <EditEntry />
      </div>
      <Footer />
    </div>
  )
}

export default EditEntryPage
