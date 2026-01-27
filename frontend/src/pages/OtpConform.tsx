import { useState } from "react";
import api from "../utiles/api";

const OtpConform = () => {
  const [otp,setOtp]=useState("");
  const [error,setError]=useState("")
  const email=localStorage.getItem("rest_email")
  const converted=Number(otp)

  const handleOtp=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setOtp(e.target.value)
  }
  const handleForm=async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      if (!email) {
      setError("Email missing. Please go back and enter your email again.");
      return;
    }
      
      const res=await api.post("/confirm-otp",{otp: converted,email})
      console.log("hello worng",res)
      console.log(otp)
    } catch (error) {
      setError("Otp verification failed")
      
    }
  }
  return (
    <div>
      <form onSubmit={handleForm}>
        <input placeholder="please enter the otp" value={otp} onChange={handleOtp} />
        <button type="submit">Submit otp</button>
      </form>
      {error && <p style={{"color": "red"}}>{error}</p>}
    </div>
  );
};

export default OtpConform;