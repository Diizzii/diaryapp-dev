import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useHistory } from 'react-router-dom'

import { defaultValues, validationSchema } from '../service/signupSetup'

const Signup = () => {
  const history = useHistory()
  const [serverError, setServerError] = useState('')

  return <div></div>
}

export default Signup
