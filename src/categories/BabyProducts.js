import React from 'react'
import BabyProductsCarouse from './BabyProductsCarouse'

export default function BabyProducts( { user }) {
  return (
    <div>
      <div>
        <div className='page-title'>
          Baby Products
        </div>
      </div>

      <div>
        <BabyProductsCarouse user={user} />
      </div>
    </div>
  )
}
