import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyReviews, removeReview } from "../../store/reviews";
import ReviewModal from "../ReviewsModal";

function MySpotsReviews() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState();
  const reviews = useSelector((state) => state.reviews.entries);

  console.log(reviews);

  useEffect(() => {
    dispatch(getMyReviews()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const dateToString = (data) => {
    const date = new Date(data);
    const dateParams = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, dateParams);
  };

  const handleDelete = (reviewId) => {
    dispatch(removeReview(reviewId)).then(()=>dispatch(getMyReviews()))
  }

  return (
    <div>
      {isLoaded &&
        reviews.map((review) => (
          <div key={`review` + review.id} className="myreview__container">
            <div className="myreview__body">
              <div className="review__images">
                {review.images.length
                  ? review.images.map((image, i) => (
                      <img key={"reviewImg"+i} src={image.url} alt="review images" />
                    ))
                  : ""}
              </div>
              <div>
                <h3>Review for {review.Spot.name}</h3>
                <p>{review.Spot.city}, {review.Spot.state}</p>
                <p>{review.review}</p>
                <p className="review__date">{dateToString(review.createdAt)}</p>
              </div>
              <div>
                <ReviewModal spotId={review.SpotId} type="Edit My" reviewId={review.id} />
                <button
                  className="delete_button"
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
