import React, { useState } from "react";
import api from "../utiles/api";
import { Link } from "react-router-dom";
import { CookieUser } from "../utiles/authCookie";
import toast, {Toaster} from "react-hot-toast"

type HeaderProp={
  user: any,
  setUser: React.Dispatch<any>
}


const Header = ({user,setUser}: HeaderProp) => {
    const handleLogout=async()=>{
        try {
          const res=await api.post('/logout');
         console.log(res)
        const userCookie=await CookieUser()
        setUser(userCookie)
        toast.success("succfuly logout")
        } catch (error) {
          setInterval(()=>{
          toast.error("error while logout")
        },(3000))
        }
        
    }
  return (
      <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={'/'}>
          <h2 className="text-2xl font-bold text-gray-900">ShopHub</h2>
          </Link>
         <div>
          {user ? <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">Logout</button>:  <Link to={'/login'}><button className="border px-4 py-4 rounded-xl font-semibold cursor-pointer">Login/singup</button></Link>}
         <Link to={'/cart'}><button className="border px-4 py-4 rounded-xl font-semibold cursor-pointer">Cart</button></Link>
         </div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;