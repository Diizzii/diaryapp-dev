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
        &copy; diaryApp{' '}
        <span style={{ display: 'inline-block', width: '5%' }}> </span>
        <span
          onClick={() => history.push('/feedback')}
          style={{ color: '#5c81f2', cursor: 'pointer' }}
        >
          Feedback
        </span>
      </div>
    </footer>
  )
}

export default Footer
