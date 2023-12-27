import { useState } from "react";
import React from 'react' ;
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

export default function Login() {
  const [creditianls,setCreditianls] = useState({email:"",password:""});
  let navigate = useNavigate();
    const handleSubmit = async (e)=>{

        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/loginuser",{
           method: 'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body : JSON.stringify({email: creditianls.email, password: creditianls.password})
        });
        const json = await response.json();
    
        if(!json.success){
          alert("Please Enter Valid Information");
        }else{
          console.log(creditianls.email);
          localStorage.setItem("userEmail",creditianls.email);
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"));
          navigate("/");
        } 
       }
       const onChange = (event)=>{
        setCreditianls({...creditianls,[event.target.name]:event.target.value})
    }
  return (
    <div>
  <div>    <Navbar /></div>
  <div className='container '>
      <form className='mx-auto p-4 mt-5' onSubmit={handleSubmit} style={{ "border": "1px solid #D3D3D3", "width": "400px", "maxWidth": "100%","boxShadow":"2px 4px 8px 0 rgba(0, 0, 0, 0.2), 2px 6px 20px 0 rgba(0, 0, 0, 0.19)","borderRadius":"10px" }}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={creditianls.email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Password" name='password' value={creditianls.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3" style={{"marginRight":"10px"}}>Login</button>
        <Link to="/createuser" className='btn btn-danger btn-block mt-3'>I have not an account</Link>
      </form>
    </div></div>
  )
}
