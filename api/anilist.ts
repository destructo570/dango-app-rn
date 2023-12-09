import axios from "axios";
import { CONFIG } from "../constants/Secret";

export const getAuthToken = async (code) => {   
  try {
    const postData = {
      grant_type: "authorization_code",
      client_id: CONFIG.CLIENT_ID,
      client_secret: CONFIG.SECRET,
      redirect_uri: "com.destructo570.dangoapprn://oauth",
      code,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await axios.post(
      "https://anilist.co/api/v2/oauth/token",
      postData,
      config
    );
    return response;
  } catch (err) {
    return err;
  }
};
