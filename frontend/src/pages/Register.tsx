import { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";

const Register = ({setUser}: {setUser: React.Dispatch<any>}) => {
  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmpassword,setConfirmpassword]=useState("")
  const [showpassword,setShowPassword]=useState(false)
  const [conformShow,setConformShow]=useState(false)

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
    const res=await api.post("/register",{username,email,password,confirmpassword});
    console.log(res);
    const userCokkie=await CookieUser();
    setUser(userCokkie)
  }
  const handelpasswordshow=()=>{
    setShowPassword((prev)=>!prev)
  }
  const handelpasswordshowconfrom=()=>{
    setConformShow((prev)=>!prev)
  }
  return (
    <div>
      <form onSubmit={handleRegisterForm}>
        <input placeholder="please enter your username" value={username} onChange={handleuser} />
        <input placeholder="please enter your email" value={email} onChange={handleEmail} />
        <input placeholder="please enter your password" value={password} type={showpassword ? 'text': 'password'} onChange={handlePassword} />
        <input placeholder="please enter your confrom password" value={confirmpassword} type={conformShow ? 'text': 'password'} onChange={handleConfromPassword} />
        <button type={"submit"}>Register</button>
      </form>
      <button onClick={handelpasswordshow}>show password</button>
      <button onClick={handelpasswordshowconfrom}>Show password conform</button>
    </div>
  );
};

export default Register;