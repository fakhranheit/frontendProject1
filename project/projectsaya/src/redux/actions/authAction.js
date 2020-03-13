import { USER_LOGIN_SUCCESS, USER_LOGOUT, AUTH_LOADING, AUTH_LOGIN_ERROR, AUTH_REGISTER, AUTH_SYSTEM_ERROR, AUTH_REGISTER_ERROR } from "./types";
import Axios from "axios";
import { APIURL } from "../../helper/apiurl";

export const registerUser = ({ username, password, email }) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING });
    if (username === "" || password === "" || email === "") {
      dispatch({ type: AUTH_REGISTER_ERROR, payload: "form wajib diisi" });
    } else {
      Axios.post(`${APIURL}auth/registerusers`, {
        username,
        password,
        email
      })
        .then(res => {
          console.log(res);
          if (res.data.status === "error register") {
            dispatch({ type: AUTH_REGISTER_ERROR, payload: res.data.message });
          } else {
            localStorage.setItem("username", res.data.username);
            dispatch({ type: AUTH_REGISTER, payload: res.data });
          }
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: AUTH_SYSTEM_ERROR, payload: { error: "system error" } });
        });
    }
  };
};


export const reLogin = res => {
  return dispatch => {
    // localStorage.setItem("username", res.username);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res });
  };
};

export const logOut = () => {
  return dispatch =>
    dispatch({ type: USER_LOGOUT });
};

export const loginAction = (username, password) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING });

    Axios.get(`${APIURL}auth/login`, {
      // username, password
      params: {
        username,
        password
      }
    }).then(res => {
      console.log(res.data);
      if (res.data.status !== "error") {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.result });
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("id", res.data.id);
        window.location.reload();
      } else if (res.data.status === 'error') {
        dispatch({ type: AUTH_LOGIN_ERROR, payload: res.data.status });
      }
    });
  };
};