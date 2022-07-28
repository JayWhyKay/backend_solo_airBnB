import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const signup = (user) => async (dispatch) => {
  // const { firstName, lastName, email, password } = user;
  const response = await csrfFetch("/user/sign-up", {
    method: "POST",
    headers: {"CONTENT_TYPE": "application/json"},
    body: JSON.stringify(user),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/user', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch(`/user`, {
    method: "POST",
    headers: {"CONTENT_TYPE":"application/json"},
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/user');
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};


const initialState = {};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({});
      newState.user = action.payload;
      return {...newState};
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
