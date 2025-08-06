type SignUpForm = {
    labelUserName: string
    labelConfirmPassword: string
    labelEmail: string
    labelPassword: string
    errorPasswordTooShort: string
    errorEmailRepeat: string
    textButtonSend: string
    textButtonSending: string
}
const allData: SignUpForm = {
    labelUserName: 'Name',
    labelEmail: 'Email',
    labelPassword: 'Password',
    labelConfirmPassword: 'Confirm Password',
    errorPasswordTooShort: 'The password must contain at least six characters',
    errorEmailRepeat: 'The email was registered',
    textButtonSend: 'Sign in',
    textButtonSending: 'Sending',
}

export default allData
