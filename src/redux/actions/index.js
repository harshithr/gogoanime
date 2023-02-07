export const toggleAuth = (data) => {
  return {
    type: "TOGGLE_AUTH",
    payload: data
  }
}

export const getLoggedIn = () => async (dispatch) => {
  let status = await localStorage.getItem('username');
  let user = JSON.parse(status);
  dispatch({
    type: "FETCH_LOGGED",
    payload: user
  })
}

export const setLoggedIn = (data) => {
  return {
    type: "SET_LOGGED",
    payload: data
  }
}

export const toggleMyAnimeSection = (data) => {
  return {
    type: "TOGGLE_MYANIME",
    payload: data
  }
}