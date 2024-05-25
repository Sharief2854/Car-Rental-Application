import axios from 'axios';
export let userSericeObj = 
{
    verifyEmailAndPass,
    verifyEmail,
    resetPassword,
    register,
    updateCoins,
    getCoins,
    updateProfile,
    getData
};

const url = "http://localhost:3005/user/";

function updateProfile(obj)
{
    return axios.put(url+'updateProfile',obj);
}function getData(obj)
{
    return axios.post(url+'getData',obj);
}
function verifyEmailAndPass(obj)
{
    return axios.post(url+'login',obj);
}
function verifyEmail(obj)
{
    return axios.post(url+'verifyEmail',obj);
}
function resetPassword(obj)
{
    return axios.put(url+'reset',obj);
}
function register(obj)
{
    return axios.post(url+'register',obj);
}
function updateCoins(obj)
{
    return axios.put(url+'updateCoins',obj); 
}
function getCoins(obj)
{
    return axios.post(url+'getCoins',obj); 
}


