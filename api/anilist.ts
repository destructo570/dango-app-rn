import axios, { AxiosRequestConfig } from "axios";
import { AUTH_CONFIG } from "../constants/Secret";
import { TokenResponse } from "../context/AuthContext";
import { anilistApi } from "./api";
import { USER_QUERY } from "../graphql/User";

const getReqConfig = (): AxiosRequestConfig => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return { headers };
};

export const getAuthToken = async (authCode: string) => {
  try {
    const postData = {
      grant_type: "authorization_code",
      client_id: AUTH_CONFIG.CLIENT_ID,
      client_secret: AUTH_CONFIG.SECRET,
      redirect_uri: AUTH_CONFIG.REDIRECT_URI,
      code: authCode,
    };

    const response = await axios.post<TokenResponse>(
      "https://anilist.co/api/v2/oauth/token",
      postData,
      getReqConfig()
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getProfileInfo = async () => {
  const postData = {
    query: USER_QUERY.PROFILE,
    variables: "",
  };
  try {
    const response = await anilistApi.post(
      "https://graphql.anilist.co",
      JSON.stringify(postData)
    );
    return response;
    
  } catch (err) {
    console.log("err", err);
    return err;
  }
};
