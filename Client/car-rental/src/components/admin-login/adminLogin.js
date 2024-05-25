import React, { useEffect, useState } from 'react'
import './adminLogin.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { adminSericeObj } from '../admin-service/adminService';
import HomeNavBar from '../home-navbar/homeNavBar';
function AdminLogin() 
{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState(false);
    let navigate = useNavigate(); 
    const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniquechar="";
    const[captchaFlag,setCaptchaFlag]=useState(false);
    const[captcha,setCaptcha]=useState("");
    const[enteredCaptcha,setEnteredCaptcha]=useState("");
    
   
    let location = useLocation(); 

    function clearFields()
    {
        setEmail("");
        setPassword("");
    }
    function loginBtn()
    {
    
        if(email==""||password=="")
        {
            setError(true);
            return false;
        }
        if(captcha!=enteredCaptcha)
        {
            setCaptchaFlag(true);
            return false;
        }
        const queryString = location.search;
        let strReturnUrl  =  new URLSearchParams(queryString).get('returnUrl');
        if(strReturnUrl == null)
        {
            strReturnUrl = "/adminHome";
        }
        
        let obj={email:email,password:password}
        adminSericeObj.verifyEmailAndPass(obj).then((data)=>
        {
            if(data.data)
            {
                // console.log(data.data);
                clearFields();
                alert("successfull")
                let token = "ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS";
                sessionStorage.setItem('admin-token', token);
                localStorage.clear();
                localStorage.setItem('email',email);
                navigate(strReturnUrl);

            }
            else
            {
                setError(true);
            }
        })
    }

        function captchaGenerate()
        {
            uniquechar="";
            for (let i = 1; i < 6; i++) {
                uniquechar += randomchar.charAt(
                Math.random() * randomchar.length)
            }
            setCaptcha(uniquechar);
            console.log(captcha); 
        }

    function captchaField()
    {
        return(
            <div className='container7'>
                <div className='captcha'>
                    <span className='captcha-text'>{captcha}</span>
                </div>
                <input type='text' className='captcha-text-enter' style={captchaFlag?{border:'2px solid red'}:{}} onChange={(e)=>{setEnteredCaptcha(e.target.value);setCaptchaFlag(false)}}/>
                
                &nbsp;&nbsp;&nbsp;<i class="fa-solid fa-rotate-left" onClick={captchaGenerate}></i>
            </div>
            )

    }
    useEffect(()=>
    {
        // setError(false);
        captchaGenerate();
        
    },[])


  return (
    <>
    <HomeNavBar></HomeNavBar>
    <div class=" container">
       <div className='card card3 col-3'>
            <div className='text-center mt-4'>
                <img src='./images/adminImages/adminPic.jpg' className='admin-pic'/>
                <div className='welcome-text'>Admin Login</div>
            </div>
            <div className='text-center mt-3'>
                <i class="fa-solid fa-user"></i>
                <input type='text' style={error?{borderBottom: '2px solid red'}:{}} className="text-border-less" placeholder='Email ID' value={email} onChange={(e)=>{setEmail(e.target.value);setError(false)}}/>
                <br/>
            </div>
            <div className='text-center mt-3'>
                <i class="fa-solid fa-lock"></i>
                <input type='password'  style={error?{borderBottom: '2px solid red'}:{}} className="text-border-less" placeholder='Password'  value={password} onChange={(e)=>{setPassword(e.target.value);setError(false)}}/>
                <br/>
            </div>
            <div style={{width:'92%'}}>
                <span className='forget-password mt-1' onClick={()=>navigate("/admin/forgetpassword")}>Forget Password</span>
            </div>
            {captchaField()}
            <div className='text-center mt-3 mb-5'>
                <input type='submit' value='Login' className='login-btn bg-success' onClick={loginBtn}/>
            </div>
            
       </div>
    </div>
    </>
  );
}

export default AdminLogin;
