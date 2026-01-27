import { useEffect, useState } from "react";
import api from "../utiles/api";

const SendEmailVerify = ({setUser}: {setUser: React.Dispatch<any>}) => {
  const [email,setEmail]=useState("")
  const handleEmailVerification=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const res=await api.post("/verify-email",{email})
      console.log("send verification",res)
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
    <div>
      <form onSubmit={handleEmailVerification}>
        <input  value={email} disabled />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SendEmailVerify;