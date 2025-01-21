import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../api";
import { getErrorTextFromResponse } from "../../helpers";
import AuthService from "../../services/AuthService";

const initialState = {
  isAuth: false,
  user: {},
  isError: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, { payload }) {
      state.isAuth = payload;
    },
    setUser(state, { payload }) {
      state.user = payload;
    },
    setAuthError(state, { payload }) {
      state.isError = true;
      state.errorMessage = payload;
    },
    removeAuthError(state) {
      state.isError = false;
      state.errorMessage = "";
    },
  },
});

export const { setAuth, setUser, removeAuthError, setAuthError } =
  authSlice.actions;
export default authSlice.reducer;
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await AuthService.login(email, password);
    localStorage.setItem("token", data.accessToken);
    dispatch(setAuth(true));
    dispatch(setUser(data.user));
  } catch (e) {
    if (e.response?.data) {
      const errorMessage = getErrorTextFromResponse(e.response.data);

      dispatch(setAuthError(errorMessage));
    } else {
      dispatch(setAuthError("Unknown error occurred"));
    }
  }
};

export const registration = (email, password, fullname) => async (dispatch) => {
  try {
    const { data } = await AuthService.registration(email, password, fullname);
    localStorage.setItem("token", data.accessToken);
    dispatch(setAuth(true));
    dispatch(setUser(data.user));
  } catch (e) {
    if (e.response?.data) {
      const errorMessage = getErrorTextFromResponse(e.response.data);

      dispatch(setAuthError(errorMessage));
    } else {
      dispatch(setAuthError("Unknown error occurred"));
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AuthService.logout();
    localStorage.removeItem("token");
    dispatch(setAuth(false));
    dispatch(setUser({}));
  } catch (e) {
    if (e.response?.data) {
      const errorMessage = getErrorTextFromResponse(e.response.data);

      dispatch(setAuthError(errorMessage));
    } else {
      dispatch(setAuthError("Unknown error occurred"));
    }
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/refresh`, {
      withCredentials: true,
    });

    localStorage.setItem("token", data.accessToken);
    dispatch(setAuth(true));
    dispatch(setUser(data.user));
  } catch (e) {
    if (e.response?.data) {
      const errorMessage = getErrorTextFromResponse(e.response.data);

      dispatch(setAuthError(errorMessage));
    } else {
      dispatch(setAuthError("Unknown error occurred"));
    }
  }
};
