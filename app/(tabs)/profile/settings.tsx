import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import { SETTINGS_KEYS } from "../../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "react-native-ui-lib";
import { Context as SettingsContext } from "../../../context/SettingsContext";
import { getSettingsObject } from "../../../utils/utils";

export default function SettingsModal() {
  const { updateSettings, state } = useContext(SettingsContext);

  const onToggleDarkMode = () => {
    updateSettings({
      key: SETTINGS_KEYS.IS_DARK,
      value: state.isDark === "true" ? false : true,
    });
  };
  
  return (
    <View style={styles.container}>
      <View row marginB-20 gap={10}>
        <Text text70 centerV>
          Dark mode
        </Text>
        <Switch
          value={state?.isDark === "true"}
          onValueChange={onToggleDarkMode}
        />
      </View>
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
