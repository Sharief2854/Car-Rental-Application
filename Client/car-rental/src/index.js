import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminLogin from './components/admin-login/adminLogin';
import Blog from './components/blogs/blogs';
import UserProtectedRoute from './components/protectedRoutes/user/userProtectedRoutes';
import UserLogin from './components/user-login/userLogin';
import ForgetPassword from './components/forget-pass/fogetPassword';
import AdminHome from './components/admin-home-page/home/home';
import { UserRegister } from './components/user-register/userRegister';
import UserHome from './components/user-home-page/home/userHome';
import AvailableCars from './components/cars/available-cars/availableCars';
import AboutUs from './components/aboutus/aboutus';
import ContactUs from './components/contactus/contactus';
import AdminProtectedRoute from './components/protectedRoutes/admin/adminProtectedRoutes';
import CrudCars from './components/admin-home-page/car-crud/crudCars';
import BookingStatus from './components/user-home-page/booking-status/bookingStatus';
import UserCoins from './components/user-home-page/userCoins/userCoins';
import AdminProfile from './components/admin-home-page/admin-profile/adminProfile';
import UserProfile from './components/user-home-page/user-profile/userProfile';
import AdminRegister from './components/admin-home-page/admin-register/adminRegisteer';

const routing=(
  <Router>
    
    <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/aboutUs" element={<AboutUs/>} />
          <Route path="/contactUs" element={<ContactUs/>} />
          <Route path="/blogs" element={<Blog/>} />

          <Route path="/admin/profile" element={<AdminProfile/>} />
          <Route path="/user/profile" element={<UserProfile/>} />


          <Route path="/admin/forgetPassword" element={<ForgetPassword/>} />
          
          
          <Route path="/adminRegister" element={<AdminRegister/>} />
          
          <Route path="/adminLogin" element={<AdminLogin/>} />
          <Route path="/userLogin" element={<UserLogin/>} />
          <Route path="/userRegister" element={<UserRegister/>} />

          <Route path="/availableCars" element={<AvailableCars/>} />
          <Route path="/carCrud" element={<CrudCars/>} />
          <Route path="/bookingStatus" element={<BookingStatus/>} />
          <Route path="/userCoins" element={<UserCoins/>} />
          

          <Route path="/adminHome" element={
            <AdminProtectedRoute  returnUrl="/adminHome">
              <AdminHome/>
            </AdminProtectedRoute>
            
          } />

          <Route path="/userHome" element={
            <UserProtectedRoute  returnUrl="/userHome">
              <UserHome/>
            </UserProtectedRoute>
          } />
    </Routes>
</Router>
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
