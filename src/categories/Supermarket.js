import React from 'react'
import "./supermarket.css"
import leftAdvert from '../components/imgs/supermarket.jpg';
import rightAdvert from '../components/imgs/top-ad.png';
import SupermarketCarousel from './SupermarketCarousel';
import Footer from '../layout/Footer';



function Supermarket( { user }) {


  return (
    <>
    <div className='entire-page'>

      <div className='page-title'>
        Supermarket
      </div>
      <div className='advert'>
        <img className="advert-image" src={leftAdvert} alt="advert" />
        <img className="advert-image" src={rightAdvert} alt="advert" />
      </div>
      <div>
        <SupermarketCarousel user={user} />
      </div>

    <Footer />
    </div>
    </>
  )
}

export default Supermarket