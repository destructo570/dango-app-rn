import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Text, View } from "../components/Themed";
import { CONFIG } from "../constants/Secret";
import { getAuthCodeFromEvent } from "../utils/utils";
import { Context as AuthContext } from "../context/AuthContext";
import Constants from 'expo-constants';

export default function LoginPage() {
  const { login } = useContext(AuthContext);

  useEffect (() => {
    const subscription = Linking.addEventListener('url', _handleRedirect);
    return () => subscription.remove();
  }, [])

  const onPressHandler = async () => {
    await WebBrowser.openBrowserAsync(CONFIG.AUTH_URL_2);
  };

  const _handleRedirect = (event) => {
    if (Constants?.platform?.ios) {
        WebBrowser.dismissBrowser();
    }
    if (event) {
      const authCode = getAuthCodeFromEvent(event);
      if (authCode) login({ authCode });
    }
  };

  return (
    <View style={styles.container}>
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
