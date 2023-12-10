import { getAuthToken } from "../api/anilist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import { router } from "expo-router";
import { ROUTES } from "../constants/Routes";
import { REDUCER_ACTION } from "../constants/constants";

export interface AuthState {
  token?: string;
  refreshToken?: string;
  error?: string;
  expiresIn?: string;
}

type ACTION_TYPE = "auth_success" | "auth_error" | "auth_logout";

type AnyProps = {
  [key: string]: any;
};

export interface AuthAction {
  type: ACTION_TYPE;
  payload: AnyProps;
}
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

const initial_state: AuthState = {
  token: "",
  refreshToken: "",
  error: "",
  expiresIn: "",
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case REDUCER_ACTION.AUTH_SUCCESS:
      return {
        ...state,
        token: action?.payload?.access_token,
        refreshToken: action?.payload?.refresh_token,
        expiresIn: `${action?.payload?.expires_in}`,
      };
    case REDUCER_ACTION.AUTH_ERROR:
      return { ...state, error: action.payload };
    case REDUCER_ACTION.AUTH_LOGOUT:
      return { ...initial_state };
    default:
      return state;
  }
};

const login = (dispatch: Function) => {
  return async ({ authCode }: { authCode: string }) => {
    //Make API call with the auth code to get the token
    const response: any = await getAuthToken(authCode);

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

const loginLocally = (dispatch: Function) => {
  return async () => {
    //Make API call with the auth code to get the token
    const payload = {
      access_token: "",
      refresh_token: "",
      expires_in: "",
    };

    payload.access_token = (await AsyncStorage.getItem("token")) || "";
    payload.refresh_token = (await AsyncStorage.getItem("refreshToken")) || "";
    payload.expires_in = (await AsyncStorage.getItem("expiresIn")) || "";
    
    if (payload.access_token) {
      dispatch({ type: "auth_success", payload });
      router.replace(ROUTES.HOME);
    } else {
      router.replace(ROUTES.LOGIN);
    }
  };
};

const logout = (dispatch: Function) => {
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
