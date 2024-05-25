import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNavBar from '../navbar/navbar'
// import HomeNavBar from '../home-navbar/homeNavBar';
import { adminSericeObj } from '../../admin-service/adminService';
function AdminRegister() 
{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[name,setName]=useState("");
    const[errorMessage,setErrorMessage]=useState();
    const[error,setError]=useState(false);
    let navigate = useNavigate(); 
    const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniquechar="";
    const[captchaFlag,setCaptchaFlag]=useState(false);
    const[captcha,setCaptcha]=useState("");
    const[enteredCaptcha,setEnteredCaptcha]=useState("");
    const [invalidEmail, setInvalidEmail] = useState('');

    
    const adminToken = sessionStorage.getItem('admin-token');
		
        if (!adminToken || adminToken === 'undefined') 
		{
           navigate('/adminLogin');
        }
   
    // let location = useLocation(); 

    function clearFields()
    {
        setEmail("");
        setPassword("");
    }
    function registerBtn()
    {
    
        if(email==""||password=="")
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
        
        let obj={email:email,password:password,name:name}
        adminSericeObj.verifyEmail(obj).then((data)=>
        {
            if(!data.data)
            {
                adminSericeObj.addAdmin(obj).then((data)=>
                {
                    if(data.data)
                    {
                        if(data.data)
                        {
                            alert("successfull");
                            clearFields();
                        }
                    }
                    else
                    {
                        setError(true);
                    }
                })
            }
            else{
                setError(true);
                setErrorMessage("Email Already Registered");
                return false;
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
                <input type='text' className='captcha-text-enter' style={captchaFlag?{border:'2px solid red'}:{}} onChange={(e)=>setEnteredCaptcha(e.target.value)}/>
                
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
    <AdminNavBar/>
    <div class=" container">
       <div className='card card3 col-3'>
            <div className='text-center mt-4'>
                <img src='./images/adminImages/adminPic.jpg' className='admin-pic'/>
                <div className='welcome-text'>New Admin</div>
            </div>
            <div className='text-center mt-3'>
                <i class="fa-solid fa-user"></i>
                <input type='text' style={error?{borderBottom: '2px solid red'}:{}} className="text-border-less" placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value);setError(false)}}/>
                <br/>
            </div>
            <div className='text-center mt-3'>
                <i class="fa-solid fa-user"></i>
                <input type="email" style={error?{borderBottom: '2px solid red'}:{}} className="text-border-less" placeholder='Email ID' value={email} onChange={(e)=>{setEmail(e.target.value);setError(false)}}/>
                <br/>
                {error?<label style={{color:'red'}}>{errorMessage}</label>:''}

            </div>
            <div className='text-center mt-3'>
                <i class="fa-solid fa-lock"></i>
                <input type='password'  style={error?{borderBottom: '2px solid red'}:{}} className="text-border-less" placeholder='Password'  value={password} onChange={(e)=>{setPassword(e.target.value);setError(false)}}/>
                <br/>
            </div>
            
            {captchaField()}
            <div className='text-center mt-3 mb-5'>
                <input type='submit' value='Register' className='login-btn bg-success' onClick={registerBtn}/>
            </div>
            
       </div>
    </div>
    </>
  );
}

export default AdminRegister;
