import axios from 'axios';
export let carSericeObj = 
{
    getAllCars,
    addCar,
    deleteCar,
    updateCar
};

const url = "http://localhost:3005/car/";

function getAllCars()
{
    return axios.get(url+"allCars");
}
function addCar(obj)
{
    return axios.post(url+"addCar",obj);
}
function deleteCar(obj)
{
    return axios.post(url+"deleteCar",obj);
}
function updateCar(obj)
{
    return axios.put(url+"updateCar",obj);
}




