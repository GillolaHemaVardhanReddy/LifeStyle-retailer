import React,{useEffect, useState} from 'react'
import "./ListProduct.css"
import axios from "axios";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async ()=>{
    const resp = await axios("https://lifestyle-server-n4sv.onrender.com/allproducts");
    setAllProducts(resp.data);
  }
  useEffect(()=>{
    fetchInfo();
  },[]);

  const removeproduct = async (e)=>{
    const resp = await axios.post("https://lifestyle-server-n4sv.onrender.com/removeproduct",{
      id: e.id,
      name: e.name
    },{
      'Content-Type': 'application/json'
    })
    console.log(resp)
    window.location.reload();
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr/>
        {allproducts.map((product,i)=>{
          return <div key={i}><div  className='listproduct-format-main listproduct-format'>
            <img className='listproduct-product-icon' src={product.image} alt=''/>
            <p>{product.name}</p>
            <p>Rs.{product.old_price}</p>
            <p>Rs.{product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={(e)=>removeproduct(product)} className='listproduct-remove-icon' src={cross_icon} alt=''/>
          </div>
          <hr/></div>
        })}
      </div>
    </div>
  )
}

export default ListProduct