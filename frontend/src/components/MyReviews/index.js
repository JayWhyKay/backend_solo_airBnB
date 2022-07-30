import React from 'react'
import MySpotsReviews from './MySpotsReviews'
import './MyReviews.css'

function MyReviews() {
  return (
    <div>
      <div className='my__reviews__container'>
      <h2>Reviews by User:</h2>
        <MySpotsReviews />
      </div>
    </div>
  )
}

export default MyReviews
