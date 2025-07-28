const getUserData = (formData: FormData) => ({
    confirmpassword: formData.get('confirmpassword') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
})

export { getUserData }
