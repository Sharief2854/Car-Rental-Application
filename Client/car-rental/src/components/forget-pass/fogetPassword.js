import React, { useEffect, useState } from 'react';
import './forgetPassword.css';
import { otpSericeObj } from '../otp-service/otpService';
import { adminSericeObj } from '../admin-service/adminService';
import { useNavigate } from 'react-router-dom';
import HomeNavBar from '../home-navbar/homeNavBar';

function ForgetPassword()
{
    const[email,setEmail]=useState("");
    const[otp,setOtp]=useState("");
    const[otpStatus,setOtpStatus]=useState(false);
    const[loading,setLoading]=useState("");
    const[otpResult,setOtpResult]=useState("");
    const[registered,setRegistered]=useState(true);
    const[invalidOtp,setInvalidOtp]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[otpVerification,setOtpVerification]=useState(false);
    const[error,setError]=useState(false);
    let navigate = useNavigate();

    function mainField()
    {
        return(
            <div className='text-center mt-3'>
                <i class="fa-solid fa-user"></i>
                <input type='email' style={error?{borderBottom:'2px solid red'}:{}} className="text-border-less" placeholder='Email ID' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <span>
                    {otpStatus?null:loading}
                </span>
                <div style={error?{color:'red',fontWeight:'bold'}:{}}>
                    {registered?null:"Email was not Registerd"}
                   
                </div><br/>
                <div className='text-center mb-5' style={otpStatus?{display:'none'}:{display:'block'}}>
                
                    <button className='mt-3 login-btn bg-success' onClick={sendOtpBtn}>Send Otp</button>
                </div>
        </div>
        )
    }

    function sendOtpBtn()
    {
        if(!email)
        {
            setError(true);
            return false;
        }
        let obj={};
        obj.email=email;
        adminSericeObj.verifyEmail(obj).then((data)=>
        {
            // console.log(data.data);
            if(data.data)
            {
                setLoading("Loading......");
                otpSericeObj.sendOtp(obj).then((data)=>{
                    // console.log(data.data.flag)
                    if(data.data.flag)
                    {
                        setLoading("");
                        setOtpResult(data.data.result);
                        setOtpStatus(true);
                    }
                })
                
            }
            else{
                setRegistered(false);
                setError(true);

            }
        })
        
        
        
    }
    function verifyOtpBtn()
    {
        let obj={};
        obj.otp=otp;
        otpSericeObj.verifyOtp(obj).then((data)=>{
            if(data.data.flag)
            {
                // navigate("/");
                setOtpVerification(true);
                setOtpStatus(false);
            }
            else
            {
                setInvalidOtp(data.data.result);
            }
        })
    }
    function otpField()
    {
        return(
            <>
            <div className='otp-container'>
                <div style={{color:'green',fontWeight:'bold',marginLeft:'25px'}}>
                    {registered?null:"Email was not Registerd"}
                    {otpResult}
                </div>
                <span>Enter otp here</span><br/>
                <input type='text' className="otp-text-box" placeholder='OTP' value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                <div style={{color:'red',fontWeight:'bold'}}>
                    {invalidOtp}
                </div>
                

            </div>
            <div className='text-center mb-5'>   
                <button className='mt-3 login-btn bg-success' onClick={verifyOtpBtn}>Verify OTP</button>
            </div>
        </>
        )
    }

    function resetPasswordBtn()
    {
        if(password==""||confirmPassword==""||(password!=confirmPassword))
        {
            setError(true);
            return false;
        }
        let obj={};
        obj.email=email;
        obj.password=confirmPassword;
        adminSericeObj.resetPassword(obj).then((data)=>
        {
            // console.log(data.data);
            alert(data.data.status)
            if(data.data.flag)
            {
                navigate("/adminLogin");
            }
            else
            {
                setError(true);
            }
        })
    }
    function passwordResetField()
    {
        return(
            <>
                <div className='text-center mt-3'>
                    <i class="fa-solid fa-lock"></i>
                    <input type='password' style={error?{borderBottom:'2px solid red'}:{}} className="text-border-less" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <br/>
                </div>
                <div className='text-center mt-3'>
                    <i class="fa-solid fa-lock"></i>
                    <input type='password' style={error?{borderBottom:'2px solid red'}:{}} className="text-border-less" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <br/>
                </div>
                <div className='text-center mb-5'>   
                    <button className='mt-3 login-btn bg-success' onClick={resetPasswordBtn}>Reset</button>
                </div>
            </>
        )
    }

    

    useEffect(()=>
    {
        setRegistered(true);
        setError(false);
    },[email,password,confirmPassword])

    return(
        <>
            <HomeNavBar></HomeNavBar>
            <div class="container">
                <div className='card card3 col-3'>
                    <div className='text-center mt-4'>
                        <img src='/images/adminImages/adminPic.jpg' className='admin-pic'/>
                        <div className='welcome-text'>Forget Password</div>
                    </div>
                    {otpVerification?passwordResetField():otpStatus?otpField():mainField()}
                </div>
                
            </div>
        </>
    )

}
export default ForgetPassword;