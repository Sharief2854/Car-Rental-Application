import React from 'react';
import './success.css';
function Success(props)
{
    return(
        <>
            <div className='container8'>
                
                <div className='center-box'>
                    {/* <i class="fa-regular fa-circle-check success-logo mt-4"></i> */}
                    <div>
                        <svg>
                            <circle className='circle' cx="50%" cy="40%" r="15%"/>
                            <path d='M 145 75 L 172 54 M 145 75 L 134 60' className='check-mark'/>
                        </svg>
                    </div>
                    <div className='fs-2 fw-bold'>
                        Thank you!
                    </div>
                    <div className='fs-5'>
                        {props.data}
                    </div>
                    <div>
                        <button className='btn btn-success mb-4'>Ok</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Success;