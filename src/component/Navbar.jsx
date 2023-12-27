import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import './sytle.css';
import {useCart} from '../component/ContextFile'
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function Navbar() {
  let data = useCart();
  const [cartVw,setCartVw] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = async()=>{
 localStorage.removeItem("authToken");
 navigate("/login");
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar border-bottom">
  <div className="container-fluid">
    <Link className="navbar-brand logo-style " style={{fontSize:"1.8rem",color:"#1877F2"}} to="#">SwiftBite</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link btn btn-light " aria-current="page" to="/" style={{backgroundColor:"#f1f1f1",borderRadius:"10px",fontSize:"18px"}}>Home</Link>
        </li>
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
        <Link className="nav-link btn btn-light mx-2 hoverable" aria-current="page" to="/myOrder"style={{backgroundColor:"#f1f1f1",borderRadius:"10px",fontSize:"18px"}}>Orders</Link>
      </li>:" "}
      </ul>
      {(!localStorage.getItem("authToken"))?
        <div className='d-flex'>
        <Link className="btn btn-blue btn-primary mx-2" to="/Login">Login</Link>
        <Link className="btn btn-blue btn-outline-primary mx-2" to="/createUser">SignUp</Link>
    </div>:
     <div>
      <div  className="btn btn-blue btn-primary mx-2" onClick={()=>{setCartVw(true)}} >< ShoppingCartIcon/>
         Cart{' '}
         <Badge pill bg="danger">{data.length}</Badge>
      </div>
      {cartVw ?<Modal onClose={()=>setCartVw(false)}><Cart/></Modal>:null}
      <div  className="btn btn-outline-primary mx-2" onClick={handleLogOut}>
          Logout
      </div>
     </div>
      }
      
    </div>
  </div>
</nav>
    </div>
  )
}
