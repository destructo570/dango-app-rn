import axios, { AxiosRequestConfig } from "axios";
import { AUTH_CONFIG } from "../constants/Secret";
import { ANILIST_QUERY as query } from "../constants/Queries";
import { TokenResponse } from "../context/AuthContext";

const getReqConfig = (token?: string): AxiosRequestConfig => {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
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

export const getProfileInfo = async (token: string) => {
  try {
    const postData = {
      query: query.USER_PROFILE,
      variables: "",
    };

    const response = await axios.post(
      "https://graphql.anilist.co",
      JSON.stringify(postData),
      getReqConfig(token)
    );
      console.log("Response", response);
      
    return response;
  } catch (err) {
    return err;
  }
};
