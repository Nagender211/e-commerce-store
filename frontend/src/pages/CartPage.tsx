import { useEffect, useState } from "react";

const CartPage = () => {
    const [products,setItem]=useState<any[]>([])
    const BASE_URL='http://localhost:8080'
    const [qnty,setQunty]=useState(1)
    
    const handleDelte=(id: any)=>{
        console.log(id)
        const filtered=products.filter((item)=>item._id!==id)
        setItem(filtered)
        
        localStorage.setItem("cart_item",JSON.stringify(filtered))
    }
    const handelDecre=(count: any)=>{
        
        setQunty(prev=>prev-count)
    }
     const handIncre=(count: any)=>{
        setQunty(prev=>prev+count)
    }
    useEffect(()=>{
        const getItem=localStorage.getItem("cart_item")
            if(getItem){
                setItem(JSON.parse(getItem))
            }
    },[])
  return (
    <div className="flex flex-col items-center justify-center">

        {products.length>0 ? (products.map((item)=>(
            <div key={item._id}>
                <div className="flex flex-row">
                    <img src={`${BASE_URL}${item.images[0]}`} alt="images" />
                    <h1>{item.productname}</h1>
                    <p>{item.productdiscription}</p>
                    <p>{item.productrating}</p>
                    <h1>{item.productprice}</h1>
                    <p>{item.productcategory}</p>
                    <p> qunty: {item.count ?? 1}</p>
                </div>
                <button onClick={()=>handleDelte(item._id)}>delete button</button>
                  <button className="border" onClick={()=>handelDecre(item.count)}>-</button>
        <button className="border" onClick={()=>handIncre(item.count)}>+</button>
            </div>
        ))): <p>NO prodocuts and not cart Items added yet</p>}

      



     
      <button>Checkout all the cart items</button>
    </div>
  );
};

export default CartPage;