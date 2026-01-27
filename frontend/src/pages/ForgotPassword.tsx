import { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";


const ForgotPassword = ({setUser}: {setUser: React.Dispatch<any>}) => {
  const [email,setEmail]=useState("")
  const handleEmail=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }
  const handleForgot=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const res=await api.post('/forgot-password',{email})
    localStorage.setItem("rest_email",email)
    console.log(res)
    const userCookie=await CookieUser();
    setUser(userCookie)
  }
  return (
    <div>
      <form onSubmit={handleForgot}>
        <input placeholder="please enter your name" value={email} onChange={handleEmail} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;