import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSpot, getMySpots, updateSpot } from "../../store/spots";
import "./SpotForm.css";

function SpotForm({ spotId, onClose, type }) {
  const dispatch = useDispatch();
  const editSpot = useSelector((state) => state.spots[spotId]);
  const [address, setAddress] = useState(editSpot ? editSpot.address : "");
  const [city, setCity] = useState(editSpot ? editSpot.city : "");
  const [state, setState] = useState(editSpot ? editSpot.state : "");
  const [country, setCountry] = useState(editSpot ? editSpot.country : "");
  const [lat, setLat] = useState(editSpot ? editSpot.lat : "");
  const [lng, setLng] = useState(editSpot ? editSpot.lng : "");
  const [name, setName] = useState(editSpot ? editSpot.name : "");
  const [description, setDescription] = useState(
    editSpot ? editSpot.description : ""
  );
  const [price, setPrice] = useState(editSpot ? editSpot.price : "");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const spotInfo = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    if (spotId) {
      dispatch(updateSpot(spotInfo, spotId))
        .then(() => onClose())
        .catch(async (res) => {
          const data = await res.json();
          if (data) setErrors(Object.values(data.errors));
        })
        .then(() => dispatch(getMySpots()));
    } else {
      dispatch(addSpot(spotInfo))
        .then(() => onClose())
        .catch(async (res) => {
          const data = await res.json();
          if (data) setErrors(Object.values(data.errors));
        })
        .then(() => dispatch(getMySpots()));
    }
  };

  return (
    <div className="spots__form">
      <div className="spots_form__title">
        <span>{type}</span>
        <button className="spots_form__close_btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error) => (
            <li key={error} className="error__form">
              {error}
            </li>
          ))}
        </ul>
        <div className="form-element">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label>Latitude</label>
          <input
            type="number"
            value={lat}
            max="90"
            min="-90"
            step="0.000001"
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label>Longitude</label>
          <input
            type="number"
            value={lng}
            max="180"
            min="-180"
            step="0.000001"
            onChange={(e) => setLng(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label>Name</label>
          <input
            type="text"
            value={name}
            maxLength="50"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-element description">
          <label>Description</label>
          <textarea
            rows="3"
            cols="53"
            value={description}
            maxLength="250"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-element">
          <label>Price</label>
          <input
            type="number"
            value={price}
            min="0"
            step="0.01"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {/* <div className="form-element">
        <label>
          Image url
          <input
            type="text"
            value={previewImage}
            maxLength="250"
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
        </label>
      </div> */}
        <div className="form-element__submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SpotForm;
