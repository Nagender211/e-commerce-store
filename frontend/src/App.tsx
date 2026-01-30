
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
import { PublicRoute } from './protected/PublicRoute'
import { useEffect, useState } from 'react'
import { CookieUser } from './utiles/authCookie'
import { PrivateRoute } from './protected/PrivateRoute'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import InnerPageProduct from './pages/InnerPageProduct'
import { Toaster } from "react-hot-toast";


function App() {
  const [user,setUser]=useState<any>(null)
  useEffect(()=>{
    const userCookie=async()=>{
      const usercokkie=await CookieUser();
      setUser(usercokkie ?? null)
    };
    userCookie();
  },[])

  return (
    <>
    <Toaster reverseOrder={false} />
    <BrowserRouter>
    <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* login */}

        <Route path='/login' element={<PublicRoute user={user} ><Login setUser={setUser} /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute user={user} ><Register setUser={setUser} /></PublicRoute>} />
        <Route path='/forgot-password' element={<PublicRoute user={user} ><ForgotPassword setUser={setUser} /></PublicRoute>} />
        <Route path='/fortgot-otp' element={<PublicRoute user={user} ><OtpConform setUser={setUser} /></PublicRoute>} />
        <Route path='/reset-password' element={<PublicRoute user={user} ><RestPassword setUser={setUser} /></PublicRoute>} />
        {/* <Route path='/email-conformtion' element={<PrivateRoute user={user} ><SendEmailVerify setUser={setUser} /></PrivateRoute>} />
        <Route path='/email-conformtion-otp' element={<PrivateRoute user={user} ><EmailVerifycationOtp setUser={setUser} /></PrivateRoute>} />

        <Route path='/create-product' element={<PrivateRoute user={user} ><CreateProduct setUser={setUser} /></PrivateRoute>} />
        
        <Route path='/edit-product/:id' element={<PrivateRoute user={user} ><EditProduct setUser={setUser} /></PrivateRoute>} />

        <Route path='/my-products' element={<PrivateRoute user={user} ><MyProducts setUser={setUser} /></PrivateRoute>} /> */}



        {/* <Route path='/register' element={<Register />} /> */}
        {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
        {/* <Route path='/fortgot-otp' element={<OtpConform />} /> */}
        {/* <Route path='/reset-password' element={<RestPassword />} /> */}
        <Route path='/email-conformtion' element={<SendEmailVerify />} />
        <Route path='/email-conformtion-otp' element={<EmailVerifycationOtp />} />

        <Route path='/create-product' element={<CreateProduct />}/>
        <Route path='/edit-product/:id' element={<EditProduct />}/>
        <Route path='/products' element={<AllProducts />} />
        <Route path='/my-products' element={<MyProducts />} />
        <Route path='/product/:id' element={<InnerPageProduct />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
