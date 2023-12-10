import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export default function ProfileScreen() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{ headerTitle: "Settings", headerShown: false }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
