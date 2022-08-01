import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyReviews, removeReview } from "../../store/reviews";
import { getSpots } from "../../store/spots";
import ReviewModal from "../ReviewsModal";
import './MySpotsReviews.css'


function MySpotsReviews() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState();
  const reviews = useSelector((state) => state.reviews.entries);


  useEffect(() => {
    dispatch(getMyReviews()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const dateToString = (data) => {
    const date = new Date(data);
    const dateParams = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, dateParams);
  };

  const handleDelete = (reviewId) => {
    dispatch(removeReview(reviewId))
      .then(() => dispatch(getMyReviews()))
      .then(() => dispatch(getSpots()));
  };

  return (
    <div>
      {isLoaded &&
        reviews.map((review) => (
          <div key={`review` + review.id} className="myreview__container">
            <div className="myreview__body">
              <div>
                {review.images.length
                  ? review.images.slice(0,4).map((image, i) => (
                      <img
                        key={"reviewImg" + i}
                        src={image.url}
                        alt="review images"
                      />
                    ))
                  : <span className="review__images__error">No images were provided.</span>}
              </div>
              <div className="my_review__content">
                <h3>Review for {review.Spot.name}</h3>
                <p>
                  {review.Spot.city}, {review.Spot.state}
                </p>
                <p>
                  {review.stars} <i className="fa-solid fa-star"></i>
                </p>
                <p className="review__date">{dateToString(review.createdAt)}</p>
                <p>{review.review}</p>
              </div>
              <div>
                <ReviewModal
                  spotId={review.SpotId}
                  type="Edit My"
                  reviewId={review.id}
                />
                <button
                  className="delete_review_button"
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MySpotsReviews;
