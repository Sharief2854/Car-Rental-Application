import React, { useEffect, useState } from "react";
import './userRegister.css'
import { userSericeObj } from "../user-service/userService";
import {  useNavigate } from "react-router-dom";
import HomeNavBar from "../home-navbar/homeNavBar";
export function UserRegister(){
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');

    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const[conPass,setConPass]=useState('');
    const[error,setError]=useState(false);
    let navigate = useNavigate();
    const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniquechar="";
    const[captchaFlag,setCaptchaFlag]=useState(false);
    const[captcha,setCaptcha]=useState("");
    const[enteredCaptcha,setEnteredCaptcha]=useState("");
    function handleSubmit(){
        if((pass!=conPass)||email==""||name==""||pass=="")
        {
            setError(true);
            return false;
        }
        setInvalidEmail(false);
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!(regex.test(email)))
        { 
            setInvalidEmail(true);
            return false; 
        }
        if(captcha!=enteredCaptcha)
        {
            setCaptchaFlag(true);
            return false;
        }
        let obj={email:email,password:pass,name:name};
        userSericeObj.verifyEmail(obj).then((data)=>
        {
            if(!(data.data))
            {
                userSericeObj.register(obj).then((data)=>
                {
                    alert("successFully Registered");
                })
            }
            else
                alert("email already Registered");
            navigate('/userLogin');
                
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
        captchaGenerate();
    },[])
    return (
        <div>
            <HomeNavBar/>
                <div className="auth-form-container App">
                    <h2>Register</h2>
                <form className="register-form" >
                    <label htmlFor="name">Full name</label>
                    <input value={name} name="name" onChange={(e) => {setName(e.target.value);setError(false)}} id="name" placeholder="full Name" style={error?{border: '2px solid red'}:{}}/>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => 
                        {setEmail(e.target.value);setError(false)}}type="email" placeholder="youremail@gmail.com" id="email" name="email" style={error?{border: '2px solid red'}:{}}/>
                        
                    {invalidEmail?<label style={{color:'red'}}>Invalid EmailId</label>:''}

                    <label htmlFor="password">password</label>
                    <input value={pass} onChange={(e) => {setPass(e.target.value);setError(false)}} type="password" placeholder="********" id="password" name="password" style={error?{border: '2px solid red'}:{}}/>
                    <label htmlFor="confirmPassword">confirm password</label>
                    <input value={conPass} onChange={(e) => {setConPass(e.target.value);setError(false)}} type="password" placeholder="********" id="password" name="confirmPassword" style={error?{border: '2px solid red'}:{}} />
                    {captchaField()}

                </form>
                <button onClick={handleSubmit}>Log In</button>
            </div>
        </div>
    )
}