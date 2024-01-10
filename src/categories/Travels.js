import React from 'react'
import "./travels.css"
import imgAdvertLeft from '../components/imgs/bed.jpg';
import imgAdvertRight from '../components/imgs/travels.jpg';
import TravelsCarousel from './TravelsCarousel';


function Travels( {user}) {


  return (
    <>
    <div className='entire-page'>

      <div className='page-title'>
        Travels And Bookings
      </div>
      <div className='advert'>
        <img className="advert-image" src={imgAdvertLeft} alt="advert" />
        <img className="advert-image" src={imgAdvertRight} alt="advert" />
      </div>




      <div>
        <TravelsCarousel user={user} />
      </div>

    </div>
    </>
  )
}

export default Travels;
