import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'

import { defaultValues, validationSchema } from '../service/resetSetup'
import { fb } from '../service/firebase'
import FormField from './FormField'

const Reset = () => {
  const history = useHistory()
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [emailFail, setEmailFail] = useState(false)

  const resetHandler = ({ email }, { setSubmitting, resetForm }) => {
    fb.auth
      .sendPasswordResetEmail(email)
      .then(() => setEmailSuccess(true))
      .catch(() => setEmailFail(true))
      .finally(() => {
        setSubmitting(false)
        resetForm({})
      })
  }

  return (
    <div className='container'>
      <h1>Reset your password</h1>
      <Formik
        onSubmit={resetHandler}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name='email' label='Email' type='email' />
            <button
              type='submit'
              disabled={!isValid || isSubmitting}
              className='btn btn-primary'
            >
              Get reset email
            </button>
            <div>
              Log in instead?{'  '}
              <span onClick={() => history.push('/login')}>Click here!</span>
            </div>
            <div>
              Sign up instead?{'  '}
              <span onClick={() => history.push('/signup')}>Click here!</span>
            </div>
          </Form>
        )}
      </Formik>
      {emailSuccess && <div>Reset email has been sent!</div>}
      {emailFail && (
        <div>
          Sorry, please try again and make sure that your email is valid!
        </div>
      )}
    </div>
  )
}

export default Reset
