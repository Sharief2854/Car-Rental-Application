import React, { useEffect, useState } from 'react';
import AdminNavBar from '../navbar/navbar';
import { adminSericeObj } from '../../admin-service/adminService';
import './adminProfile.css';
import { useNavigate } from 'react-router-dom';

function AdminProfile()
{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[editFieldFlag,setEditFieldFlag]=useState(false);
    let navigate=useNavigate();
    const adminToken = sessionStorage.getItem('admin-token');
		
        if (!adminToken || adminToken === 'undefined') 
		{
           navigate('/adminLogin');
        }
    function getData()
    {
        adminSericeObj.getData({email:localStorage.getItem('email')}).then((data)=>
        {
            if(data.data)
            {
                setName(data.data.name);
                setEmail(data.data.email);
                setPassword(data.data.password);
            }
        })
    }
    
    useEffect(()=>
    {
        getData();
    },[])
    function adminDetailsField()
    {
        
        return(
            <>
                <div className='row'>
                    <div className='col-4 offset-4 mt-5 '>
                        <div className='card '>
                            <div className='card-header'>
                                <span>Profile</span>
                            </div>
                             <div className='card-body'>
                                <div className='mt-2'>
                                    Name:<b>{name}</b>
                                </div>
                                <div className='mt-3'>
                                    Email:<b>{email}</b>
                                </div> 
                                <div className='mt-3'>
                                    password:<b>********</b>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <button className='btn btn-danger' onClick={()=>setEditFieldFlag(true)}>Edit Profile</button>
                                <button className='btn btn-secondary' onClick={()=>{if(window.confirm("Click ok to logout"))sessionStorage.clear();window.location.reload()}}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function adminEditField()
    {
        function editBtn()
        {
            let obj={};
            obj.name=name;
            obj.password=password;
            obj.email=email;
            adminSericeObj.updateProfile(obj).then((data)=>
            {
                if(data.data)
                {
                    alert("updated");
                    setEditFieldFlag(false);
                }
            })
        }
        return(
            <>
                <div className='row'>
                    <div className='col-4 offset-4 mt-5 '>
                        <div className='card '>
                            <div className='card-header'>
                                <i class="fa-solid fa-xmark cancel-mark" onClick={()=>setEditFieldFlag(false)}></i>

                                <span>Edit Profile</span>
                            </div>
                             <div className='card-body '>
                                <div className='mt-2'>
                                    Name:<input type='text'  value={name} className='form-control mt-2' onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className='mt-3'>
                                    Email:<input type='text' value={email} className='form-control mt-2' readOnly/>
                                </div> 
                                <div className='mt-3'>
                                    password:<input type='text'  value={password} className='form-control mt-2' onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <button className='btn btn-danger' onClick={()=>editBtn()}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return(
        <>
            <AdminNavBar/>
            {editFieldFlag?adminEditField():adminDetailsField()}
        </>
    )
}
export default AdminProfile;