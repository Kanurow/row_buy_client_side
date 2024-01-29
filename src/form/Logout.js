import React from 'react';

import top from './row-buy-logo.png';
import bottom from "./row-buy-logo.png";

import "./Auth.css";
import Footer from '../layout/Footer';

export default function Logout() {


  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>
              <img className="row-buy-top" src={top} alt="top" />
              <h3>You have successfully logged out.</h3>
            </h2>
            <div>Thank your for shopping with us.</div>
          </div>
        </div> 
        <img className="row-buy-bottom" src={bottom} alt="top" />

      </div>
      <Footer />
    </>
  );
}
