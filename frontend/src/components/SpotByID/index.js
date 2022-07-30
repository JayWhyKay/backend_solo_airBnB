import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotById } from "../../store/spots";
import Reviews from "../Reviews";
import ReviewModal from "../ReviewsModal";
import "./SpotByID.css";

function SpotByID() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots[+spotId]);

  useEffect(() => {
    dispatch(getSpotById(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  return (
    isLoaded && (
      <div className="spotsByID__Container">
        <div className="spotsByID__header">
          <h1>{spots.name}</h1>
          <div className="spotByID_details">
            <i className="fa-solid fa-star"></i>
            <span> {spots.avgStarRating[0].avgStarRating}</span>
            <span>{` · `}</span>
            <span>{spots.numReviews} reviews</span>
            <span>{` · `}</span>
            <span>
              <i class="fa-solid fa-award"></i> Superhost
            </span>
            <span>{` · `}</span>
            <span>{spots.city}, </span>
            <span>{spots.state}, </span>
            <span>{spots.country}</span>
          </div>
        </div>
        <div className="spotById__Image">
          {spots.images.length ? spots.images.slice(0,5).map((image, i) => {
            return (
              <img
                className={`img__by__id__${i}`}
                key={"image" + i}
                src={image.url}
                alt="spot images"
              />
            )
          }): <span>No images were provided.</span>}
        </div>
        <div className="spotById__details__header">
          <h2 className="spotById__host__name">
            Listing hosted by {spots.Owner.firstName} {spots.Owner.lastName}
          </h2>
          <span className="spotById__host__detail">
            3 guests · 1 bedroom · 3 beds · 1 bath
          </span>
        </div>
        <div className="spotById__features__container">
          <div className="spotById__feature__card">
            <div className="feature__card__icon">
              <i className="fa-solid fa-award fa-xl"></i>
            </div>
            <div className="spotById__feature__content">
              <h3 className="spotById__feature__title">
                {spots.Owner.firstName} is a Superhost
              </h3>
              <span>
                Superhosts are experienced, highly rated hosts who are committed
                to providing great stays for guests.
              </span>
            </div>
          </div>
          <div className="spotById__feature__card">
            <div className="feature__card__icon">
              <i className="fa-solid fa-house-laptop fa-xl"></i>
            </div>
            <div className="spotById__feature__content">
              <h3 className="spotById__feature__title">Dedicated workspace</h3>
              <span>{`A common area with wifi that’s well-suited for working.`}</span>
            </div>
          </div>
          <div className="spotById__feature__card">
            <div className="feature__card__icon">
              <i className="fa-solid fa-door-open fa-xl"></i>
            </div>
            <div className="spotById__feature__content">
              <h3 className="spotById__feature__title">Self check-in</h3>
              <span>Check yourself in with the lockbox.</span>
            </div>
          </div>
        </div>
        <div className="spotById__description">
          <h3>Learn more about this listing:</h3>
          <span>{spots.description}</span>
        </div>
        <div>Amenities</div>
        <div className="review__byId__container">
          <div className="review_byId_header">
            <div>
              <i className="fa-solid fa-star"></i>
              <span>{spots.avgStarRating[0].avgStarRating}</span>
              <span>{` · `}</span>
              <div>{`${spots.numReviews} reviews`}</div>
            </div>
            <div className="add__review__button">
              <ReviewModal

                spotId={spots.id}
                type="Add New"
                reviewId=""
              />
            </div>
          </div>
          <div className="reviews__body">
            <Reviews spotId={spots.id} />
          </div>
        </div>
      </div>
    )
  );
}

export default SpotByID;
