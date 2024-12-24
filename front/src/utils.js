

export const check_password_validity = (password) =>{
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

    return passwordPattern.test(password);
}