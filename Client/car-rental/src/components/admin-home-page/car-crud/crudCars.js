import React, { useEffect, useState } from 'react';
import './crudCars.css';
import { carSericeObj } from '../../car-service/carService';
import AdminNavBar from '../navbar/navbar';
import { useNavigate } from 'react-router-dom';

function CrudCars()
{
    const[totalCars,setTotalCars]=useState([]);
    const[editFild,setEditField]=useState(false);
    const[brand,setBrand]=useState("");
    const[model,setModel]=useState("");
    const[type,setType]=useState("");
    const[price,setPrice]=useState("");
    const[tax,setTax]=useState("");
    const[discount,setDiscount]=useState("");
    let navigate=useNavigate();
    const adminToken = sessionStorage.getItem('admin-token');
		
        if (!adminToken || adminToken === 'undefined') 
		{
           navigate('/adminLogin');
        }
    // const[totalprice,setTotalPrice]=useState("");
    
    function clearFields()
    {
        setBrand("");
        setModel("");
        setPrice("");
        setTax("");
        setDiscount("");
        setType("");

    }
    function setFields(obj)
    {
        setBrand(obj.brand);
        setModel(obj.model);
        setPrice(obj.price);
        setTax(obj.tax);
        setDiscount(obj.discount);
        setType(obj.car);

    }
    function getData()
    {
        carSericeObj.getAllCars().then((data)=>
        {
            setTotalCars(data.data)
            
        })
    }
    function addCar()
    {
        
        let obj={};
        obj.brand=brand;
        obj.model=model;
        obj.price=price;
        obj.totalprice=(Number(price)+(price*(tax/100)))-(price*(discount/100));
        obj.tax=tax;
        obj.discount=discount;
        obj.car=type;
        // console.log(obj);

        carSericeObj.addCar(obj).then((data)=>
        {
            // console.log(data.data)
            alert("Card details added");
            clearFields();
        })
    }
function deleteCarbtn(m)
{
    if(!window.confirm("click ok to delete"))
    {
        return false;
    }
    let obj={};
    obj.model=m;
    // console.log(obj);
    carSericeObj.deleteCar(obj).then((data)=>
    {
        // console.log(data.data);
        alert("car details deleted ");
    })
}

function updateCar()
{
    let obj={};
        obj.brand=brand;
        obj.model=model;
        obj.price=price;
        obj.totalprice=(Number(price)+(price*(tax/100)))-(price*(discount/100));
        obj.tax=tax;
        obj.discount=discount;
        obj.car=type;
        // console.log(obj);
        carSericeObj.updateCar(obj).then((data)=>
        {
            alert("updated succesfully");
            setEditField(false);
            clearFields();
        })
}
    function updateFieldBtn(obj)
    {
        setEditField(true)
        setFields(obj);
    }

    function carsTable()
    {
        let details=totalCars.map((obj)=>
        {
            return(
                <tr className='border'>
                    <td>{obj.brand}</td>
                    <td>{obj.model}</td>
                    <td>{obj.car}</td>
                    <td>Rs.{obj.price}</td>
                    <td>{obj.tax}%</td>
                    <td>{obj.discount}%</td>
                    <td>Rs.{obj.totalprice}</td>
                    <td>
                        <i class="fa-solid fa-trash" onClick={()=>deleteCarbtn(obj.model)}></i>
                        <i class="fa-solid fa-pen-to-square" onClick={()=>updateFieldBtn(obj)}></i>
                        </td>
                </tr>
            )
        })
        return(
        <div>
            <table className='table container4 mt-4'>
                <tr>
                    <th>Brand</th>
                    <th>Molde</th>
                    <th>Car Type</th>
                    <th>Price</th>
                    <th>Tax</th>
                    <th>Discount</th>
                    <th>Total Price</th>
                    <th></th>
                </tr>
                {details}
            </table>
        </div>
        )
    }
    function formField()
    {
        return(
            <>
            <div className='row add-form mt-4'>
                <div className='col'>
                    <input type='text' className='form-control' placeholder='Brand' onChange={(e)=>setBrand(e.target.value)} value={brand}/>
                </div>
                <div className='col'>
                    <input type='text' className='form-control'placeholder='Model' onChange={(e)=>setModel(e.target.value)} value={model}/>
                </div>
                <div className='col'>
                    <input type='text' className='form-control'placeholder='Type of Car' onChange={(e)=>setType(e.target.value)} value={type}/>
                </div>
                <div className='col'>
                    <input type='text' className='form-control'placeholder='price' onChange={(e)=>setPrice(e.target.value)} value={price}/>
                </div>
                <div className='col'>
                    <input type='text' className='form-control'placeholder='Tax' onChange={(e)=>setTax(e.target.value)} value={tax}/>
                </div>
                <div className='col'>
                    <input type='text' className='form-control'placeholder='Discount' onChange={(e)=>{setDiscount(e.target.value)}} value={discount}/>
                </div>
                <div className='col text-white mt-2'>
                    <h6 >Total Price:Rs.{(Number(price)+(price*(tax/100)))-(price*(discount/100))}</h6>
                </div>
                
                <div className='col' style={editFild?{display:'none'}:{display:'block'}}>
                    <input type='submit' className='btn btn-success' value='Add' onClick={addCar}/>
                </div>
                <div className='col' style={!editFild?{display:'none'}:{display:'block'}}>
                    <input type='submit' className='btn btn-success' value='Update' onClick={updateCar}/>
                </div>
                
            </div>
            </>
        )
    }
    function editCarFild()
    {
        return(
            <div className='edit-field'>
                <div className='edit-form'>
                <i class="fa-solid fa-xmark cancel" onClick={()=>setEditField(false)} ></i>
                    {formField()}
                </div>
            </div>
        )
    }
    useEffect(()=>
    {
        getData();
    })

    return(
        <>
        <div>
            <AdminNavBar></AdminNavBar>
            {editFild?null:formField()}
            {editFild?editCarFild():carsTable()}
        </div>
           
        </>
    )

}
export default CrudCars;