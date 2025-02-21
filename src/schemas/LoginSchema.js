import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter the email!'),
  password: yup
    .string()
    .min(6, ({ min }) => `Must have at least ${min} characters`)
    .required('Please enter the password!'),
});
