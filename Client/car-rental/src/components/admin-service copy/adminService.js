import axios from 'axios';
export let adminSericeObj = 
{
    verifyEmailAndPass,
    verifyEmail,
    resetPassword
};

const url = "http://localhost:3005/admin/";

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
