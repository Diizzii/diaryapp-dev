import React from 'react'
import { useHistory } from 'react-router-dom'

const Footer = () => {
  const history = useHistory()

  return (
    <footer
      className='footer mt-auto py-3 bg-light fixed-bottom'
      style={{ background: 'white' }}
    >
      <div className='container' style={{ textAlign: 'center' }}>
        &copy; <a href='https://2307.link'>2307.link</a>{' '}
        <span style={{ display: 'inline-block', width: '5%' }}> </span>
        <span
          onClick={() => history.push('/feedback')}
          style={{ color: '#3c9e8c', cursor: 'pointer' }}
        >
          Feedback
        </span>
      </div>
    </footer>
  )
}

export default Footer
