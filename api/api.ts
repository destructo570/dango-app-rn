import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const anilistApi = axios.create({
  baseURL: "https://graphql.anilist.co",
});

const getAccessToken = async () => {
  const result = await AsyncStorage.getItem("token");
  anilistApi.interceptors.request.use(function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    config.headers.Authorization = `Bearer ${result}`;
    return config;
  });
};

getAccessToken();

export { anilistApi };
