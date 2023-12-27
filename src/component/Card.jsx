import React, { useState,useRef, useEffect } from 'react'
import { useCart,useDispatchCart } from './ContextFile';
import './styleCard.css';
export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItems;
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");
  const handleAddToCart = async ()=>{
    let food = [];
    for (const item of data){
      if(item.id === foodItem._id){
        food=item;
        break;
      }
    }
    if(food.length !== 0){
            if(food.size === size){
              await dispatch({type:"UPDATE",id:foodItem._id,price:finalPrice,qty:qty});
              return
            }else if(food.size !== size){
              await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,
              price:finalPrice,qty:qty,size:size})
              return
            }
            return
           
    }
    await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,
    price:finalPrice,qty:qty,size:size})
 
  }
  let finalPrice = qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
        <div>
         <div class="card mt-3 mb-4" style={{"width": "17rem","maxHeight":"400px","boxShadow":"2px 4px 8px 0 rgba(0, 0, 0, 0.2), 2px 6px 20px 0 rgba(0, 0, 0, 0.19)","borderRadius":"10px"}}>
  <img src={foodItem.img} class="card-img-top " alt="..." style={{"width": "100%","maxHeight":"200px","height":"250px",
  "borderTopRightRadius":"10px","borderTopLeftRadius":"10px"}} />
  <div class="card-body">
    <h5 class="card-title">{foodItem.name}</h5>
    <div className="container  w-100">
    <select className="m-2 h-100 bg-light rounded" id="" onChange={(event)=>setQty(event.target.value)}>
        {Array.from(Array(6),(e,i)=>{
            return(
                <option key={i+1} value={i+1}>{i+1}</option>
          
                )
        })}
    </select>
    <select  className="m-2 h-100 bg-light rounded" ref={priceRef} onChange={(event)=>setSize(event.target.value)}>
        {priceOptions.map((data)=>{
            return <option key={data} value={data}>{data}</option>
        })}
    </select>
    <div className='d-inline'>₹{finalPrice}/-</div>
    </div>
    <hr />
    <button className='btn btn-success justifiy-center ms-2' onClick={handleAddToCart} >Add to Cart</button>
  </div>
</div>
</div>
  )
}
