import React from 'react';
import { Link} from 'react-router-dom';
import Footer from '../layout/Footer';
import top from './row-buy-logo.png';

const Signout = () => {

  return (
    <>
        <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>
              <img className="row-bank-top" src={top} alt="top" />
              <h3>Thank you for shopping with us!!!.</h3>
            </h2>
             

              <div className='mb-3'>

              </div>
              <Link className='btn btn-outline-danger mx-2' to="/login">Login</Link>
              <Link className='btn btn-outline-danger mx-2' to="/register">New User? Register</Link>
              <p>For further support, you may visit the Help Center or contact our customer service team.</p>
          </div>
        </div> 

      </div>
      <Footer />
    </>
  );
};

export default Signout;
