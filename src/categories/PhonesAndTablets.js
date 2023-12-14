import React from 'react'
import PhonesAndTabletsCarousel from './PhonesAndTabletsCarousel'



function PhonesAndTablets( { user }) {
  return (
    <>
          <div className='page-title'>
            Phones And Tablets
          </div>

          <div>
            <PhonesAndTabletsCarousel user={user} />
          </div>
    </>
    
  )
}

export default PhonesAndTablets