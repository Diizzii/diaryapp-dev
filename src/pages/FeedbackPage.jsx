import React from 'react'

import Feedback from '../components/Feedback'
import Header from '../components/Header'
import Footer from '../components/Footer'

const FeedbackPage = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <Feedback />
      </div>
      <Footer />
    </>
  )
}

export default FeedbackPage
