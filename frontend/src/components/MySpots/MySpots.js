import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMySpots, removeSpot } from "../../store/spots";
import SpotModal from "../SpotModal";

function MySpots() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(getMySpots()).then(setIsLoaded(true));
  }, [dispatch]);

  const dateToString = (data) => {
    const date = new Date(data);
    const dateParams = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, dateParams);
  };

  const handleDelete = (spotId) => {
    dispatch(removeSpot(spotId)).then(() => dispatch(getMySpots()));
  };

  return (
    <div>
      {isLoaded &&
        spots.entries?.map((spot) => {
          return (
            <div className="mylisting_card" key={`mylistings` + spot.id}>
              <img
                className="my__preview__img"
                src={[spot.previewImage[0]?.url]}
                alt="spot preview"
              />
              <h3 className="card__name">{spot.name}</h3>
              <ul className="card__details">
                <li>{spot.address}</li>
                <li>
                  {spot.city}, {spot.state}
                </li>
                <li>{spot.description}</li>
                <li>
                  <span>${spot.price}</span> night
                </li>
                <li>Last Updated: {dateToString(spot.updatedAt)}</li>
              </ul>
              <div className="edit__listing__container">
                <SpotModal spotId={spot.id} type={"Edit Listing"} />
                <button
                  className="delete__spot__button"
                  onClick={() => handleDelete(spot.id)}
                >
                  Delete Listing
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MySpots;
