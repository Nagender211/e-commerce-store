import React, { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";

const EmailVerifycationOtp = ({setUser}: {setUser: React.Dispatch<any>}) => {
  const [emailotp,setEmail]=useState('');
  const coverIng=Number(emailotp)
  const handleEmailOtp=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }
  const handleOtp=async(e: React.FocusEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const res=await api.post("/confirm-email-otp",{emailotp: coverIng})
      console.log("otp verification",res)
      const userCookie=await CookieUser();
      setUser(userCookie)
    } catch (error) {
      console.log("error while generating the otp",error)
    }
  }
  return (
    <div>
      <form onSubmit={handleOtp}>
        <input placeholder="please enter your otp here" value={emailotp} onChange={handleEmailOtp} />
        <button type="submit">Submit Otp</button>
      </form>
    </div>
  );
};

export default EmailVerifycationOtp;