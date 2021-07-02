import React from 'react'

import Header from '../components/Header'
import InputEntry from '../components/NewEntry'
import Footer from '../components/Footer'

const NewEntryPage = () => {
  return (
    <div>
      <Header />
      <div className='container'>
        <InputEntry />
      </div>
      <Footer />
    </div>
  )
}

export default NewEntryPage
