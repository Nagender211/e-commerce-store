import { useEffect, useState } from "react";
import api from "../utiles/api";
import { Link, useNavigate } from "react-router-dom";
import { CookieUser } from "../utiles/authCookie";


type MyProdocuts={
    _id: string,
    productname: string,
    productdiscription: string,
    productprice: number,
    productrating: number,
    productcategory: string,
    images: string[]
}


const MyProducts = () => {
  const navigate=useNavigate()
  const BASE_URL = "http://localhost:8080";
    const [myproducts,setMyProducts]=useState<MyProdocuts[]>([])
    const handelDeleteProduct=async(id: string)=>{
      try {
        const res=await api.delete(`/delete-product/${id}`)
        if(res.status===200){
            navigate('/')
        }
      } catch (error) {
        console.log("error while deleting the product",error)
      }
    }
    useEffect(()=>{
        const fetchedData=async()=>{
            const res=await api.get('/my-products',{ withCredentials: true });
            console.log("my-products data",res.data.data)
            // const userCookie=await CookieUser();
            // setUser(userCookie)
            setMyProducts(res.data.data)
        }
        fetchedData()
    },[])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">My Products</h2>
        {myproducts.length ===0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-lg text-gray-600">You haven't created any products yet</p>
            <a href="/create-product" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Create Your First Product
            </a>
          </div>
        ): (
          <div className="flex flex-col gap-6">
            {myproducts.map((item)=>(
              <div key={item._id} className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden flex flex-row max-md:flex-col gap-12">
                <div className="relative w-1/2 max-md:w-full h-48 bg-gray-200 overflow-hidden">
                  <img src={`${BASE_URL}${item.images[0]}`} alt={item.productname} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.productname}</h4>
                  <p className="text-sm text-gray-600 mb-1 line-clamp-1">{item.productcategory}</p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold text-blue-600">₹{item.productprice}</p>
                    <p className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-medium">⭐ {item.productrating}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/edit-product/${item._id}`} className="flex-1">
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors">
                        Edit
                      </button>
                    </Link>
                    <button onClick={()=>handelDeleteProduct(item._id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;