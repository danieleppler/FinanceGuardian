import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, set_user] = useState()

    useEffect(() => {
        const username = localStorage.getItem('username')
        if (username) {
            const token = localStorage.getItem('token')
            const id = localStorage.getItem('id')
            set_user({ username, token, id })
        }

    }, [])

    useEffect(() => {
        if (user) {
            const temp = localStorage.getItem('username')
            if (!temp) {
                const { username, token, id } = user
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
                localStorage.setItem('id', id)
            }
        }

    }, [user])


    return (
        <AuthContext.Provider value={{ user, set_user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext)
}
