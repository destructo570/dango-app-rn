import axios, { AxiosRequestConfig } from "axios";
import { AUTH_CONFIG } from "../constants/Secret";
import { ANILIST_QUERY as query } from "../constants/Queries";
import { TokenResponse } from "../context/AuthContext";
import sleep from "sleep-promise";
import { anilistApi } from "./api";

const getReqConfig = (): AxiosRequestConfig => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return { headers };
};

// const getReqConfig = (token?: string): AxiosRequestConfig => {
//   const headers = {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: "",
//   };
//   if (token) headers["Authorization"] = `Bearer ${token}`;
//   return { headers };
// };

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
  // await sleep(2000);
  const postData = {
    query: query.USER_PROFILE,
    variables: "",
  };
  try {
    const response = await anilistApi.post(
      "https://graphql.anilist.co",
      JSON.stringify(postData)
    );
    console.log("response", response);
    return response;
    
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

// export const getProfileInfo2 = async (token: string) => {
//   console.log("token", token);

//   try {
//     const postData = {
//       query: query.USER_PROFILE,
//       variables: "",
//     };
//     const config = getReqConfig(token);
//     console.log(config);

//     const response = await axios.post(
//       "https://graphql.anilist.co",
//       JSON.stringify(postData),
//       config
//     );
//       console.log("Response", response);

//     return response;
//   } catch (err) {
//     return err;
//   }
// };
