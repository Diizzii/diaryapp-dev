import React from 'react'

import Reset from '../components/Reset'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ResetPage = () => {
  return (
    <>
      <Header />
      <div className='custom-form'>
        <Reset />
      </div>
      <Footer />
    </>
  )
}

export default ResetPage
