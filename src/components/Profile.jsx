import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'

import { defaultValues, validationSchema } from '../service/profileSetup'
import { fb } from '../service/firebase'
import FormField from './FormField'

const Profile = () => {
  const history = useHistory()
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetFail, setResetFail] = useState(false)

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
    history.push('/')
  }

  return (
    <div className='container'>
      <h1>Want to update your password?</h1>
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
              className='btn btn-primary'
            >
              Update Password
            </button>
            <button
              className='btn btn-secondary'
              onClick={cancelHandler}
              style={{ marginLeft: '2%' }}
            >
              Cancel
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
