import React, { useEffect, useState } from 'react';
import { carSericeObj } from '../../car-service/carService';
import './availableCars.css';
import UserNavBar from '../../user-home-page/navbar/userNavBar';
import { historyServiceObj } from '../../history-seivice/historyService';
import { useNavigate } from 'react-router-dom';
import { userSericeObj } from '../../user-service/userService';

function AvailableCars()
{
    const[cars,setCars]=useState([]);
    const[bookingForm,setBookingForm]=useState(false);
    const[obj,setObj]=useState({});
    let presentDate=new Date().toISOString().split('T')[0];
    const[td,setTD]=useState("");
    const[coinsFlag,setCoinsFlag]=useState(false);
    const [coins,setCoins]=useState(0);
    const[totalPrice,setTotalPrice]=useState(0);
    const[brandSearch,setBrandSearch]=useState("All");
    const[carTypeSearch,setCarTypeSearch]=useState("SUV");

    
    let navigate = useNavigate(); 

    const userToken = sessionStorage.getItem('user-token');
		
        if (!userToken || userToken === 'undefined') 
		{
            navigate('/userLogin');
        }
    function getAllCars()
    {
        
        carSericeObj.getAllCars().then((data)=>
        {
            if(data.data)
            {
                setCars(data.data);
            }
        })
    }
    
    userSericeObj.getCoins({email:localStorage.getItem('email')}).then((data)=>
    {
            if(data.data)
                setCoins(data.data[0].coins);
    })
    
    function confirmBookNowBtn()
    {
        var hObj={ 
            email:localStorage.getItem('email'),
            brand : obj.brand,
            model   : obj.model,  
            date:presentDate,
            todate:td,
            totalprice : totalPrice,
            status:false,
            message:" "
        };
        // console.log(hObj);
        historyServiceObj.addToHistory(hObj).then((data)=>
        {
            if(data.data.flag)
            {
                alert("successfully Booked");
                navigate("/userHome");
            }
        })
        userSericeObj.updateCoins({email:localStorage.getItem('email'),coins:-25}).then((data)=>
        {
            console.log(data.data);
        })
    }

   
    

    function bookNowForm()
    { 
       
        return(
            <>
               
                <div className='book-now-container'>
                    <div className='book-now'>
                        <button onClick={()=>setBookingForm(false)} className='cross'><i class="fa-solid fa-xmark"></i></button>
                        <table className='table book-table border'>
                            <tr>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>car Type</th>
                                <th>price/Day</th>
                                <th>Tax</th>
                                <th>discount</th>
                                <th>Price/Day(inc. tax and discount)</th>
                            </tr>
                            <tr>
                                <td>{obj.brand}</td>
                                <td>{obj.model}</td>
                                <td>{obj.car}</td>
                                <td>Rs.{obj.price}</td>
                                <td>{obj.tax}%</td>
                                <td>{obj.discount}%</td>
                                <td>Rs.{obj.totalprice}</td>
                            </tr>
                        </table>
                        <div>
                            <div>
                                <center>Limit: 200 KM /Day More Than 200KM:1KM=Rs.5</center>
                            </div>
                           {(coins>=25)?<input type='checkBox'  name='coins' onChange={(e)=>{setCoinsFlag(e.target.checked)}}/>:<span></span>}
                            &nbsp;<label>Use Crazy Coins</label>
        
                            &nbsp;&nbsp;<span style={{color:'gold',fontSize:'20px'}}>{coins} </span>:<span></span>
                            <i class="fa-solid fa-bolt coin-small"></i>&nbsp;&nbsp;
                            <span>Ucan use only 25 coins--Rs.200 discount</span>
                        </div>
                        <div>
                            <span>Total amount per Day=<b>Rs.{totalPrice}</b></span>
                        </div>
                        <label> on which date do u want ?</label>
                        <input type='date' className='date-field' onChange={(e)=>setTD(e.target.value)} required/>
    
                        <button onClick={()=>confirmBookNowBtn()} className='btn btn-success mt-2'>Book</button>
                        

                    </div>
                </div>
            </>
        )
    }

    
    function bookNowBtn(obj)
    {
        setBookingForm(true);
        setObj(obj);
        setTotalPrice(obj.totalprice);
        // console.log(obj)
    }
    useEffect(()=>
    {
        getAllCars();
        setTotalPrice(Number(obj.totalprice)-(coinsFlag?200:0))

    },[coinsFlag])
    function availableCars()
    {

        
        let carCard=cars.map((obj,ind)=>
        {
           
                // if((obj.brand.toLowerCase()!=brandSearch.toLowerCase())||obj.car.toLowerCase()!=carTypeSearch.toLowerCase())
                // {
                //     return;
                // }
                // return;

            
            if(true)
            {
                if((brandSearch=="All"&&obj.car.toLowerCase()==carTypeSearch.toLowerCase())||(obj.brand.toLowerCase()==brandSearch.toLowerCase() && obj.car.toLowerCase()==carTypeSearch.toLowerCase()))
                return(
                    <>
                        
                        <div className='car-card col mt-3 '>
                            <div className='row'>
                                <div className='col to-center'>
                                    <img src={`./images/cars/car${ind}.webp`} className='car-image '/>
                                </div>
                                <div className='col to-center'>
                                    <span>{obj.brand}</span>
                                </div>
                                <div className='col to-center'>
                                    <span>{obj.model}</span>
                                </div>
                                <div className='col to-center'>
                                    <span>{obj.car}</span>
                                </div>
                                <div className='col to-center'>
                                    <span>Rs.{obj.price}</span>
                                </div>
                                <div className='col to-center'>
                                    <span>{obj.tax}%</span>
                                </div>
                                <div className='col to-center'>
                                    <span>{obj.discount}%</span>
                                </div>
                                <div className='col to-center'>
                                    <span>Rs.{obj.totalprice}/Day</span>
                                </div>
                                <div className='col to-center'>
                                <button onClick={()=>bookNowBtn(obj)}className='btn btn-success'>Book Now</button>
                                </div>

                            </div>
                            
                            
                        </div>
                    </>
                )
            }
        })
        return carCard
    }
    

    return(
        <>
            <UserNavBar/>
            {!bookingForm?
            <div className='search-box mt-3'>
                <div className='card col-8 offset-2 mt-3 mb-3'>
                    
                        <div className='row'>
                            <div className='col'>
                               <span className='form-control'>Search Cars here</span>
                            </div>
                            <div className='col'>
                            <select  className='form-control' onChange={(e)=>setBrandSearch(e.target.value)}>
                                <option value="All" selected>All</option>
                                <option value="Tata">Tata</option>
                                <option value="Suzuki">Suzuki</option>
                                <option value="Hyumdai">Hyumdai</option>
                                <option value="mahindra">mahindra</option>
                            </select>
                            </div>
                            <div className='col' onChange={(e)=>setCarTypeSearch(e.target.value)}>
                                <select className='form-control'>
                                
                                    <option value="SUV">SUV</option>
                                    <option value="Min-vancar">min-vancar</option>
                                    <option value="Compact">Compact</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="luxury">luxury</option>

                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                :<div></div>}
            {bookingForm?bookNowForm():availableCars()}


        </>
    )

}
export default AvailableCars;