import axios from "axios";

export const loginUser = async (data) => {
  if (data) {
    if (data.length >= 4) {
      let errResponse;
      const user = await axios.post(`${process.env.REACT_APP_BACKEND}/user/login`, {name: data})
        .catch(e => { 
          errResponse = e.response.data;
        });
      
      if (user) {
        return {data: user.data, status: 'success'};
      }

      if (errResponse) {
        return errResponse;
      }
    } else {
      return 'Username must be more than 4 letters';
    }
  } else {
    return 'Username cannot be blank';
  }
}

export const registerUser = async (data) => {
  if (data) {
    if (data.length >= 4) {
      let errResponse;
      const user = await axios.post(`${process.env.REACT_APP_BACKEND}/user/signup`, {name: data})
        .catch(e => { 
          errResponse = e.response.data;
        });
      
      if (user) {
        return {data: user.data, status: 'success'};
      }

      if (errResponse) {
        return errResponse;
      }
    } else {
      return 'Username must be more than 4 letters';
    }
  } else {
    return 'Username cannot be blank';
  }
}