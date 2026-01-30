import { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";
import { useNavigate } from "react-router-dom";

const OtpConform = ({setUser}: {setUser: React.Dispatch<any>}) => {
  const navigate=useNavigate()
  const [otp,setOtp]=useState("");
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const email=localStorage.getItem("rest_email")
  const converted=Number(otp)

  const handleOtp=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setOtp(e.target.value)
  }
  const handleForm=async(e: React.FormEvent<HTMLFormElement>)=>{
    setError("")
    setLoading(true)
    e.preventDefault()
    try {
      if (!email) {
      setError("Email missing. Please go back and enter your email again.");
      return;
    }
      const res=await api.post("/confirm-otp",{otp: converted,email})
      console.log("hello worng",res)
      console.log(otp)
      const userCookie=await CookieUser();
      setUser(userCookie)
      if(res.status===200){
          navigate('/reset-password')
      }
    } catch (error) {
      setError("Otp verification failed")
    }finally{
          setLoading(false)
        }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Enter OTP</h2>
        <p className="text-gray-600 text-center mb-6">Check your email for the verification code</p>
        <form onSubmit={handleForm} className="space-y-4">
          <input placeholder="Enter 6-digit OTP" value={otp} onChange={handleOtp} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors" disabled={loading}>
            Verify OTP
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4 font-medium">{error}</p>}
      </div>
       {loading && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <span className="loader"></span>
  </div>
)}
    </div>
  );
};

export default OtpConform;