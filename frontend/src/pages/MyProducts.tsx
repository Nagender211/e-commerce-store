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


const MyProducts = ({setUser}: {setUser: React.Dispatch<any>}) => {
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
            const userCookie=await CookieUser();
            setUser(userCookie)
            setMyProducts(res.data.data)
        }
        fetchedData()
    },[])
  return (
    <div>
      {myproducts.length ===0 ? (<p>No products are there</p>): (<div>
        {myproducts.map((item)=>(
          <div key={item._id}>
              <h4>{item.productname}</h4>
            <p>{item.productname}</p>
            <p>{item.productprice}</p>
            <p>{item.productrating}</p>
            <p>{item.productcategory}</p>
            <img src={`${BASE_URL}${item.images[0]}`} alt="first image" />
            <Link to={`/edit-product/${item._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={()=>handelDeleteProduct(item._id)}>Delete</button>
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default MyProducts;