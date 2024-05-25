import React, { useEffect, useState } from 'react';
import './bookingStatus.css';
import UserNavBar from '../navbar/userNavBar';
import { historyServiceObj } from '../../history-seivice/historyService';
import { useNavigate } from 'react-router-dom';
function BookingStatus()
{   const[userHistory,setUserHistory]=useState([]);
    let navigate = useNavigate(); 

    const userToken = sessionStorage.getItem('user-token');
		
    if (!userToken || userToken === 'undefined') 
    {
        navigate('/userLogin');
    }
    function getUserHistory()
    {
        let obj={email:localStorage.getItem('email')}
        // console.log(obj)
        historyServiceObj.getUserHistory(obj).then((data)=>
        {
            // console.log(data.data);
            if(data.data)
            {
                setUserHistory(data.data);
            }
        })
    }

    let details=userHistory.map((obj)=>
    {
        return(
            <tr className={obj.pending?"pending":obj.status?"accepted":"decline"}>
                <td>{obj.brand}</td>
                <td>{obj.model}</td>
                <td>{obj.date}</td>
                <td>{obj.todate}</td>
                <td>Rs.{obj.totalprice}</td>
                <td>{obj.initialKm}</td>
                <td>{obj.pickupDate}</td>
                <td>{obj.returnDate}</td>
                <td>{obj.finalKm}</td>
                <td>Rs.{obj.totalPriceAfterRented}</td>
                <td className=''>
                    {obj.message}
                    
                </td>
                


            </tr>
        )
    })
    useEffect(()=>
    {
        getUserHistory();
    })
    return(
        <>
            <UserNavBar></UserNavBar>
            <div>
                <div className='history-filed mt-3'>
                    <div>
                        <table className='table tbl'>
                            <tr>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Date of Booking</th>
                                <th>To Date</th>    
                                <th>Total Price/Day(200Km)</th>
                                <th>Initial Car Reading</th>
                                <th>Pickup Date</th>
                                <th>Return Date</th>
                                <th>Final Car Reading</th>

                                <th>Total Amount</th>
                                
                                <th>Status</th>
                                <th></th>
                            </tr>
                            {details}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}
export default BookingStatus;