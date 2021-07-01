import React from 'react'

import DeleteAccount from '../components/DeleteAccount'
import Header from '../components/Header'

const DeleteAccountPage = () => {
  return (
    <>
      <Header />
      <div className='custom-form'>
        <DeleteAccount />
      </div>
    </>
  )
}

export default DeleteAccountPage
