import React, { useEffect, useState } from "react";
import './userLogin.css';
import { userSericeObj } from "../user-service/userService";
import { useLocation, useNavigate } from "react-router-dom";
import HomeNavBar from "../home-navbar/homeNavBar";
 function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');

    const [pass, setPass] = useState('');
    let navigate = useNavigate(); 
    let location = useLocation(); 
    const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniquechar="";
    const[captchaFlag,setCaptchaFlag]=useState(false);
    const[captcha,setCaptcha]=useState("");
    const[enteredCaptcha,setEnteredCaptcha]=useState("");
    const[error,setError]=useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email==""||pass=="")
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
        let obj={};
        obj.email=email;
        obj.password=pass;
        const queryString = location.search;
        let strReturnUrl  =  new URLSearchParams(queryString).get('returnUrl');

        if(strReturnUrl == null)
        {
            strReturnUrl = "/userHome";
        }

        userSericeObj. verifyEmailAndPass(obj).then((data)=>
        {
            if(data.data)
            {
                
                alert("successfully loggin");
                let token = "ASJDFJF87ADF8745LK4UYGFUYFVLQ23UIDLFKAS";
                sessionStorage.setItem('user-token', token);
                localStorage.clear();
                localStorage.setItem('email',email);
                navigate(strReturnUrl);
            }
            else{
                setInvalidEmail(true);
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
        captchaGenerate();
    },[])
    return (
        <div>
            <HomeNavBar></HomeNavBar>
            <div className="auth-form-container App">
                <h2>User Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => {setEmail(e.target.value);setError(false)}} type="email" placeholder="youremail@gmail.com" id="email" name="email" style={error?{border: '2px solid red'}:{}}/>
                    {invalidEmail?<label style={{color:'red'}}>Invalid EmailId</label>:''}
                    
                    <label htmlFor="password">password</label>
                    <input value={pass} onChange={(e) => {setPass(e.target.value);setError(false)}} type="password" placeholder="********" id="password" name="password" style={error?{border: '2px solid red'}:{}}/>
                    {captchaField()}
                    <button type="submit" className="mt-3">Log In</button>
                </form>
                <div className="adminPage" onClick={()=>navigate("/adminLogin")}>Admin Login</div>
                <div className="link-btn" onClick={()=>navigate('/userRegister')}>Don't have an account? Register here.</div>
            </div>
        </div>
    )
}
export default UserLogin;