import React, { useEffect, useState } from 'react';
import './userHistory.css';
import { historyServiceObj } from '../../history-seivice/historyService';


function UserHistory()
{
    const[history,setHistory]=useState([]);
    const[response,setResponse]=useState(false);
    const[obj,setObj]=useState({});
    const[flag,setFlag]=useState(false);
    const[message,setMessage]=useState("");
    const[details,setDetails]=useState(false);
    const[detailsObj,setDetailsObj]=useState({});
    const[initialKm,setInitialKm]=useState("");
    const[pickupDate,setPickupDate]=useState("");
    const[returnDate,setReturnDate]=useState("");
    const[finalKm,setFinalKm]=useState("");
    const[totalPriceAfterRented,setTotalPriceAfterRented]=useState(0);

    let presentDate=new Date().toISOString().split('T')[0];
    // const[pickupFlag,setPickupFlag]=useState(false);


    function getHistory()
    {
        historyServiceObj.getHistory().then((data)=>
        {
            setHistory(data.data)
        });
    }

    
    function messageField()
    {
        function updateStatus()
        {
            let msg=flag?"Do you need to Accept?":"Do you need to decline?";
            if(!window.confirm(msg))
                return false;
            obj.pending=false;
            obj.status=flag; 
            obj.status?obj.message="Accepted "+message:obj.message="Declined "+message;
            console.log(obj);
            historyServiceObj.updateStatus(obj).then((data)=>
            {
                // console.log(data.data);
                setResponse(false);
                
            })

        }
        

        return(
            <div className='msg-container'>
                <div className='card col-3 msg-field'>
                    <button onClick={()=>setResponse(false)} className='cross-btn'><i class="fa-solid fa-xmark"></i></button>
                    <label>Write a message to user:</label>
                    <input type='text' className='form-control mt-4' placeholder='Message to User' onChange={((e)=>setMessage(e.target.value))}/>
                    <button className='form-control bg-success mt-4' onClick={()=>updateStatus()}>Proceed</button>
                </div>
            </div>
        )
    }

    function historyField()
    {
        let details=history.map((obj)=>
        {
            return(
                <tr className={obj.pending?"pending":obj.status?"accepted":"decline"} >
                    <td>{obj.email}</td>
                    <td>{obj.brand}</td>
                    <td>{obj.model}</td>
                    <td>{obj.date}</td>
                    <td>{obj.todate}</td>
                    <td>Rs.{obj.totalprice}/Day</td>
                    <td>{obj.pickupDate}</td>
                    <td>{obj.returnDate}</td>
                    <th>
                        <span style={obj.isRideCompleted?{display:'block'}:{display:'none'}}>Rs.{obj.totalPriceAfterRented}</span>
                    </th>
                    

                    <td >
                        <div style={!obj.pending?{display:'none'}:{display:'block'}}>
                            <button onClick={()=>{ setObj(obj);setFlag(true)
                                                    setResponse(true);
                                                    }} 
                                                    className='btn btn-success'>Accept</button>
                            <button onClick={()=>{  setObj(obj);setFlag(false)
                                                    setResponse(true);}} className='btn btn-danger'>Decline</button>

                        </div>
                        <div>
                                {obj.message}
                        </div>
                    </td>
                    <td  style={!obj.status?{display:'none'}:{display:'block'}}>
                        <button className='btn btn-primary' style={obj.pickup?{display:'none'}:{display:'block'}} onClick={()=>{setDetails(true);setDetailsObj(obj)}}>PickUp</button>
                    </td>
                    <td  style={obj.isRideCompleted?{display:'none'}:{display:'block'}}>
                        <button className='btn btn-primary' style={!obj.pickup?{display:'none'}:{display:'block'}} onClick={()=>{setDetails(true);setDetailsObj(obj)}}>Return</button>
                    </td>
                    


                </tr>
            )
        })

        return(
            <div className='history-filed mt-3'>
               <div>
                    <table className='table tbl'>
                        <tr>
                            <th>User Email</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Date of Booking</th>
                            <th>To Date</th>    
                            <th>Price/Day(Price+Tax-discount)</th>
                            <th>Pickup Date</th>
                            <th>Return Date</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                        {details}
                    </table>
               </div>
            </div>
        )
    }

    function pickupField()
    {
        function notePickupBtn()
        {
            // console.log(obj);
            obj.pickupDate=presentDate;
            obj.initialKm=initialKm;
            
            historyServiceObj.addPickupDetails(obj).then((data)=>
            {
                console.log(obj)
                alert("Done")
                setDetails(false);
            })
        }
        function noteReturnBtn()
        {
            // console.log(detailsObj);
            obj.returnDate=presentDate;
            obj.finalKm=finalKm;
            let totalKm=(obj.finalKm-obj.initialKm)>200?(obj.finalKm-obj.initialKm-200):0;
            obj.totalPriceAfterRented=(new Date(obj.returnDate).getDate()-new Date(obj.pickupDate).getDate()+1)*Number(obj.totalprice)+(totalKm*5);
            historyServiceObj.addReturnDetails(obj).then((data)=>
            {
                console.log(obj)

                alert("Done")
                setDetails(false);
            })
        }
    return(
        <>
            <div className='msg-container'>
                <div className='card col-3 msg-field' >
                    <button onClick={()=>setDetails(false)} className='cross-btn'>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div style={detailsObj.pickup?{display:'none'}:{display:'block'}}>
                        
                        <label>pickupDate</label>
                        <input type='date' readOnly className='form-control mt-2' value={presentDate} onChange={(e)=>setPickupDate(e.target.value)}/>
                        <label>Initial KM</label>
                        <input type='text' required className='form-control mt-2' placeholder='Initial Km' onChange={(e)=>setInitialKm(e.target.value)}/>
                        <button className='btn btn-success mt-3' onClick={notePickupBtn}>Note Pickup</button>

                    </div>
                    <div style={!detailsObj.pickup?{display:'none'}:{display:'block'}}>
                        
                        <label>Return Date</label>
                        <input type='date' readOnly className='form-control mt-2' value={presentDate} onChange={(e)=>setReturnDate(e.target.value)}/>
                        <label>Final KM</label>
                        <input type='text' required className='form-control mt-2' placeholder='Initial Km' onChange={(e)=>setFinalKm(e.target.value)}/>
                        <button className='btn btn-success mt-3' onClick={noteReturnBtn}>Note Return</button>

                    </div>
                    
                </div>
            </div>
        </>
    )}

    useEffect(()=>
    {
        getHistory();
    })

    return(
        <>
            <div>
                {historyField()}
                {response?messageField():null}
                {details?pickupField():null}
            </div>
        </>
    )

}
export default UserHistory;