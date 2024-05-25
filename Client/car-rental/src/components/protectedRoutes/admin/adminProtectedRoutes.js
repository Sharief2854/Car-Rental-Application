
import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";

const AdminProtectedRoute = (props) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAdminToken = () => {
		
        const adminToken = sessionStorage.getItem('admin-token');
		
        if (!adminToken || adminToken === 'undefined') 
		{
            setIsLoggedIn(false);                
            return navigate('/adminLogin?returnUrl = ' + props.returnUrl);
         //   return navigate('/Login');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
       // alert(props.returnUrl);       
        checkAdminToken();
    }, [isLoggedIn]);

    return (
        <>
            {
                isLoggedIn ? props.children : null
            }
        </>
    );
}

export default AdminProtectedRoute;