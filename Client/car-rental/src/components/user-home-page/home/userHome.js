import React, { useState } from 'react';
import UserNavBar from '../navbar/userNavBar';
import HomeContent from '../content/homeContent';


function UserHome()
{
    return(
        <div className='bg'>
            <UserNavBar/>
            <HomeContent/>
        </div>
    )

}
export default UserHome;