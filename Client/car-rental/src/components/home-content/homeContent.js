import React, { useEffect, useState } from 'react';
import './homeContent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function HomeContent()
{
    let navigate = useNavigate(); 
    return(
        <>
           <div className=''>
                <div className='quote'>
                    <div>
                        Let's
                    </div>
                    <div>
                        wander where
                    </div>
                    <div>
                        the WiFi is weak
                    </div>
                        
                </div>
                <div>
                    <button className='home-book-now-btn' onClick={()=>navigate('/userHome')}>BOOK NOW</button>
                </div>
           </div>
        </>
    )

}
export default HomeContent;