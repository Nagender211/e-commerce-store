import { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";
import { useNavigate } from "react-router-dom";

const RestPassword = ({setUser}: {setUser: React.Dispatch<any>}) => {
  const navigate=useNavigate()
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false)
  const [confirmpassword,setConfirmpassword]=useState("");
  const [error,setError]=useState("")
  const handlepassword=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }
    const handleconfirmpassword=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setConfirmpassword(e.target.value)
  }
  const handleRestPass=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res=await api.post('/reset-password',{password,confirmpassword})
      console.log("respose form reste",res)
      const userCookie=await CookieUser();
      setUser(userCookie);
      if(res.status===201){
        navigate('/login')
      }
    } catch (error) {
      setError("Incorrect passowrd or passowrd is not mathecd")
    }
    finally{
          setLoading(false)
        }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Set New Password</h2>
        <form onSubmit={handleRestPass} className="space-y-4">
          <input placeholder="New password" value={password} onChange={handlepassword} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input placeholder="Confirm password" value={confirmpassword} onChange={handleconfirmpassword} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors" disabled={loading}>
            Reset Password
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4 font-medium">{error}</p>}
         {loading && (
  <div className="loader">
  </div>
)}
      </div>
     
    </div>
  );
};
export default RestPassword;