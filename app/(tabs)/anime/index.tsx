import { Button, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useContext, useEffect, useState } from "react";
import { getProfileInfo } from "../../../api/anilist";
import { Context as AuthContext } from "../../../context/AuthContext";

export default function MangaPage() {
  const { state } = useContext(AuthContext);
  const [user_data, setUserData] = useState(null);

  useEffect(()=>{
    if(state.token){
      getProfileInfo2();    
    }
  }, [state.token])
  const getProfileInfo2 = async()=>{
    const profile_info = await getProfileInfo(state?.token);
    setUserData(profile_info);
  }
  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 30 }}>{user_data?.toString() || "Hello"}</Text>
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
