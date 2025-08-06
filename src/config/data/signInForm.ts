type SignInForm = {
    labelEmail: string
    labelPassword: string
    errorPasswordTooShort: string
    errorEmailInvalid: string
    errorEmailRequired: string
    textButtonSend: string
    textButtonSending: string
}

const allData: SignInForm = {
    labelEmail: 'Email',
    labelPassword: 'Password',
    errorPasswordTooShort: 'The password must contain at least six characters',
    errorEmailInvalid: 'Please use a valid email address',
    errorEmailRequired: 'The email address is required',
    textButtonSend: 'Sign in',
    textButtonSending: 'Sending',
}

export default allData
