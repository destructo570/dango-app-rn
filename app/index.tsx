require('react-native-ui-lib/config').setConfig({appScheme: 'default'});
import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Colors as MyTheme, Text, View } from "react-native-ui-lib";
import Colors from "../constants/Colors";
import { Context as AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResolveAuthScreen() {
  const { loginLocally } = useContext(AuthContext);

  useEffect(() => {
    setDefaultTheme();
    loginLocally();
  }, []);

  const setDefaultTheme = async () => {
    await AsyncStorage.setItem('theme', 'dark');
  }

  MyTheme.loadSchemes(Colors);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
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
