import React from 'react';
import './contactus.css';
import HomeNavBar from '../home-navbar/homeNavBar';

const ContactUs = () => {
  return (
      <div>
        <HomeNavBar></HomeNavBar>
        <div className="container contact-container">
          <h1>Contact Us</h1>
          <p>Have questions or need assistance? We're here to help!</p>
          <p>Feel free to reach out to us via phone or email:</p>
          <ul className="list-unstyled">
            <li><strong>Phone:</strong> 1-800-123-4567</li>
            <li><strong>Email:</strong> info@Carzy.com</li>
          </ul>
          <p>Alternatively, you can fill out the form below and we'll get back to you as soon as possible:</p>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea className="form-control" id="message" name="message" rows="4"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
  );
};

export default ContactUs;