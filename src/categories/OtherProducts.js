import React from 'react'
import OtherProductsCarousel from './OtherProductsCarousel'

export default function OtherProducts({ user }) {
  return (
    <>
    <div>
    

      <div className='page-title'>
        Others - A Flexible Category
      </div>
    </div>


    <div>
      <OtherProductsCarousel user={user} />
    </div>
    
    </>
    
  )
}
