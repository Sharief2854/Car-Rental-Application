import axios from 'axios';
export let historyServiceObj = 
{
    getHistory,
    updateStatus,
    addToHistory,
    getUserHistory,
    getUserPrice,
    addPickupDetails,
    addReturnDetails,
    getUserKm,
    coinsUpdated
};

const url = "http://localhost:3005/userHistory/";
function coinsUpdated(obj)
{
    return axios.post(url+'coinsUpdated',obj);
}
function getUserKm(obj)
{
    return axios.post(url+'getUserKm',obj);
}
function getHistory()
{
    return axios.get(url+'getData');
}
function updateStatus(obj)
{
    return axios.put(url+'update',obj);
}
function addToHistory(obj)
{
    return axios.post(url+'add',obj);
}
function getUserHistory(obj)
{
    return axios.post(url+'getUserHistory',obj);
}
function getUserPrice(obj)
{
    return axios.post(url+'getUserPrice',obj);
}
function addPickupDetails(obj)
{
    return axios.put(url+'addPickupDetails',obj);
}
function addReturnDetails(obj)
{
    return axios.put(url+'addReturnDetails',obj);
}


