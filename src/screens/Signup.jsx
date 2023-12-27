import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar';

export default function Signup() {
    const [creditianls,setCreditianls] = useState({name:"",email:"",password:"",geolocation:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{

        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/createuser",{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body : JSON.stringify({name: creditianls.name, email: creditianls.email, password: creditianls.password, location: creditianls.geolocation})
        });
        const json = await response.json();
        if(!json.success){
          alert("Please Enter Valid Information");
        }else{
          navigate("/login");
        }   
       }
 const onChange = (event)=>{
            setCreditianls({...creditianls,[event.target.name]:event.target.value})
        }
  return (
    <div>
      <div><Navbar/></div>
<div className='container'>
        <form className='mx-auto p-4 mt-5' onSubmit={handleSubmit} style={{ "border": "1px solid #D3D3D3", "width": "400px", "maxWidth": "100%","boxShadow":"2px 4px 8px 0 rgba(0, 0, 0, 0.2), 2px 6px 20px 0 rgba(0, 0, 0, 0.19)","borderRadius":"10px" }}>
        <div className="form-group m-2">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control mt-1" name="name" value={creditianls.name} onChange={onChange} placeholder='Enter your name' />
  </div>
  <div className="form-group m-2">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control mt-1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={creditianls.email} onChange={onChange} />
  </div>
  <div className="form-group m-2">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control mt-1" placeholder="Password" name='password' value={creditianls.password} onChange={onChange} />
  </div>
  <div className="form-group m-2">
    <label htmlFor="exampleInputPassword1">Address</label>
    <input type="text" className="form-control mt-1"  placeholder="Enter your address" name='geolocation' value={creditianls.geolocation} onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-primary btn-block mt-3" style={{"marginRight":"10px"}} >Submit</button>
  <Link to="/Login" className='btn btn-danger btn-block mt-3' >Already a user</Link>
</form>
    </div>
    </div>
    
  )
}
