import * as yup from 'yup';

const password= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/ ;
// At least one uppercase letter, one lowercase letter, one number, and at least 5 characters long

export const formSchema = yup.object().shape({
  userName: yup.string().min(5).required("Required"),
  
  email: yup.string().email("Please enter a valid email").required("Required"),
  
  password: yup
  .string().min(4).matches(password,{message:"please enter a strong password"})
  .required("Required"),
  
  confirmPassword: yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  .required("Required"),
  
  role: yup.string().required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  
  password: yup
  .string().min(5).matches(password,{message:"please enter a strong password"})
  .required("Required"),
});



export const otpSchema = yup.object().shape({
  otp: yup.array()
    .of(
      yup.string()
        .matches(/^[0-9]$/, 'Only digits are allowed')
        .required('Required')
    )
    .length(6, 'OTP must be 6 digits'),
});
