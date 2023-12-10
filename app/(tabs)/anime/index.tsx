import { Button, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useContext, useEffect, useState } from "react";
import { getProfileInfo } from "../../../api/anilist";
import { Context as AuthContext } from "../../../context/AuthContext";
import ItemsList from "../../../components/ItemsList/ItemsList";

export default function MangaPage() {
  return (
    <View style={styles.container}>
      <ScrollView>
      <ItemsList/>
      <ItemsList/>
      <ItemsList/>
      <ItemsList/>
      </ScrollView>
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
