import { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";
import { useNavigate } from "react-router-dom";

const Login = ({setUser}: { setUser: React.Dispatch<any> }) => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const navigate=useNavigate()
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
        // console.log()
        const res=await api.post('/login',{email,password})
        console.log("resposve from the login",res.data.data.email)
        const checkAuth=await CookieUser();
        setUser(checkAuth)
      

    }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmission}>
        <input placeholder="please enter your email here or username" value={email} onChange={handleEmail} />
        <input placeholder="please enter your password" value={password} type={showPassword ? 'text': 'password'} onChange={handlePass} />
        <button type="submit">Login</button>
      </form>
      <button onClick={handlepassBtn}>
          {showPassword ? 'Hide': 'Show'}
      </button>
    </div>
  );
};

export default Login;