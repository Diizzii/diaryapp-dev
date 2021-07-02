import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { defaultValues, validationSchema } from '../service/loginSetup'
import { fb } from '../service/firebase'
import FormField from './FormField'

const Login = () => {
  const history = useHistory()
  const [serverError, setServerError] = useState('')

  const pushSignup = () => history.push('/signup')
  const pushReset = () => history.push('/reset')

  const login = ({ email, password }, { setSubmitting }) => {
    if (localStorage.getItem('userName')) localStorage.removeItem('userName')

    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user) {
          setServerError("Your login didn't work. Please try again!")
        }
      })
      .then(() => setSubmitting(false))
      .then(() => history.push('/entries'))
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          setServerError("That didn't work. Sure you used the right password?")
        } else if (err.code === 'auth/user-not-found') {
          setServerError(
            'Sorry, that went wrong. Sure you have an account with us?'
          )
        } else {
          setServerError('That did not work. Try again please!')
        }
      })
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
              style={{ width: '99%' }}
            >
              Login
            </button>
            <div className='mt-3'>
              Don't have an account?{'  '}
              <span onClick={pushSignup}>Sign up here!</span>
            </div>
            <div className='mt-3'>
              Forgot your password?{'  '}
              <span onClick={pushReset}>Click here!</span>
            </div>
          </Form>
        )}
      </Formik>

      {!!serverError && (
        <div style={{ fontWeight: 'bold' }} className='mt-3'>
          {serverError}
        </div>
      )}
    </div>
  )
}

export default Login
