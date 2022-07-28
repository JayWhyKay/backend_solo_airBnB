import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpotReviews } from '../../store/reviews'

function Reviews({spotId}) {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const reviews = useSelector(state => state.reviews.entries)

  useEffect(() => {
    dispatch(getSpotReviews(spotId)).then(()=>setIsLoaded(true))
  },[dispatch,spotId])

  const dateToString = (data) => {
    const date = new Date(data);
    const dateParams = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, dateParams);
  };

  return (
    <div>
      {
        isLoaded && reviews.map(review => {
          return(
          <div key={`review` + review.id} className='review_container'>
            <div>
              <p>
                {review.User.firstName}
              </p>
              <i className="fa-solid fa-star"></i>
              <p>{review.stars}</p>
              <span>{dateToString(review.updatedAt)}</span>
            </div>
            <div>{review.review}</div>
          </div>
          )
        })
      }
    </div>
  )
}

export default Reviews
