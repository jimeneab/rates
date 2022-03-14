import React from "react";
import './Navbar.css'
import NavbarLogo from '../../assets/icons/star.svg'

export default function Navbar(){
    return(
        <div id='navbar'>
            <div className="logo-container">
                <img src={NavbarLogo} alt="rates"/>    
                <img src={NavbarLogo} alt="rates" />   
                <img src={NavbarLogo} alt="rates"/>    
            </div> 
        </div>
    )
}