import { combineReducers } from 'redux';

const signupOrLogin = (state = null, action) => {
  switch (action.type) {
    case "TOGGLE_AUTH":
      return action.payload;
    default:
      return state;
  }
}

const checkLogged = (state = null, action) => {
  switch (action.type) {
    case "FETCH_LOGGED":
      return action.payload;
    case "SET_LOGGED":
      return action.payload;
    default:
      return state;
  }
}

const myAnimeSection = (state = null, action) => {
  switch (action.type) {
    case "TOGGLE_MYANIME":
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  signupOrLogin,
  checkLogged,
  myAnimeSection
})