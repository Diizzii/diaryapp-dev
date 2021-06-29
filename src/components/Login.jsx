import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'

import { defaultValues, validationSchema } from '../service/loginSetup'
import { fb } from '../service/firebase'
import FormField from './FormField'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const history = useHistory()
  const [serverError, setServerError] = useState('')
  const { setUid } = useContext(AuthContext)

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user) {
          setServerError("Your login didn't work. Please try again!")
        } else {
          setUid(res.user.uid)
          history.push('/')
        }
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          setServerError("That didn't work. Sure you used the right password?")
        } else if (err.code === 'auth/user-not-found') {
          setServerError(
            'Sorry, that went wrong. Sure you have an account with us?'
          )
        } else {
          setServerError('Something went wrong. Try again please!')
        }
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name='email' label='Email' type='email' />
            <FormField name='password' label='Password' type='password' />
            <button
              type='submit'
              disabled={!isValid || isSubmitting}
              className='btn btn-primary'
            >
              Login
            </button>
            <div>Don't have an account?</div>

            <div>
              <span onClick={() => history.push('signup')}>
                Sign up instead!
              </span>
            </div>
          </Form>
        )}
      </Formik>

      {!!serverError && <div>{serverError}</div>}
    </div>
  )
}

export default Login
