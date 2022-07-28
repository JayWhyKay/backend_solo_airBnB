import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { Link, useHistory } from "react-router-dom";
import "./Spots.css";

export default function Spots() {
  const history = useHistory()
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  // console.log(spots)
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const handleClick = (spotId) => {
    history.push(`/listings/${spotId}`)
  }

  return (
    <div className="spotContainer">
      {spots.entries &&
        spots.entries.map((spot) => {
          return (
            <div onClick={()=>handleClick(spot.id) } className="spotCard" key={"spotcard" + spot.id}>
              <img
                className="previewImg"
                src={[spot.previewImage[0]?.url]}
                alt="spot preview"
              />
              <span className="cityText">
                {spot.city}, {spot.state}
              </span>
              <div className="priceOut">
                <span className="price">${spot.price}</span> night
              </div>
            </div>
          );
        })}
    </div>
  );
}
