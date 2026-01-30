import React, { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";
import { useNavigate } from "react-router-dom";

const EmailVerifycationOtp = () => {
  const navigate=useNavigate()
  const [emailotp,setEmail]=useState('');
  const coverIng=Number(emailotp)
  const handleEmailOtp=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }
  const handleOtp=async(e: React.FocusEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const res=await api.post("/confirm-email-otp",{emailotp: coverIng})
      console.log("otp verification",res)
      // const userCookie=await CookieUser();
      // setUser(userCookie)
      if(res.status===200){
        navigate('/my-products')
      }
    } catch (error) {
      console.log("error while generating the otp",error)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Enter OTP</h2>
        <p className="text-gray-600 text-center mb-6">Check your email for the verification code</p>
        <form onSubmit={handleOtp} className="space-y-4">
          <input placeholder="Enter 6-digit OTP" value={emailotp} onChange={handleEmailOtp} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerifycationOtp;