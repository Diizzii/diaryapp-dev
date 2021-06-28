import React, { useState, useContext } from 'react'
import { Formik, Form } from 'formik'
import { useHistory } from 'react-router-dom'

import { defaultValues, validationSchema } from '../service/signupSetup'
import { fb } from '../service/firebase'
import FormField from './FormField'
import { AuthContext } from '../context/AuthContext'

const Signup = () => {
  const history = useHistory()
  const [serverError, setServerError] = useState('')
  const [isAuth, setIsAuth, uid, setUid] = useContext(AuthContext)

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res?.user?.uid) {
          fb.firestore
            .collection('diaryUsers')
            .doc(res.user.uid)
            .set({ userName })
          setIsAuth(true)
          setUid(res.user.uid)
          history.push('/')
        } else {
          setServerError('Something went terribly wrong. Please try again!')
        }
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError(
            'Looks like you already have an account with us. Sign in instead?'
          )
        } else {
          setServerError('Something went terribly wrong. Please try again!')
        }
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <div className='container'>
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
            <button
              disabled={isSubmitting || !isValid}
              type='submit'
              className='btn btn-primary'
            >
              Sign Up
            </button>
            <div>Already have an account?</div>

            <div>
              <span onClick={() => history.push('login')}>Log in instead!</span>
            </div>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className='error'>{serverError}</div>}
    </div>
  )
}

export default Signup
