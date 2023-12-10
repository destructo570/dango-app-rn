import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from "react-native";

import EditScreenInfo from "../../../components/EditScreenInfo";
import { Text, View } from "../../../components/Themed";
import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "../../../api/anilist";


export default function ProfilePage() {

  const profileQuery = useQuery({
    queryKey: ["user"],
    queryFn: getProfileInfo,
  });

  const renderProfile: ListRenderItem<User> = ({ item }) => {
    return item.data.data;
  };

  return (
    <View style={styles.container}>
       {profileQuery.isLoading ? <ActivityIndicator /> : null}
      {profileQuery.isError ? (
        <Text style={styles.title}>Sorry couldn't find the profile</Text>
      ) : null}
      {/* <Text style={profileQuery.data?.data.}>Tab Two</Text> */}
       <FlatList data={profileQuery.data} renderItem={renderProfile} /> 
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
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
