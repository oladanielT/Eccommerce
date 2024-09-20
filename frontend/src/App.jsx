import { useState } from 'react'
import './App.css'
import Login from './views/auth/login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignUp from './views/auth/register';
import Dashboard from './views/auth/Dashboard';
import Logout from './views/auth/logout';
import ForgotPassword from './views/auth/ForgotPassword';
import CreatePassword from './views/auth/CreatePassword';
import StoreHeader from './views/base/StoreHeader';
import StoreFooter from './views/base/StoreFooter';


function App() {

  return (
    <BrowserRouter>
    <StoreHeader/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/password-reset' element={<ForgotPassword/>}/>
        <Route path='/password-change' element={<CreatePassword/>}/>
      </Routes>
    <StoreFooter/>
    </BrowserRouter>
  )
}

export default App
