import { useState } from 'react'
import './App.css'
import Login from './views/auth/login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignUp from './views/auth/register';
import Dashboard from './views/auth/Dashboard';
import Logout from './views/auth/logout';
import ForgotPassword from './views/auth/ForgotPassword';
import CreatePassword from './views/auth/CreatePassword';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/password-reset' element={<ForgotPassword/>}/>
        <Route path='/password-change' element={<CreatePassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
