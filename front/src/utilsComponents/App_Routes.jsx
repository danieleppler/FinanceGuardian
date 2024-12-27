import React from 'react'
import RouteGuard from './RouteGuard'
import { Route, Routes } from 'react-router'
import DashBoard from '../Pages/DashBoard/DashBoard'
import Login from '../Pages/Login'
import Register from '../Pages/Register'


const App_Routes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route element={<RouteGuard />}>
                    <Route path='/dashboard' element={<DashBoard />} />
                </Route>
            </Routes >
        </>
    )
}

export default App_Routes
