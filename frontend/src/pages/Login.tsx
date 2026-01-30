import { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
// import { Spinner } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

 


const Login = ({setUser}: { setUser: React.Dispatch<any> }) => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate()
    const [error,setError]=useState("")

    // const navigate=useNavigate()
    const handleEmail=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setEmail(e.target.value)
      console.log(e.target.value)
    }
    const handlePass=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setPassword(e.target.value)
      console.log(e.target.value)

    }
    const handlepassBtn=()=>{
      setShowPassword((prev)=>!prev)
    }
    const handleLoginSubmission=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("")
        setLoading(true)
        // console.log()
        try {
          const res=await api.post('/login',{email,password})
          console.log("resposve from the login",res.data.data.email);
          if(!res.data.data.email){
            setError("no email is found")
          }
          const checkAuth=await CookieUser();

          setUser(checkAuth)
          toast.success("succese fully login")
          
        } catch (err: any) {
            setError("username or password is incorrect" )
            toast.error("please enter your valid credentional")
          
        }finally{
          setLoading(false)
        }
      

    }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Login</h2>
        <form onSubmit={handleLoginSubmission} className="space-y-4">
          <div>
            <input placeholder="Email address" value={email} onChange={handleEmail} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <input placeholder="Password" value={password} type={showPassword ? 'text': 'password'} onChange={handlePass} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          
          <button type="button" onClick={handlepassBtn} className="text-sm text-blue-600 hover:text-blue-700">
            {showPassword ? 'Hide password' : 'Show password'}
          </button>
          <Link to={'/forgot-password'} className="text-blue-600 text-xl font-semibold">Forgot password</Link>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">Register</a></p>
        {error && <p className="text-red-500 text-lg text-center font-medium">{error}</p>}
        {loading && (
  <div className="loader">
    {/* <span className="loader"></span> */}
  </div>
)}
      </div>
      {/* <Toaster /> */}
      
    </div>
  );
};

export default Login;