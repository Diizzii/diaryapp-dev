import { div } from 'prelude-ls'
import React, { useRef, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const Feedback = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const history = useHistory()
  const inputRef = useRef()
  const { uid } = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault()
    const feedback = inputRef.current.value
    if (feedback) {
      setFeedbackSubmitted(true)
      console.log(uid, feedback)
      inputRef.current.value = ''
    }
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
      <form action=''>
        <textarea
          name=''
          id=''
          cols='30'
          rows='10'
          className='form-control'
          ref={inputRef}
        ></textarea>
        <div className='feedback-bottom'>
          <button className='btn btn-primary' onClick={submitHandler}>
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
