import React from 'react'
import { ErrorMessage, Field } from 'formik'

const FormField = ({ name, label, type }) => {
  return (
    <div className='form-group'>
      <label>
        {label}
        <Field name={name} type={type} className='form-control custom-field' />
        <ErrorMessage
          component='div'
          name={name}
          className='custom-field error'
        />
      </label>
    </div>
  )
}

export default FormField
