import React, { useState, useContext } from 'react'
import { Formik, Form } from 'formik'
import { useHistory } from 'react-router-dom'
import Recaptcha from 'react-recaptcha'

import { defaultValues, validationSchema } from '../service/signupSetup'
import { fb } from '../service/firebase'
import FormField from './FormField'
import { AuthContext } from '../context/AuthContext'

const Signup = () => {
  const history = useHistory()
  const [serverError, setServerError] = useState('')
  const [siteKey] = useState(process.env.REACT_APP_RECAPTCHA_SITE_KEY)
  const [isVerified, setIsVerified] = useState(false)
  const { setUid } = useContext(AuthContext)

  const verifyCallback = function (res) {
    if (res) {
      setIsVerified(true)
    } else {
      setServerError(
        'Sorry, we cannot sign you up at this point. Please try again later!'
      )
    }
  }

  const signup = (
    { email, userName, password },
    { setSubmitting, resetForm }
  ) => {
    localStorage.setItem('userName', userName)

    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res?.user?.uid) {
          fb.firestore
            .collection('diaryUsers')
            .doc(res.user.uid)
            .set({ userName })
            .then(() => setUid(res.user.uid))
            .then(() => history.push('/entries'))
        } else {
          setServerError('Something went terribly wrong. Please try again!')
        }
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('Looks like you already have an account with us!')
        } else {
          setServerError('Something went terribly wrong. Please try again!')
        }
      })
      .finally(() => {
        resetForm({})
        setSubmitting(false)
      })
  }

  return (
    <div className='container centered'>
      <h1>Sign up</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name='userName' label='User Name' />
            <FormField name='email' label='Email' type='email' />
            <FormField name='password' label='Password' type='password' />
            <FormField
              type='password'
              name='verifyPassword'
              label='Verify Password'
            />
            <Recaptcha
              sitekey={siteKey}
              render='explicit'
              className='recaptcha'
              size='compact'
              verifyCallback={verifyCallback}
            />
            <button
              disabled={isSubmitting || !isValid || !isVerified}
              type='submit'
              className='btn btn-primary'
              style={{ marginTop: '3%' }}
            >
              Sign Up
            </button>

            <div>
              Already have an account?{' '}
              <span onClick={() => history.push('/login')}>Log in!</span>
            </div>
          </Form>
        )}
      </Formik>

      {!!serverError && (
        <div className='error' style={{ marginTop: '3%' }}>
          {serverError}
        </div>
      )}
    </div>
  )
}

export default Signup
