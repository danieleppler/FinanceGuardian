

export const check_password_validity = (password) =>{
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return passwordPattern.test(password);
}