import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function HomeContent()
{
    let arr=[
        {image:'https://res.cloudinary.com/jerrick/image/upload/v1628852121/61164f99754aa9001d9ef382.jpg',name:"You want to goto Vacations"},
        {image:'https://assets.traveltriangle.com/blog/wp-content/uploads/2016/09/countries-drive-from-india-cover2.jpg',name:"You want to enjoy with Your Friends"},
        {image:'https://s3.amazonaws.com/iexplore_web/images/assets/000/005/846/original/dreamstime_m_42481603.jpg?1442939056',name:"You want to enjoy with your family"}
    ];
    let navigate = useNavigate(); 
    let cards=arr.map((obj)=>
    {
        return(
            <div className='col mt-5'>
                <div className='card'>
                    <div className='card-header'>
                    {obj.name}
                    </div>
                    <div className='card-body'>
                        <img src={obj.image} className='img-fluid'/>
                    </div>
                    <div className='card-footer'>
                        
                        <button className='form-control btn bg-success text-white' onClick={()=>(navigate('/availableCars'))}>Book Now</button>
                    </div>
                </div>
            </div>
        )
    })
    return(
        <>
            <div className='row'>
                
                    {cards}
          
            </div>
        </>
    )

}
export default HomeContent;