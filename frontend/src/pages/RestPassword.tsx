import { useState } from "react";
import api from "../utiles/api";
import { CookieUser } from "../utiles/authCookie";

const RestPassword = ({setUser}: {setUser: React.Dispatch<any>}) => {
  const [password,setPassword]=useState("");
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
    try {
      const res=await api.post('/reset-password',{password,confirmpassword})
      console.log("respose form reste",res)
      const userCookie=await CookieUser();
      setUser(userCookie);
    } catch (error) {
      setError("Password rest is incomplete or not done")
    }
  }
  return (
    <div>
      <form onSubmit={handleRestPass}>
        <input placeholder="please enter the your password" value={password} onChange={handlepassword} />
        <input placeholder="please enter the conform password" value={confirmpassword} onChange={handleconfirmpassword} />
        <button type="submit">Submit the Password</button>
      </form>
      {error && <p style={{"color": "red"}}>{error}</p>}
    </div>
  );
};
export default RestPassword;