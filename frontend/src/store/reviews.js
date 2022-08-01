import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/loadReviews";
const UPDATE_REVIEW = "reviews/updateReviews";
const ADD_REVIEW = "reviews/addReviews";
const DELETE_REVIEW = "reviews/deleteReviews";

const loadR = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
  };
};

const addR = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review,
  };
};

const updateR = (review) => {
  return {
    type: UPDATE_REVIEW,
    payload: review,
  };
};

const deleteR = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId,
  };
};

export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/reviews/listings/${spotId}`);
  const data = await response.json();
  dispatch(loadR(data.Reviews));
  return response;
};

export const getMyReviews = () => async (dispatch) => {
  const response = await csrfFetch("/reviews/myreviews");
  const data = await response.json();
  console.log(data)
  dispatch(loadR(data.Reviews));
  return response;
};

export const addReview = (spotId, reviewData) => async (dispatch) => {
  const response = await csrfFetch(`/reviews/listings/${spotId}`, {
    method: "POST",
    headers: { CONTENT_TYPE: "application/json" },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();
  dispatch(addR(data));
  return response;
};

export const updateReview = (reviewId, reviewData) => async (dispatch) => {
  const response = await csrfFetch(`/reviews/myreviews/${reviewId}`, {
    method: "PATCH",
    headers: { CONTENT_TYPE: "application/json" },
    body: JSON.stringify(reviewData),
  });
  const data = await response.json();
  dispatch(updateR(data));
  return response;
};

export const removeReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/reviews/myreviews/${reviewId}`, {
    method: "DELETE",
  });
    dispatch(deleteR(reviewId));
  return response;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_REVIEWS:
      newState = { ...state };
      action.payload.forEach((spot) => (newState[spot.id] = spot));
      newState.entries = action.payload;
      return newState;
    case ADD_REVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_REVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
