import React from 'react'
import AppliancesCarousel from './AppliancesCarousel'
import Footer from '../layout/Footer'
import "./Appliances.css"

export default function Appliances( {user}) {
  return (
    <>
    <div className='component'>
          <div>


        <div className='page-title'>
          Appliances
        </div>

    </div>

      <div>
        <AppliancesCarousel user={user}/>
      </div>
      
    </div>
    <Footer />
    </>
  )
}
