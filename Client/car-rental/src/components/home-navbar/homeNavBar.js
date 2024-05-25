import React, { useState } from 'react';
import './homeNavBar.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function HomeNavBar()
{
    return(
        <>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa-solid fa-bars toggler-btn"></i>
                    </button>
                    <div className='navbar-brand'>
                        <span style={{color:'red'}}>Carzy </span><span>Car Rental</span>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to="/" class="nav-link" aria-current="page" >Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/aboutUs" class="nav-link" >AboutUs</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/contactUs" class="nav-link" >ContactUs</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/blogs" class="nav-link" >Blogs</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {/* <li class="nav-item"> */}
                        
                            <Link to="/userLogin" class="nav-link">Login/Register</Link>
                        {/* </li> */}
                    </div>
                </div>
            </nav>
        </>
    )

}
export default HomeNavBar;