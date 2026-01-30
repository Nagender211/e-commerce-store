import { useEffect, useState } from "react";
import api from "../utiles/api";
import { Link, useNavigate, useParams } from "react-router-dom";

import toast, {Toaster} from "react-hot-toast";
import CartPage from "./CartPage";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type InnerProduct= {
    _id: number,
    productname: string,
    productdiscription: string,
    productprice: number,
    productrating: number,
    productcategory: string,
    images: string[]
}

type CartProduct= {
    _id: string,
    productname: string,
    productdiscription: string,
    productprice: number,
    productrating: number,
    productcategory: string,
    images: string[]
}

type RazorpayOrderData = {
    id: string;
    currency: string;
    amount: number;
}

type RazorpayResponse = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}




const InnerPageProduct = () => {
  const {id}=useParams();
      const [count,setCount]=useState(1)

  const BASE_URL = "http://localhost:8080";
  const navigate=useNavigate()
  const [error,setError]=useState("")
    const [innnerproduct,setInnnerproduct]=useState<InnerProduct | null>(null)
    const [cartpage,setICartPage]=useState<InnerProduct | null>(null)
    


const handleDecre=()=>{
        setCount((prev)=> prev>1 ?prev-1: 1)
        

    }
    const handleIncre=()=>{
        setCount((prev)=>prev+1)
    }
    if(count===-1){
        setCount(1)
    }

    const initiatePayment=(data: RazorpayOrderData)=>{
      const option={
        key: 'rzp_test_RviJBwb5udWxuF',
        currency: data.currency,
        order_id: data.id,
        handler: async(orders: RazorpayResponse)=>{
          try {
            const verify=await api.post('/verify',orders)
            if(verify.status===200){
              alert('Payment successful!')
            }
          } catch (error) {
            console.log('Payment verification failed:', error)
            toast.error("Payment verification failed")
          }
        }
      }
      const rp1=new window.Razorpay(option)
      rp1.open()
    }
    const handleBuyNow=async()=>{
      const totlaprice=innnerproduct ? innnerproduct.productprice*count : 0;
      if(!innnerproduct){
        alert('Product information not loaded')
        return
      }
      try {
        const orderUrl=await api.post('/oders',{amount: totlaprice})
        if(orderUrl.status===200){
          initiatePayment(orderUrl.data.data)
        }
      } catch (error) {
        console.log('Error creating order:', error)
        toast.error("faild to create the payment please login")
        // setError("Failid to create and ")
        
      }
    }
   const handleCart=(id: any)=>{
    console.log(id)
    // const getOldCart=l
    try {
    const getOldItem=localStorage.getItem("cart_item")
    const cartArr=getOldItem? JSON.parse(getOldItem) : [];

    const checkItemAdd=cartArr.find((item: any)=> item._id===id)

    if(checkItemAdd){
      toast.error("prodct is aledey added")
      return;
    }
    cartArr.push({...innnerproduct,count})
    localStorage.setItem("cart_item",JSON.stringify(cartArr))
    toast.success("Added succesfuly")
    // navigate('/cart')
    
    } catch (error) {
      toast.error("prodct is aledey added") 
    }
    
   }

    useEffect(()=>{
      const fectedInnerProduct=async()=>{
          const url=await api.get(`inner-detailes/${id}`)
          setInnnerproduct(url.data.data)
          console.log("url data",url.data.data)
      };
      fectedInnerProduct();
    },[id])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {innnerproduct && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-lg overflow-hidden h-96">
                <img src={`${BASE_URL}${innnerproduct.images[0]}`} alt={innnerproduct.productname} className="w-full h-full object-cover" />
              </div>
              {innnerproduct.images[1] && (
                <div className="w-full bg-gray-200 rounded-lg overflow-hidden h-32">
                  <img src={`${BASE_URL}${innnerproduct.images[1]}`} alt={innnerproduct.productname} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{innnerproduct.productname}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-semibold text-yellow-500">⭐</span>
                <span className="text-lg text-gray-700 font-semibold">{innnerproduct.productrating} out of 5</span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">{innnerproduct.productdiscription}</p>
              <div className="border-y border-gray-200 py-6 mb-6">
                <p className="text-5xl font-bold text-blue-600 mb-2">₹{innnerproduct.productprice}</p>
                <p className="text-lg text-gray-600">Free shipping on orders over ₹500</p>
              </div>
              <div className="flex gap-3 mb-6">
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3">
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold text-gray-900">{innnerproduct.productcategory}</p>
                </div>
              </div>
              {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors text-lg">
                Add to Cart
              </button> */}

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors text-lg" onClick={handleBuyNow} disabled={!innnerproduct}>
                Buy Now
              </button>
             <button className="border px-4 py-4 rounded-xl font-semibold cursor-pointer w-full" onClick={()=>handleCart(innnerproduct._id)}>Add To Cart</button>
              <div className="flex flex-row">
        <h1>Quantity:{count} </h1>
        <button onClick={handleDecre}>-</button>
        {/* <span>{count}</span> */}
        <button onClick={handleIncre}>+</button>
      </div>
              
            </div>
          </div>
        )}
        <Toaster />
        {/* <CartPage item={innnerproduct} */}
      </div>
    </div>
  );
};

export default InnerPageProduct;