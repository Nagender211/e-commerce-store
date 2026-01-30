import { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";
import Spinner from 'react-bootstrap/Spinner';

const Register = ({setUser}: {setUser: React.Dispatch<any>}) => {
  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmpassword]=useState("")
  const [showpassword,setShowPassword]=useState(false)
  const [conformShow,setConformShow]=useState(false)
  const [loading,setLoading]=useState(false)


  const [error,setError]=useState("")

  const handleuser=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setUserName(e.target.value)
  }
  const handleEmail=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }
  const handlePassword=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }
  const handleConfromPassword=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setConfirmpassword(e.target.value)
  }
  const handleRegisterForm=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res=await api.post("/register",{username,email,password,confirmpassword});
    console.log(res);
    const userCokkie=await CookieUser();
    setUser(userCokkie)
    } catch (err: any) {
      const mess=err?.response?.data?.message || err?.message || "Some thing went wrong may be user is exit or pasword is inccrecot"
      setError(mess)
      
    }finally{
          setLoading(false)
        }
  }
  const handelpasswordshow=()=>{
    setShowPassword((prev)=>!prev)
  }
  const handelpasswordshowconfrom=()=>{
    setConformShow((prev)=>!prev)
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>
        <form onSubmit={handleRegisterForm} className="space-y-4">
          <div>
            <input placeholder="Username" value={username} onChange={handleuser} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <input placeholder="Email address" value={email} onChange={handleEmail} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <input placeholder="Password" value={password} type={showpassword ? 'text': 'password'} onChange={handlePassword} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <input placeholder="Confirm password" value={confirmpassword} type={conformShow ? 'text': 'password'} onChange={handleConfromPassword} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-4 text-sm">
            <button type="button" onClick={handelpasswordshow} className="text-blue-600 hover:text-blue-700 font-medium">{showpassword ? 'Hide' : 'Show'} password</button>
            <button type="button" onClick={handelpasswordshowconfrom} className="text-blue-600 hover:text-blue-700 font-medium">{conformShow ? 'Hide' : 'Show'} confirm</button>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Login</a></p>
        {error && <p className="font-semibold text-xl text-red-700 text-center pt-4">{error}</p>}
      </div>
       {loading && <Spinner />}
      
    </div>
  );
};

export default Register;