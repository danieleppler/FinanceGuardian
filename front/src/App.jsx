
import './App.css'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router'
import Register from './Pages/Register'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes >
    </>
  )
}

export default App
