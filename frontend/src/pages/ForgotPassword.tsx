import { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';


const ForgotPassword = ({setUser}: {setUser: React.Dispatch<any>}) => {
  const [email,setEmail]=useState("")
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const navigate=useNavigate()
  const handleEmail=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }
  const handleForgot=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res=await api.post('/forgot-password',{email})
    localStorage.setItem("rest_email",email)
    console.log(res)
    const userCookie=await CookieUser();
    setUser(userCookie)
    if(res.status===200){
        navigate('/fortgot-otp')
    }
    } catch (error) {
      setError("please enter correct email id" )
    }
    finally{
          setLoading(false)
        }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Reset Password</h2>
        <p className="text-gray-600 text-center mb-6">Enter your email to receive a password reset code</p>
        <form onSubmit={handleForgot} className="space-y-4">
          <input placeholder="Email address" value={email} onChange={handleEmail} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors" disabled={loading}>
            Send Reset Code
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4"><a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Back to Login</a></p>
         {error && <p className="text-red-500 text-lg text-center font-medium">{error}</p>}
         {loading && (
  <div className="loader">
  </div>
)}
      </div>
      
    </div>
  );
};

export default ForgotPassword;