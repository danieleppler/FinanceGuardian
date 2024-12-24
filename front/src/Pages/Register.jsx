import React, { useState } from 'react'
import { mock_users } from '../mock_data'
import { check_password_validity, CreateUID } from '../utils'
import axios from 'axios'

const Register = () => {


    const server_url = process.env.VITE_SERVER_URL

    const [form_errors, set_form_errors] = useState({ username: '', password: '' })

    const handle_submit = async (e) => {
        e.preventDefault()

        const form_data = new FormData(e.target)

        const user_name = form_data.get('username')
        if (users.find((x) => x.user_name === user_name)) {
            set_form_errors({ password: '', username: 'username used' })
            return
        }


        const password = form_data.get('password')
        const c_password = form_data.get('confirm_password')



        if (!check_password_validity(password)) {
            set_form_errors({ password: 'password not valid', username: '', general: '' })
            return
        }


        if (c_password !== password) {
            set_form_errors({
                password: 'passwords not match', username: '', general: ''
            })
            return
        }



        const first_name = form_data.get(first_name)
        const last_name = form_data.get(last_name)
        const age = form_data.get(age)

        const response = await axios.post(`${server_url}/users/register`, { first_name, last_name, age, user_name, password })

        if (response.status === 200)
            console.log('registred successfully')

        else set_form_errors({ password: '', user_name: '', general: 'Something wont wrong, plaese try again later' })


    }

    return (
        <form onSubmit={handle_submit}>
            User Name <input name='username' type='text'></input>
            {form_errors.username && <p className='form_error'>{form_errors.username}</p>}
            First Name <input name='first_name' type='text'></input>
            Last Name <input name='last_name' type='text'></input>
            Age :<input name='age' type='number'></input>
            Password <input name='password' type='password'></input>
            {form_errors.password && <p className='form_error'>{form_errors.password}</p>}
            Confirm Password <input name='confirm_password' type='password'></input>
            <button type='submit'>Register</button>
            {form_errors.general && <p className='form_error'>{form_errors.general}</p>}
        </form>
    )
}

export default Register
