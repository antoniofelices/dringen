type RegisterUserForm = {
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
    labelUserLastName: string
    labelEmail: string
    labelPassword: string
    labelConfirmPassword: string
    labelSelectRole: string
    textButtonSend: string
    textButtonSending: string
}

const content: RegisterUserForm = {
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
        'It must contain at least one uppercase letter, one lowercase letter, and one number',
    errorPasswordNoMatch: 'Passwords do not match',
    labelUserName: 'Name',
    labelUserLastName: 'Last Name',
    labelEmail: 'Email',
    labelPassword: 'Password',
    labelConfirmPassword: 'Confirm Password',
    labelSelectRole: 'Select Role',
    textButtonSend: 'Register new user',
    textButtonSending: 'Sending',
}

export default content
