import axios from 'axios';
export let adminSericeObj = 
{
    verifyEmailAndPass,
    verifyEmail,
    resetPassword,
    getData,
    updateProfile,
    addAdmin
};

const url = "http://localhost:3005/admin/";

function updateProfile(obj)
{
    return axios.put(url+'updateProfile',obj);
}
function addAdmin(obj)
{
    return axios.post(url+'register',obj);
}
function getData(obj)
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
