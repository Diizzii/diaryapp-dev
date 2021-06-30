import React from 'react'
import { useHistory } from 'react-router-dom'

const NoEntries = () => {
  const history = useHistory()

  return (
    <div className='custom-form'>
      <h2>Wow, this is depressing!</h2>
      <h4>An empty page - care to add an entry or two?</h4>
      <button
        className='btn btn-profile'
        style={{ width: '100%' }}
        onClick={() => history.push('/create')}
      >
        Make your first entry
      </button>
    </div>
  )
}

export default NoEntries
