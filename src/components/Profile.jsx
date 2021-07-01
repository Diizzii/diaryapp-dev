import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'

import { defaultValues, validationSchema } from '../service/profileSetup'
import { fb } from '../service/firebase'
import FormField from './FormField'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
  const history = useHistory()
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetFail, setResetFail] = useState(false)
  const { userName, setUserName } = useContext(AuthContext)

  useEffect(() => {
    const uName = localStorage.getItem('userName')
    setUserName(uName)
  }, [setUserName])

  const updatePassword = ({ password }, { setSubmitting, resetForm }) => {
    setResetSuccess(false)
    setResetFail(false)
    fb.auth.currentUser
      .updatePassword(password)
      .then(() => setResetSuccess(true))
      .catch(() => setResetFail(true))
      .finally(() => {
        resetForm({})
        setSubmitting(false)
      })
  }

  const cancelHandler = (event) => {
    event.preventDefault()
    history.push('/entries')
  }

  const deleteHandler = (event) => {
    event.preventDefault()
    history.push('/delete')
  }

  return (
    <div className='container'>
      <h1>Want to update your password, {userName}?</h1>
      <Formik
        onSubmit={updatePassword}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name='password' label='New password' type='password' />
            <FormField
              name='verifyPassword'
              label='Repeat new password'
              type='password'
            />
            <button
              type='submit'
              disabled={!isValid || isSubmitting}
              className='btn btn-primary mt-2'
              style={{ width: '99%' }}
            >
              Update Password
            </button>
            <button
              className='btn btn-secondary'
              onClick={cancelHandler}
              style={{ width: '99%' }}
            >
              Cancel
            </button>
            <button
              className='btn btn-danger'
              onClick={deleteHandler}
              style={{ width: '99%' }}
            >
              Delete Account
            </button>
          </Form>
        )}
      </Formik>

      {resetSuccess && <div>Password reset was successful!</div>}
      {resetFail && <div>Unsuccessful, please try again!</div>}
    </div>
  )
}

export default Profile
