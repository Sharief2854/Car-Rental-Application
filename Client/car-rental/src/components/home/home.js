import React, { useState } from 'react';
import HomeNavBar from '../home-navbar/homeNavBar';
import './home.css'
import HomeContent from '../home-content/homeContent';

function header()
{}
function Home()
{
    return(
        <div className='bg'>
            <HomeNavBar/>
            <HomeContent/>
        </div>
    )

}
export default Home;