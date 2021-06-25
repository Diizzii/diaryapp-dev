import * as Yup from 'yup'

export const defaultValues = {
  email: '',
  userName: '',
  password: '',
  verifyPassword: '',
}

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('This email address seems to be invalid!')
    .required('Please enter an email address!'),
  userName: Yup.string()
    .required('Please enter a user name!')
    .matches(/^\S*$/, 'Sorry, no spaces allowed!')
    .min(3, 'User name must be at least 3 characters!'),
  password: Yup.string()
    .required('Please enter a password!')
    .min(8, 'Password must be at least 8 characters!'),
  verifyPassword: Yup.string()
    .required('Please repeat your password!')
    .oneOf([Yup.ref('password'), null], "Your passwords don't match!"),
})
