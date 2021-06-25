import React from 'react'
import Header from '../components/Header'
import InputEntry from '../components/NewEntry'

const NewEntryPage = () => {
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
