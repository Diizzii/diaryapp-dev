import React from 'react'

import Profile from '../components/Profile'
import Header from '../components/Header'

const ProfilePage = () => {
  return (
    <>
      <Header />
      <div className='custom-form with-header'>
        <Profile />
      </div>
    </>
  )
}

export default ProfilePage
