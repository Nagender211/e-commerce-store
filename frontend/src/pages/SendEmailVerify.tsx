import { useEffect, useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";
import { useNavigate } from "react-router-dom";

const SendEmailVerify = () => {
  const [email,setEmail]=useState("")
  const navigate=useNavigate()
  const handleEmailVerification=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const res=await api.post("/verify-email",{email})
      console.log("send verification",res)
      // console.log()
      // const userCookie=await CookieUser();
      // setUser(userCookie)
      if(res.status===201){
        navigate('/email-conformtion-otp')
      }

    } catch (error) {
      console.log("error while seind verification email",error)
    }
  }
  useEffect(()=>{
    const feteced=async()=>{
      const user=await api.get('/me')
      console.log("user email",user.data.data)
      setEmail(user.data.data)
    };
    feteced()
  },[email])
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Verify Email</h2>
        <p className="text-gray-600 text-center mb-6">Complete email verification to access your account</p>
        <form onSubmit={handleEmailVerification} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input value={email} disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
            Send Verification Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmailVerify;