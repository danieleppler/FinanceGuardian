import React from 'react'
import { useAuth } from '../../Contexts/AuthContext'

const DashBoard = () => {
    const { user } = useAuth()

    return (
        <div>
            Hello {user?.username}
        </div>
    )
}

export default DashBoard
