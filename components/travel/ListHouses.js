import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { size } from "lodash";
import { Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
export default function ListHouses(props) {
  const { houses } = props;
  const navigation = useNavigation();
  return (
    <View>
      {size(houses) > 0 ? (
        <FlatList
          data={houses}
          renderItem={(house) => (
            <House house={house} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loaderHouses}>
          <ActivityIndicator size="large" color="#ff5A60" />
          <Text>Cargando condominios</Text>
        </View>
      )}
    </View>
  );
}
function House(props) {
  const { house , navigation} = props;
  const { id, images, place, description, address } = house.item;
  const imageHouse = images[0];
  return (
    <TouchableOpacity onPress={() => navigation.navigate("house", { house: house.item })}>
      <View style={styles.container}>
        <View style={styles.viewImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={
              <ActivityIndicator size="large" color="#FF5A60" />
            }
            source={
              imageHouse
                ? { uri: imageHouse }
                : require("../../assets/logo.png")
            }
            style={styles.img}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>{place}</Text>
          <Text style={{ paddingTop: 2, color: "gray" }}>{address}</Text>
          <Text style={{ paddingTop: 2, color: "gray", width: 300 }}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
  },
  container: {
    flexDirection: "row",
    margin: 10,
  },
  viewImage: {
    marginRight: 15,
  },
});
