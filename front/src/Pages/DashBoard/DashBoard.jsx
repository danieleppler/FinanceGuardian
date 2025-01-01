import React from 'react'
import { useAuth } from '../../Contexts/AuthContext'
import OverView from './OverView'

const DashBoard = () => {
    const { user } = useAuth()

    return (
        <>
            <OverView />
        </>
    )
}

export default DashBoard
