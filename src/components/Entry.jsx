import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const Entry = ({ id, entryText, title, date, deleteHandler }) => {
  const [currentId] = useState(id)
  const history = useHistory()
  const { setPostId } = useContext(AuthContext)

  const deleteClickHandler = () => {
    deleteHandler(id)
  }

  const editClickHandler = () => {
    setPostId(currentId)
    history.push('/edit')
  }

  return (
    <div className='card mt-4'>
      <div className='card-body'>
        <h3 className='card-title'>{title}</h3>
        <div className='cards-subtitle text-muted mb-2'>{date}</div>
        <div className='card-text mb-2'>{entryText}</div>
        <button
          className='btn btn-secondary'
          style={{ marginRight: '1%' }}
          onClick={editClickHandler}
        >
          Edit
        </button>
        <button className='btn btn-info' onClick={deleteClickHandler}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Entry
