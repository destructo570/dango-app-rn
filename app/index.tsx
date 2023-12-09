import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Context as AuthContext } from "../context/AuthContext";

export default function ResolveAuthScreen() {
  const { loginLocally } = useContext(AuthContext);

  useEffect(() => {
    loginLocally();
  }, []);

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
