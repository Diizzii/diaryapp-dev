import React from 'react'
import * as Yup from 'yup'

const defaultValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email address!'),
  password: Yup.string().required('Please enter your password!'),
})

const Login = () => {
  return <div></div>
}

export default Login
