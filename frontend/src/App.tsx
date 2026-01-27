
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AllProducts from './pages/AllProducts'
import MyProducts from './pages/MyProducts'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import OtpConform from './pages/OtpConform'
import RestPassword from './pages/RestPassword'
import SendEmailVerify from './pages/SendEmailVerify'
import EmailVerifycationOtp from './pages/EmailVerifycationOtp'
import Header from './componets/Header'

function App() {

  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* login */}

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/fortgot-otp' element={<OtpConform />} />
        <Route path='/reset-password' element={<RestPassword />} />
        <Route path='/email-conformtion' element={<SendEmailVerify />} />
        <Route path='/email-conformtion-otp' element={<EmailVerifycationOtp />} />


        <Route path='/products' element={<AllProducts />} />
        <Route path='/my-products' element={<MyProducts />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
