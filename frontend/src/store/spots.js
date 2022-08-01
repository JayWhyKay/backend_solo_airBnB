import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const LOAD_MY_SPOTS = "spots/loadMySpots";
const LOAD_SPOTS_BYID = "spots/loadSpotsById";
const DELETE_SPOT = "spots/deleteSpot";
const ADD_SPOT = "spots/addSpot";
const UPDATE_SPOT = "spots/updateSpot";

const loadS = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

const loadMyS = (spots) => {
  return {
    type: LOAD_MY_SPOTS,
    payload: spots,
  };
};

const loadSByID = (spots) => {
  return {
    type: LOAD_SPOTS_BYID,
    payload: spots,
  };
};

const deleteS = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId,
  };
};

const addS = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
  };
};

const updateS = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot,
  };
};

export const getSpots = () => async (dispatch) => {
  const response = await fetch("/listings");
  const data = await response.json();
  dispatch(loadS(data.Spots));
  return response;
};

export const getMySpots = () => async (dispatch) => {
  const response = await csrfFetch("/listings/mylistings");
  const data = await response.json();
  console.log(data);
  dispatch(loadMyS(data.Spots));
  return response;
};

export const getSpotById = (spotId) => async (dispatch) => {
  const response = await fetch(`/listings/${spotId}`);
  const data = await response.json();
  dispatch(loadSByID(data));
  return response;
};

export const removeSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/listings/${spotId}`, {
    method: "DELETE",
  });
  dispatch(deleteS(spotId));
  return response;
};

export const updateSpot = (spotInfo, id) => async (dispatch) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    imageURL
  } = spotInfo;
  const response = await csrfFetch(`/listings/${id}`, {
    method: "PATCH",
    headers: { CONTENT_TYPE: "application/json" },
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      imageURL
    }),
  });
  const data = await response.json();
  dispatch(updateS(data));
  return response;
};

export const addSpot = (spotInfo) => async (dispatch) => {
  const response = await csrfFetch(`/listings`, {
    method: "POST",
    headers: { CONTENT_TYPE: "application/json" },
    body: JSON.stringify(spotInfo),
  });

  const data = await response.json();
  dispatch(addS(data));
  return response;
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:
      newState = { ...state };
      action.payload.forEach((spot) => (newState[spot.id] = spot));
      newState.entries = action.payload;
      return newState;
    case LOAD_MY_SPOTS:
      newState = { ...state };
      action.payload.forEach((spot) => (newState[spot.id] = spot));
      newState.entries = action.payload;
      return newState;
    case LOAD_SPOTS_BYID:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case ADD_SPOT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_SPOT:
      newState = Object.assign({}, state);
      newState[action.payload] = null;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
