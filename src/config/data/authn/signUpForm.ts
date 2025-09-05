type SignUpForm = {
    confirmPassword: string
    errorUserNameTooShort: string
    errorUserNameTooLong: string
    errorUserNameDisallowedCharacters: string
    errorUserLastNameTooShort: string
    errorUserLastNameTooLong: string
    errorUserLastNameDisallowedCharacters: string
    errorEmailInvalid: string
    errorEmailRequired: string
    errorPasswordTooShort: string
    errorPasswordMustContain: string
    errorPasswordNoMatch: string
    labelUserName: string
    labelEmail: string
    labelPassword: string
    labelConfirmPassword: string
    textButtonSend: string
    textButtonSending: string
}

const content: SignUpForm = {
    confirmPassword: 'Please confirm your password',
    errorUserNameTooShort: 'The username must be at least 3 characters long',
    errorUserNameTooLong: 'The username cannot be longer than 20 characters',
    errorUserNameDisallowedCharacters: 'Only letters, numbers, and underscores',
    errorUserLastNameTooShort:
        'The username must be at least 3 characters long',
    errorUserLastNameTooLong:
        'The username cannot be longer than 20 characters',
    errorUserLastNameDisallowedCharacters:
        'Only letters, numbers, and underscores',
    errorEmailInvalid: 'Please use a valid email address',
    errorEmailRequired: 'The email address is required',
    errorPasswordTooShort:
        'The password must contain at least eight characters',
    errorPasswordMustContain:
        'The password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
    errorPasswordNoMatch: 'Passwords do not match',
    labelUserName: 'Username',
    labelEmail: 'Email',
    labelPassword: 'Password',
    labelConfirmPassword: 'Confirm Password',
    textButtonSend: 'Sign Up',
    textButtonSending: 'Sending',
}

export default content
