import { useEffect, useState } from "react";
import axios from "axios";
import URLParse from "url-parse";
import { Button, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Text, View } from "../components/Themed";
import { CONFIG } from "../constants/Secret";

export default function LoginPage() {
  const [auth_state, setAuthState] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (auth_state) {
      const parsedUrl = new URLParse(auth_state?.event?.url, true);
      const codeValue = parsedUrl.query.code;
      getAuthToken(codeValue);
    }
  }, [auth_state]);

  const getAuthToken = async (code) => {
    try {
      const postData = {
        grant_type: "authorization_code",
        client_id: CONFIG.CLIENT_ID,
        client_secret: CONFIG.SECRET,
        redirect_uri: "com.destructo570.dangoapprn://oauth", // http://example.com/callback
        code: code, // The Authorization Code received previously
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

      if (response && response.status === 200) {
        setToken(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onPressHandler = async () => {
    _addLinkingListener();

    let result = await WebBrowser.openBrowserAsync(CONFIG.AUTH_URL_2).then(
      (result) => {
        console.log("Here", result);
      }
    );
    console.log(result);
  };

  const _addLinkingListener = () => {
    Linking.addEventListener("url", _handleRedirect);
  };

  const _handleRedirect = (event) => {
    setAuthState({ event });
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 30 }}>{JSON.stringify(token)}</Text>
      <Button title="Login with Anilist" onPress={onPressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
