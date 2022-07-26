import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const DELETE_SPOT = "spots/deleteSpot";
const ADD_SPOT = "spots/addSpot";
const UPDATE_SPOT = "spots/updateSpot";

const loadS = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

const deleteS = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId
  };
};

const addS = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot
  };
};

const updateS = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot
  };
};

export const getSpots = () => async dispatch => {
  const response = await fetch('/listings');
  const data = await response.json();
  dispatch(loadS(data.Spots));
  return response;
};

export const getMySpots = () => async dispatch => {
  const response = await csrfFetch('/listings/myspots');
  const data = await response.json();
  dispatch(loadS(data));
  return response;
};

export const getSpotById = spotId => async dispatch => {
  const response = await fetch(`/listings/${spotId}`);
  const data = await response.json();
  dispatch(loadS(data));
  return response;
};

export const removeSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/listings/${spotId}`, {
    method: 'DELETE',
  });
  if(response.ok){
    dispatch(deleteS(spotId));
  }
  return response;
};

export const updateSpot = (spotInfo) => async (dispatch) => {
  const response = await csrfFetch(`/listings/${spotInfo.id}`, {
    method: "PATCH",
    headers: {"CONTENT_TYPE": "application/json"},
    body: JSON.stringify(spotInfo),
  });
  const data = await response.json();
  dispatch(updateS(data));
  return response;
};

export const addSpot = (spotInfo) => async (dispatch) => {
  const response = await csrfFetch(`/listings`, {
    method: "POST",
    headers: {"CONTENT_TYPE":"application/json"},
    body: JSON.stringify({spotInfo}),
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
      newState = {};
      action.payload.forEach(spot => newState[spot.id] = spot)
      return {
        ...newState,
        entries: action.payload
      };
    case DELETE_SPOT:
      newState = Object.assign({}, state);
      newState = null;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
