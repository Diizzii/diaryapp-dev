import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { fb } from '../service/firebase.js'

import { AuthContext } from '../context/AuthContext'

const EditForm = ({ titleLabel, entryTextLabel, submitButtonLabel }) => {
  const { postId, setPostId } = useContext(AuthContext)
  const history = useHistory()
  const [currentTitle, setCurrentTitle] = useState()
  const [currentEntryText, setCurrentEntryText] = useState()
  const [date, setDate] = useState()
  const [userId, setUserId] = useState()
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    setIsLoading(true)

    if (!postId) {
      history.push('/entries')
      return
    }

    fb.firestore
      .collection('diaryEntries')
      .doc(postId)
      .get()
      .then((snapshot) => {
        const post = snapshot.data()
        setCurrentEntryText(post.entryText)
        setCurrentTitle(post.title)
        setDate(post.date)
        setUserId(post.userId)
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }, [postId, history])

  const submitHandler = (event) => {
    event.preventDefault()
    fb.firestore
      .collection('diaryEntries')
      .doc(postId)
      .update({
        date,
        userId,
        title: currentTitle,
        entryText: currentEntryText,
      })
      .then(() => {
        console.log('Entry was updated!')
        history.push('/entries')
      })
      .catch((err) => console.error(err))
      .finally(() => setPostId(''))
  }
  if (isLoading) return <div>Loading...</div>
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
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
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
          value={currentEntryText}
          onChange={(e) => setCurrentEntryText(e.target.value)}
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

export default EditForm
