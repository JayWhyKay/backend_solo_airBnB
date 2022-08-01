import { csrfFetch } from "./csrf";

const LOAD_IMAGES = "reviews/loadImages";
const UPDATE_IMAGES = "reviews/updateImages";
const ADD_IMAGES = "reviews/addImages";
const DELETE_IMAGES = "reviews/deleteImages";


const addI = (image) => {
  return {
    type: ADD_IMAGES,
    payload: image,
  };
};

const deleteI = (imageId) => {
  return {
    type: DELETE_IMAGES,
    payload: imageId,
  };
};

export const addSpotImage = (spotId, imageURL) => async (dispatch) => {
  const response = await csrfFetch(`/images/listings/add/${spotId}`, {
    method: "POST",
    headers: { CONTENT_TYPE: "application/json" },
    body: JSON.stringify(imageURL),
  });

  const data = await response.json();
  dispatch(addI(data));
  return response;
};

export const addReviewImage = (reviewId, imageURL) => async (dispatch) => {
  const response = await csrfFetch(`/images/reviews/add/${reviewId}`, {
    method: "POST",
    headers: { CONTENT_TYPE: "application/json" },
    body: JSON.stringify(imageURL),
  });

  const data = await response.json();
  dispatch(addI(data));
  return response;
};

export const removeSpotImage = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/images/listings/${imageId}`, {
    method: "DELETE",
  });
    dispatch(deleteI(imageId));
  return response;
};

export const removeReviewImage = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/images/reviews/${imageId}`, {
    method: "DELETE",
  });
    dispatch(deleteI(imageId));
  return response;
};

const initialState = {};

const imagesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_IMAGES:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_IMAGES:
      newState = Object.assign({}, state);
      newState[action.payload] = null;
      return newState;
    default:
      return state;
  }
};

export default imagesReducer;
