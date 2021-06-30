import React, { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { fb } from '../service/firebase.js'

import { AuthContext } from '../context/AuthContext'

const EntryForm = ({ titleLabel, entryTextLabel, submitButtonLabel }) => {
  const { uid, setPostNo } = useContext(AuthContext)
  const history = useHistory()
  const titleInputRef = useRef()
  const entryInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()
    fb.firestore
      .collection('diaryEntries')
      .add({
        userId: uid,
        date: new Date().toLocaleDateString(),
        title: titleInputRef.current.value,
        entryText: entryInputRef.current.value,
      })
      .then(() => {
        console.log('Entry posted to firebase')
        setPostNo((postNo) => postNo++)
      })
      .then(() => history.push('/entries'))
      .catch((err) => console.error(err))
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='form-group'>
        <label htmlFor='title' className='mt-3 mb-2'>
          {titleLabel}
        </label>
        <input
          type='text'
          name='title'
          className='form-control'
          required
          ref={titleInputRef}
        />
        <label htmlFor='entryText' className='mt-3 mb-2'>
          {entryTextLabel}
        </label>
        <textarea
          type='text'
          name='entryText'
          className='form-control'
          required
          rows='7'
          ref={entryInputRef}
        />
      </div>
      <button
        type='submit'
        className='btn btn-primary mt-3'
        style={{ marginRight: '1%' }}
      >
        {submitButtonLabel}
      </button>
      <button
        className='btn btn-secondary mt-3'
        onClick={() => history.push('/entries')}
      >
        Cancel
      </button>
    </form>
  )
}

export default EntryForm
