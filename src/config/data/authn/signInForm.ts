type SignInForm = {
    labelEmail: string
    labelPassword: string
    errorEmailInvalid: string
    errorEmailRequired: string
    errorPasswordTooShort: string
    textButtonSend: string
    textButtonSending: string
}

const content: SignInForm = {
    labelEmail: 'Email',
    labelPassword: 'Password',
    errorEmailInvalid: 'Please use a valid email address',
    errorEmailRequired: 'The email address is required',
    errorPasswordTooShort: 'The password must contain at least six characters',
    textButtonSend: 'Sign in',
    textButtonSending: 'Sending',
}

export default content
