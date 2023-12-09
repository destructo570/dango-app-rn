import URLParse from "url-parse";

export const getAuthCodeFromEvent = (auth_state) => {
  if (auth_state?.url) {
    const parsedUrl = new URLParse(auth_state?.url, true);
    return parsedUrl?.query?.code || "";
  }
  return "";
};