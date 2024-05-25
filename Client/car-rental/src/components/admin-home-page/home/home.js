import React, { useState } from 'react';
import './home.css'
import AdminNavBar from '../navbar/navbar';
import UserHistory from '../content/userHistory';

function AdminHome()
{
    return(
        <div>
            <AdminNavBar/>
            <UserHistory></UserHistory>
        </div>
    )

}
export default AdminHome;