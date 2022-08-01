import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpotReviews } from '../../store/reviews'

function ReviewStars({spotId}) {
  const dispatch = useDispatch()
  const results = useSelector(state => Object.values(state.reviews));
  console.log(results)
  const reviews = results.filter(review => review.spotId === Number(spotId));

  useEffect(() => {
    dispatch(getSpotReviews(spotId))
  }, [dispatch, spotId])

  let sum = 0
  reviews.forEach(review => {
    sum += review.stars
  });
  const avgStarRating = (sum/reviews.length).toFixed(1)

  return (
    <div>
      <i className="fa-solid fa-star"></i>
      <span className='avg-rating'>{avgStarRating === 'NaN' ? 'New' : avgStarRating}</span>
    </div>
  )
}

export default ReviewStars
