import React, { useState } from 'react'
import { mock_users } from '../mock_data'
import { axios } from 'axios'

const Login = () => {

    const server_url = process.env.VITE_SERVER_URL

    const [form_errors, set_form_errors] = useState({ username: '', password: '' })

    const handle_submit = async (e) => {

        e.preventDefault()

        const form = new FormData(e.target)

        const f_username = form.get('username')
        const f_password = form.get('password')

        if (!f_username) {
            set_form_errors({ password: '', username: `please fill username field` })
        }

        if (!f_password)
            set_form_errors({ password: 'please fill password field', username: `` })

        const response = await axios.post(`${server_url}/users/login`, { f_username, f_password })

        if (response.status === 200)
            console.log('login succeed')

        if (response.status === 401)
            if (response.data.err_type === 'password')
                set_form_errors({ password: response.data.err_msg, username: `` })
            else set_form_errors({ password: '', username: response.data.err_msg })
    }

    return (
        <>
            <form onSubmit={handle_submit}>
                UserName <input type='text' name='username'></input>
                {form_errors.username && <p className='form_error'>{form_errors.username}</p>}
                Password <input type='text' name='password'></input>
                {form_errors.password && <p className='form_error'>{form_errors.password}</p>}
                <button type='submit'>Login</button>
            </form>
            <p>Dont have an account ? <a href='/register'>register</a></p>
        </>

    )
}

export default Login
