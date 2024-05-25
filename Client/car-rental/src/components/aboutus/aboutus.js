// AboutUs.js

import React from 'react';
import './aboutus.css';
import HomeNavBar from '../home-navbar/homeNavBar';

const AboutUs = () => {
  return (
   
    <div>
      <HomeNavBar/>
      <div className='h2'>
      <div style={{marginTop:"274px"}}></div>
      <center><h2 style={{color:'black'}}>About Us</h2></center>
      
      <p>Welcome to Carzy.com, your trusted partner for all your car rental needs!</p>
      <p>At Carzy.com, we understand the importance of convenience, reliability, and affordability when it comes to renting a car. Whether you're traveling for business or leisure, we strive to provide you with a seamless rental experience from start to finish.</p>
      <p>With a wide selection of vehicles ranging from compact cars to luxury SUVs, we have something to suit every preference and budget. Our commitment to customer satisfaction means that we go above and beyond to ensure that your rental experience exceeds your expectations.</p>
      <p>Our dedicated team of professionals is here to assist you every step of the way, from helping you choose the perfect vehicle to providing 24/7 support throughout your rental period. With transparent pricing, flexible rental options, and hassle-free booking process, renting a car has never been easier.</p>
      <p>Experience the freedom of the open road with Cary.com. Book your next rental with us today!</p>
      <footer className='footer'>
     <p class= 'one'> &copy; 2024 All rights reserved.</p>
    </footer>
      </div>
    
    </div>
    
  
  );
};


export default AboutUs;