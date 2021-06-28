import React, { useHistory, useContext, useRef } from 'react'
import { fb } from '../service/firebase.js'

import { AuthContext } from '../context/AuthContext'

const EntryForm = ({ titleLabel, entryTextLabel, submitButtonLabel }) => {
  const [uid, setUid] = useContext(AuthContext)
  const history = useHistory()
  const titleInputRef = useRef()
  const entryInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()
    fb.firestore
      .collection('diaryEntries')
      .add({
        date: new Date(),
        userId: uid,
        entryText: entryInputRef.current.value,
        title: titleInputRef.current.value,
      })
      .then(() => console.log('Entry added to firestore'))
      .catch((err) => console.error(err))
      .finally(() => history.push('/'))
  }

  return (
    <form>
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
        onSubmit={submitHandler}
      >
        {submitButtonLabel}
      </button>
      <button className='btn btn-secondary mt-3'>Cancel</button>
    </form>
  )
}

export default EntryForm
