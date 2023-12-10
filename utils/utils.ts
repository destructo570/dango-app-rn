import URLParse from "url-parse";

export const getAuthCodeFromEvent = (auth_state: { url?: string }) => {
  if (auth_state?.url) {
    const parsedUrl = new URLParse(auth_state?.url, true);
    return parsedUrl?.query?.code || "";
  }
  return "";
};

export const getSettingsObject = (keyValuePairs)=>{
  const settings = {};
  keyValuePairs.forEach(pair => {
    let [key, value] = pair;
    settings[key] = value;
  });
  return settings;
}
