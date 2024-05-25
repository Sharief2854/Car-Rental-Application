import axios from 'axios';
export let otpSericeObj = 
{
    sendOtp,
    verifyOtp
};

const url = "http://localhost:3005/forgetPassword/";

function sendOtp(obj)
{
    return axios.post(url+'sendOtp',obj);
}
function verifyOtp(obj)
{
    return axios.post(url+'verifyOtp',obj);
}
