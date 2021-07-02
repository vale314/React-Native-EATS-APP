import { AsyncStorage } from "react-native";
import axios from "axios";

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

import { alert } from "./alert";

const path = "https://cucei-eats.herokuapp.com";
// const path = "http://192.168.1.98:5000";

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (
  email,
  password,
  firstname,
  lastname,
  code,
  cellphone
) => {
  return async (dispatch) => {
    if (!email.includes("udg.mx")) {
      return alert("UDG Solamente", "Correo No Es Universitario");
    }
    const response = await fetch(`${path}/api/seller/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        user_password: password,
        firstname: firstname,
        lastname: lastname,
        cellphone: cellphone,
        code: code,
        image: "image",
      }),
    });

    // const response = await axios.post(
    //   `${path}/api/seller/new`,
    //   JSON.stringify({
    //     email: email,
    //     user_password: password,
    //     firstname: firstname,
    //     lastname: lastname,
    //     cellphone: cellphone,
    //     code: code,
    //     image: "image",
    //   }),
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const resData = await response.json();

    if (resData.error) {
      const error = resData.msg;
      // Dispatch error

      return alert("Hay Un Error", error);
    }

    dispatch(
      authenticate(resData.localId, resData.token, parseInt(resData.expires))
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expires)
    );
    saveDataToStorage(resData.token, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    if (!email.includes("udg.mx")) {
      return alert("UDG Solamente", "Correo No Es Universitario");
    }

    const response = await fetch(`${path}/api/seller/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        user_password: password,
      }),
    });

    // const response = await axios.post(
    //   `${path}/api/seller/login`,
    //   JSON.stringify({
    //     email: email,
    //     user_password: password,
    //   }),
    //   {
    //     headers: {
    //       // Overwrite Axios's automatically set Content-Type
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const resData = await response.json();
    console.log(resData);

    if (resData.error) {
      const error = resData.msg;

      return alert("Hay Un Error", error);
    }
    dispatch(
      authenticate(resData.localId, resData.token, parseInt(resData.expires))
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expires)
    );
    saveDataToStorage(resData.token, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
