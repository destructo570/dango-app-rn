import { StyleSheet } from "react-native";
import { View, Text, Avatar, AnimatedImage } from "react-native-ui-lib";
import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "../../../api/anilist";
import { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfilePage() {
  const profileQuery = useQuery({
    queryKey: ["user"],
    queryFn: getProfileInfo,
  });

  // console.log(profileQuery?.data?.data?.data?.Viewer);

  const profile = useMemo(() => {
    return profileQuery?.data?.data?.data?.Viewer;
  }, [profileQuery.data]);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.headerContainer}
            locations={[0, 1]}
          />
          <AnimatedImage
            source={{
              uri: profile?.bannerImage
                ? profile?.bannerImage
                : "https://picsum.photos/id/85/400/600",
            }}
            width={500}
            height={200}
            style={styles.image}
          />
        </View>
        <View style={styles.profileInfo}>
          <Avatar source={{ uri: profile?.avatar?.medium }} size={86} />
          <Text>{profile?.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  profileHeader: {
    alignItems: "flex-start",
    position: "relative",
  },
  bannerContainer: {
    position: "absolute",
    zIndex: 3,
  },
  headerContainer: {
    position: "absolute",
    zIndex: 2,
    height: 200,
    left: 0,
    right: 0,
  },
  image: {
    zIndex: 1,
  },
  profileInfo: {
    position: "absolute",
    bottom: -272,
    zIndex: 4,
    paddingLeft: 16,
    paddingRight: 16
  },
});
