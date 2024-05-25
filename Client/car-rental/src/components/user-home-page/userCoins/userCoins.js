import React, { useEffect, useState } from 'react';
import './userCoins.css';
import UserNavBar from '../navbar/userNavBar';
import { historyServiceObj } from '../../history-seivice/historyService';
import { userSericeObj } from '../../user-service/userService';
import { useNavigate } from 'react-router-dom';

function UserCoins()
{
    const[totalCoins,setTotalCoins]=useState(0);
    const[totalPrice,setTotalPrice]=useState(0);
    const[priceArr,setPriceArr]=useState([]);
    const[falg,setFlag]=useState(true);
    const[kmArr,setKmArr]=useState([]);
    // let km=0;
    let navigate = useNavigate(); 

    const userToken = sessionStorage.getItem('user-token');
		
    if (!userToken || userToken === 'undefined') 
    {
        navigate('/userLogin');
    }

    function getUserKm()
    {
        let obj={email:localStorage.getItem('email')};
        historyServiceObj.getUserKm(obj).then((data)=>
        {
            if(data.data.flag)
            {
                console.log(data.data);   //1000--50km-1coin
                setKmArr(data.data.result);
                
            }
        })
    }

    let totalPoints=0;
    console.log(kmArr);
    kmArr.map((obj)=>
    {
        totalPoints+=(obj.finalKm-obj.initialKm)/50;
    })
    let obj={email:localStorage.getItem('email'),coins:totalPoints}
    console.log(obj);
    

    function update()
    {
        // if(kmArr.length!=0)
        userSericeObj.updateCoins(obj).then((data)=>
        {
            console.log(data.data);
            if(data.data.flag)
            {
                historyServiceObj.coinsUpdated(obj).then((data)=>
                {
                    if(data.data)
                    {
                        console.log("updated");
                    }
                })
            }
        })
    }
    
    function getCoins()
    {
    userSericeObj.getCoins(obj).then((data)=>
    {
        if(data.data)
        {
            setTotalCoins(data.data[0].coins);
        }
    })
    }

 
    useEffect(()=>
    {
        // getPriceArr();
        getUserKm();
        // updateCoins();
        getCoins();
        if(totalPoints!=0)
            update();
    },[totalCoins])
    return(
        <>  
        <UserNavBar/>
            <div className='row mt-5'>
                <div className='col-5 card offset-4'>
                    <div className='row'>
                        <div className='col-5'>
                            <div className='coin-big'>
                                <i class="fa-solid fa-bolt"></i>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='coin-name'>Crazy Coins</div>
                            </div>
                            <div className='row mt-5'>
                                <div className=''>
                                    <h5>    
                                        Total Crazy Coins :<span style={{color:'gold'}}>{totalCoins} </span>
                                        <i class="fa-solid fa-bolt coin-small"></i>
                                        &nbsp; &nbsp; &nbsp;<i class="fa-solid fa-arrows-rotate" onClick={()=>window.location.reload()}></i>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )

}
export default UserCoins;