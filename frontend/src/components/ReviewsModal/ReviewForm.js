import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  updateReview,
  getMyReviews,
  getSpotReviews,
} from "../../store/reviews";
import { getSpotById } from "../../store/spots";
import "./ReviewForm.css";
import Stars from "./Stars";

function ReviewForm({ type, onClose, spotId, reviewId }) {
  const dispatch = useDispatch();
  const editReview = useSelector((state) => state.reviews[reviewId]);
  const [stars, setStars] = useState(editReview ? editReview.stars : 5);
  const [review, setReview] = useState(editReview ? editReview.review : "");
  const [focus, setFocus] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const reviewData = { stars, review };

    if (reviewId) {
      dispatch(updateReview(reviewId, reviewData))
        .then(() => onClose())
        .catch(async (res) => {
          const data = await res.json();
          if (data) setErrors(data.errors);
        })
        .then(() => dispatch(getMyReviews()));
    } else {
      dispatch(addReview(spotId, reviewData))
        .then(() => onClose())
        .catch(async (res) => {
          const data = await res.json();
          console.log();
          if (data) setErrors([data.message]);
        })
        .then(() => dispatch(getSpotReviews(spotId)))
        .then(() => dispatch(getSpotById(spotId)));
    }
  };
  return (
    <div className="review__form__container">
      <div className="review__form__header">
        <button className="review__form__close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <p className="review__title">{type} Review</p>
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors &&
            errors.map((error) => (
              <li key={error} className="error__form">
                {error}
              </li>
            ))}
        </ul>
        <div className="form__entry">
          <Stars
            setStars={setStars}
            setFocus={setFocus}
            stars={stars}
            focus={focus}
          />
        </div>
        <div className="form__entry">
          <label>
            Tell us more about your experience:
            <textarea
              rows="5"
              cols="45"
              maxLength="250"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
        </div>
        <div className="form__entry">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
