import React from 'react'
import { useHistory } from 'react-router-dom'

const Entry = ({ date, title, entryText }) => {
  const history = useHistory()

  return (
    <div className='card mt-4'>
      <div className='card-body'>
        <h3 className='card-title'>{title}</h3>
        <div className='cards-subtitle text-muted mb-2'>
          {date.toLocaleDateString()}
        </div>
        <div className='card-text mb-2'>{entryText}</div>
        <button
          className='btn btn-secondary'
          style={{ marginRight: '1%' }}
          onClick={() => history.push('/edit')}
        >
          Edit
        </button>
        <button className='btn btn-info'>Delete</button>
      </div>
    </div>
  )
}

export default Entry
