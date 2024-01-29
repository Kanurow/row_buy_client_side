import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import top from './row-buy-logo.png';
import bottom from "./row-buy-logo.png";

import "./Auth.css";
import Footer from '../layout/Footer';

export default function Signin() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const { usernameOrEmail, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://jumia-clone-rowland.onrender.com/api/auth/signin', {
        usernameOrEmail,
        password,
      });

      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);

      const headers = {
        'Content-Type': 'application/json',
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      axios.defaults.headers = headers;

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>
              <img className="row-buy-top" src={top} alt="top" />
              <h3>Welcome to Jumia.</h3>
            </h2>
            <form onSubmit={onSubmit}>
              <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                  Username/E-mail
                </label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Enter Username or E-mail Address'
                  name='usernameOrEmail'
                  value={usernameOrEmail}
                  onChange={onInputChange}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='Email' className='form-label'>
                  Password
                </label>
                <input
                  type="password"
                  className='form-control'
                  placeholder='Enter Password'
                  name='password'
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              <button type='submit' className='execute btn btn-outline-info'>Sign In</button>

              <Link className='btn btn-outline-danger mx-2' to="/register">New User? Register</Link>
              <p>For further support, you may visit the Help Center or contact our customer service team.</p>
            </form>
          </div>
        </div> 
        <img className="row-buy-bottom" src={bottom} alt="top" />

      </div>
      <Footer />
    </>
  );
}
