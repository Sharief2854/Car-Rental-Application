import React, { useState } from 'react';
import './card.css';
import { useNavigate } from 'react-router-dom';

function Card()
{
    let navigate = useNavigate(); 
    return(
        <>
            <div className='container1'>
                <button onClick={()=>navigate("/userLogin")}>User</button>
                <button onClick={()=>navigate("/adminLogin")}>Admin</button>
            </div>
        </>
    )

}
export default Card;