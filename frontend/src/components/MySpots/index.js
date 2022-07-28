import React from 'react'
import SpotModal from '../SpotModal'
import MySpots from './MySpots'

function MySpotsLanding() {
  return (
    <div>
      <div className="spots__landing__container">
        <div className='landing__title'>
          <h1>My listings</h1>
          <div className='create__newSpot'>
            <SpotModal spotId='' type='Host new listing' />
          </div>
        </div>
        <div className='existing__spots'>
          <h2>Manage My Listings</h2>
          <MySpots />
        </div>
      </div>
    </div>
  )
}

export default MySpotsLanding
