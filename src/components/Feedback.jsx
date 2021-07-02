import React, { useRef, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import emailjs from 'emailjs-com'

import { AuthContext } from '../context/AuthContext'

const Feedback = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const history = useHistory()
  const inputRef = useRef()
  const { uid } = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault()
    setFeedbackSubmitted(true)
    emailjs
      .sendForm(
        'service_a97sbrq',
        'template_jf3h8av',
        event.target,
        'user_9G7YEZ2n421jix6dIzLiQ'
      )
      .then(() => (inputRef.current.value = ''))
      .catch((err) => console.error(err))
  }

  const cancelHandler = (event) => {
    event.preventDefault()
    history.push('/entries')
  }

  return (
    <div className='form-group feedback-form'>
      <h2>
        What would like to let us know, {localStorage.getItem('userName')}?
      </h2>

      <form onSubmit={submitHandler}>
        <input type='hidden' name='userId' value={uid} />
        <textarea
          name='feedback'
          cols='30'
          rows='10'
          className='form-control'
          ref={inputRef}
        ></textarea>
        <div className='feedback-bottom'>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
          <span> </span>
          <button className='btn btn-secondary' onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </form>
      {feedbackSubmitted && (
        <div className='feedback-submitted'>Thanks for your feedback!</div>
      )}
    </div>
  )
}

export default Feedback
