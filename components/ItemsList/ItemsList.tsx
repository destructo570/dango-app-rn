import React, { FC } from "react";
import PropTypes from "prop-types";
import { Text, View } from "../Themed";
import { Image } from "react-native-ui-lib";
import { ScrollView } from "react-native-gesture-handler";
import { FlatList, SafeAreaView } from "react-native";

interface ItemData {
  id: number;
  title: string;
  image: string;
}

const ItemsList: FC = (props) => {
  const data = [
    {
      id: 1,
      title: "Anime namesdsdsdsddds",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 2,
      title: "Anime name 2",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 3,
      title: "Anime name 2",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 4,
      title: "Anime name",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 5,
      title: "Anime name 2",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 6,
      title: "Anime name 2",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 7,
      title: "Anime name",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 8,
      title: "Anime name 2",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 9,
      title: "Anime name 2",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 10,
      title: "Anime name 2",
      image: "https://picsum.photos/50/100",
    },
    {
      id: 11,
      title: "Anime name 2",
      image: "https://picsum.photos/50/100",
    },
  ];

  const renderItem = ({ item }: { item: ItemData }) => {
    return (
      <View style={styles.contentItem} key={item.id}>
        <Image
          src={item.image}
          width={120}
          height={150}
          style={{ borderRadius: 10 }}
        />
        <Text
          text80
          numberOfLines={1}
          style={{ width: 100, paddingLeft: 4, marginTop: 3 }}
        >
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text text70>Currently Airing</Text>
        <Text text70>See All</Text>
      </View>
      <SafeAreaView style={styles.contentList}>
        <FlatList data={data} renderItem={renderItem} horizontal={true} />
      </SafeAreaView>
    </View>
  );
};

const styles = {
  container: {
    paddingTop: 8,
    paddingBottom: 8,
    width: "100%",
  },
  header: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 8,
    paddingRight: 8,
    alignSelf: "stretch",
  },
  contentList: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    rowGap: 8,
    // columnGap: 8,
  },
  contentItem: {
    minWidth: "100px",
    width: "150px",
    borderRadius: 10,
    padding: 8,
  },
};

export default ItemsList;
