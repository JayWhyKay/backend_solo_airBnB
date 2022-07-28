import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotById } from "../../store/spots";

function SpotByID() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots[+spotId]);

  useEffect(() => {
    dispatch(getSpotById(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  console.log(spots);
  return (
    isLoaded && (
      <div className="spotsByID__Container">
        <div>
          <h1>{spots.name}</h1>
          <span>{spots.avgStarRating[0].avgStarRating}</span>
          <span>{` * `}</span>
          <span>{spots.numReviews}</span>
          <span>{spots.city},</span>
          <span>{spots.state},</span>
          <span>{spots.country}</span>
        </div>
        <div className="spotById__Image">
          {spots.images.map((image, i) => {
            return (
              <img
                className={`img__by__id__${i}`}
                key={"image" + i}
                src={image.url}
                alt="spot images"
              />
            );
          })}
        </div>
        <div>
          <h2>
            Hosted by {spots.Owner.firstName} {spots.Owner.lastName}
          </h2>
        </div>
        <div>Dedicated workspace</div>
        <div>
          <p>{spots.description}</p>
        </div>
        <div>Amenities</div>
        <div>Reviews</div>
      </div>
    )
  );
}

export default SpotByID;
