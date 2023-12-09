import { getAuthToken } from "../api/anilist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import { router } from "expo-router";
import { ROUTES } from "../constants/Routes";

const initial_state = { token: "", refreshToken: "", error: "", expiresIn: "" };

const authReducer = (state, action) => {
  switch (action.type) {
    case "auth_success":
      return {
        ...state,
        token: action?.payload?.access_token,
        refreshToken: action?.payload?.refresh_token,
        expiresIn: `${action?.payload?.expires_in}`,
      };
    case "auth_error":
      return { ...state, error: action.payload };
    case "auth_logout":
      return { ...initial_state };
    default:
      return state;
  }
};

const login = (dispatch) => {
  return async ({ authCode }) => {
    //Make API call with the auth code to get the token
    const response = await getAuthToken(authCode);

    if (response && response.status === 200 && response?.data) {
      await AsyncStorage.setItem("token", response?.data?.access_token);
      await AsyncStorage.setItem("refreshToken", response?.data?.refresh_token);
      await AsyncStorage.setItem("expiresIn", `${response?.data?.expires_in}`);
      dispatch({ type: "auth_success", payload: response?.data });
      router.replace(ROUTES.HOME);
    } else {
      dispatch({ type: "auth_error", payload: "Something went wrong!" });
    }
  };
};

const loginLocally = (dispatch) => {
  return async () => {
    //Make API call with the auth code to get the token
    const payload = { ...initial_state };

    payload.token = (await AsyncStorage.getItem("token")) || "";
    payload.refreshToken = (await AsyncStorage.getItem("refreshToken")) || "";
    payload.expiresIn = (await AsyncStorage.getItem("expiresIn")) || "";
    if(payload.token){
      dispatch({ type: "auth_success", payload });
      router.replace(ROUTES.HOME);
    }else{
      router.replace(ROUTES.LOGIN);
    }

  };
};

const logout = (dispatch) => {
  //Clear login state
  return () => {
    dispatch({ type: "auth_logout" });
    router.replace(ROUTES.LOGIN);
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, logout, loginLocally },
  { ...initial_state }
);
