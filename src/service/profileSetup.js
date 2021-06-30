import * as Yup from 'yup'

export const defaultValues = {
  password: '',
  verifyPassword: '',
}

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter a password!')
    .min(8, 'Password must be at least 8 characters!'),
  verifyPassword: Yup.string()
    .required('Please repeat your password!')
    .oneOf([Yup.ref('password'), null], "Your passwords don't match!"),
})
