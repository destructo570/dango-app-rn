import { Button, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

export default function ExplorePage() {
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 30 }}>Tab One</Text>
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
