import React from 'react'

import DeleteAccount from '../components/DeleteAccount'
import Header from '../components/Header'
import Footer from '../components/Footer'

const DeleteAccountPage = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <div className='custom-form' style={{ maxWidth: '30%' }}>
          <DeleteAccount />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default DeleteAccountPage
