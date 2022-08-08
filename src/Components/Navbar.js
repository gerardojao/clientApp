import React from 'react'
import {Link} from "react-router-dom"
import "../css/Navbar.css"
import img from "../images/logogerardo.svg"

const Navbar = () => {
  return (
    <nav>
   <div className="containerimg">
    <a target="_blank" href="https://gerardojao.vercel.app/"><img className="logo" src={img} alt="apple" /></a>
     
    </div>
       

   
<h4 className="active">App FullStack made with React.Js, .NET, MongoDB Atlas, Supabase</h4>

   

</nav>
  )
}

export default Navbar