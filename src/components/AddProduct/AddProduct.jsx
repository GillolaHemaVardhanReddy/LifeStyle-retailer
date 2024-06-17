import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from "../../assets/upload_area.svg"
import axios from "axios";
import { uploadFile } from '../../helper/uploadFile';

const AddProduct = () => {
  const [image,setImage] = useState(false);
  const [productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category: "women",
    new_price: "",
    old_price:""
  })

  const imageHandler = (e)=>{
      setImage(e.target.files[0]);
  }
  const changeHandler = (e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const addProduct = async ()=>{
    let product = productDetails;
    const imageUrl = await uploadFile(image)
    console.log(imageUrl.url)
      product.image = imageUrl.url;
      console.log(product);
      let resp = await axios.post("http://localhost:4000/addproduct",product,{
        Accept: 'application/json',
        'content-type': 'application/json'
      });
      if(resp.data.success){
        alert("product Added");
      }
      else{
        alert("failed");
      }
  }
  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here'/>
        </div>
        <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here'/>
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img src={image? URL.createObjectURL(image):upload_area} className='addproduct-tumbnail-img' alt='' />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{addProduct()}} className='addproduct-btn'>Add</button>
    </div>
  )
}

export default AddProduct