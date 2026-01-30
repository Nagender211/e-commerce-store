import { useEffect, useState } from "react";
import api from "../utiles/api";
import { Link } from "react-router-dom";


type Products={
    _id: number,
    productname: string,
    productdiscription: string,
    productprice: number,
    productrating: number,
    productcategory: string,
    images: string[]
}



const AllProducts = () => {
    const BASE_URL = "http://localhost:8080";
    const [products,setProducts]=useState<Products[]>([])
    useEffect(()=>{
        const productsFected=async()=>{
            const res=await api.get('/all-product')
            console.log("all products",res.data.data)
            setProducts(res.data.data)
        };
        productsFected()
    },[])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Shop All Products</h2>
        {products.length===0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products available at the moment</p>
          </div>
        ): (
          <div className="flex flex-col gap-6">
            {products.map((item)=>(
              <Link key={item._id} to={`/product/${item._id}`}>
                <div className="flex flex-row max-md:flex-col gap-12 bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden h-full">
                  <div className="relative w-1/3 max-md:w-full h-48 bg-gray-200 overflow-hidden">
                    <img src={`${BASE_URL}${item.images[0]}`} alt={item.productname} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4 flex flex-col">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.productname}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-1">{item.productdiscription}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-1">{item.productcategory}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-blue-600">₹{item.productprice}</p>
                      <p className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">⭐ {item.productrating}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;