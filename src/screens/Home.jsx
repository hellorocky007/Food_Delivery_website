import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer';
import Card from '../component/Card';
import { useEffect, useState } from 'react'

export default function Home() {
const [Search,setSearch]=useState("");
const [foodCategory,setfoodCategory]=useState([]);
const [foodItem,setfoodItem] = useState([]);
const loadData = async()=>{
  let response = await fetch("http://localhost:3000/api/foodData",{
    method: 'POST',
           headers:{
               'Content-Type':'application/json'
           }
  });
  response = await response.json();
  setfoodItem(response[0]);
  setfoodCategory(response[1]);
  // console.log(response[0],response[1]);
}
useEffect(()=>{
  loadData();
},[])



  return (
    <div>
        <Navbar/>
        <div><div id="carouselExampleIndicators" className="carousel slide " data-bs-ride="carousel" style={{objectFit:"contain !important"}} >
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="https://source.unsplash.com/random/2000x900?burger" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..."/>
        <div className="carousel-caption d-none d-md-block">
        <div className="d-flex justify-content-center" >
        <input className="form-control me-2"  type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(event)=>{setSearch(event.target.value)}} />
        {/* <button className="btn btn-outline-primary text-white rounded-4 " style={{borderColor:"#ffff"}} type="submit">Search</button> */}
      </div>
      </div>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/2000x900?pizza" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..."/>
        <div className="carousel-caption d-none d-md-block">
        <div className="d-flex justify-content-center">
        <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(event)=>{setSearch(event.target.value)}} />
        {/* <button className="btn btn-outline-primary text-white" style={{borderColor:"#ffff"}} type="submit">Search</button> */}
      </div>
      </div>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/2000x900?chicken-biryani" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="..."/>
        <div className="carousel-caption d-none d-md-block">
        <div className="d-flex justify-content-center">
        <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(event)=>{setSearch(event.target.value)}} />
        {/* <button className="btn btn-outline-primary text-white " style={{borderColor:"#ffff"}} type="submit">Search</button> */}
      </div>
      </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div></div>
        <div className='container'> 
        {
          foodCategory.length !==0? foodCategory.map((data)=>{
            return (
              <div className='row mb-3'>  <div key={data._id} className='fs-2 fw-bolder m-2'>
                {data.CategoryName}</div>
                <hr div />
                { foodItem!== 0 ? foodItem.filter((item)=> (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(Search.toLocaleLowerCase())) )
                .map(
                  filterItem =>{
                    return(
                      <div key={filterItem._id} className='col-12 col-md-6 col-lg-3 gx-4'>
                      <Card foodItems={filterItem} options = {filterItem.options[0]} />
                    </div>
                    )
                  }
                ):<div>No data found!</div> }
                </div>
            
            )
          }):""
        }
       
        </div>
       
        <div><Footer/></div>
    </div>
  )
}
