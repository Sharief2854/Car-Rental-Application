import React, { useEffect, useState } from 'react';
import UserNavBar from '../navbar/userNavBar';
import { historyServiceObj } from '../../history-seivice/historyService';
import { userSericeObj } from '../../user-service/userService';
import { useNavigate } from 'react-router-dom';

export function UserCoins() {
    const [totalCoins, setTotalCoins] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [priceArr, setPriceArr] = useState([]);
    const [falg, setFlag] = useState(true);
    const [kmArr, setKmArr] = useState([]);

    let navigate = useNavigate();

    const userToken = sessionStorage.getItem('user-token');

    if (!userToken || userToken === 'undefined') {
        navigate('/userLogin');
    }

    function getUserKm() {
        let obj = { email: localStorage.getItem('email') };
        historyServiceObj.getUserKm(obj).then((data) => {
            // console.log(data.data)
            if (data.data.flag) {
                console.log(data.data.result);
                setKmArr(data.data.result);
            }
        });
    }
    // let totalPoints=0;
    // console.log(kmArr)
    // kmArr.map((obj)=>
    // {
    //     totalPoints+=(obj.finalKm-obj.initialKm)/50
    // })
    // console.log(totalPoints,"total points");
    function getPriceArr() {
        let obj = { email: localStorage.getItem('email') };
        // console.log(obj);
        historyServiceObj.getUserPrice(obj).then((data) => {
            if (data.data) {
                // console.log(data.data);
                // setPriceArr();
                let total = data.data.reduce((a, cv) => a + Number(cv.totalPriceAfterRented), 0);
                // console.log(total);
                let obj = { email: localStorage.getItem('email'), coins: (Math.ceil(total / 100)) };
                userSericeObj.updateCoins(obj).then((data) => {
                    if (data.data) {
                        userSericeObj.getCoins(obj).then((data) => {
                            if (data.data) {
                                setTotalCoins(data.data[0].coins);
                            }
                        });
                    }
                });

            }
        });
    }


    function refreshCoinsBtn() {
    }



    useEffect(() => {
        getPriceArr();
        getUserKm();
    }, []);
    return (
        <>
            <UserNavBar />
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
                                        Total Crazy Coins :<span style={{ color: 'gold' }}>{totalCoins} </span>
                                        <i class="fa-solid fa-bolt coin-small"></i>
                                        &nbsp; &nbsp; &nbsp;<i class="fa-solid fa-arrows-rotate" onClick={getPriceArr}></i>
                                    </h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );

}
