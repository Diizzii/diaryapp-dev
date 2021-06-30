import * as Yup from 'yup'

export const defaultValues = {
  email: '',
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email address!'),
})
