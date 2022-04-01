import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import React, { useEffect } from "react";
import MyCarousel from "../../util/MyCarousel";
import { Rating, ListItem } from "react-native-elements";
import Map  from "../../util/Map"
import {map} from "lodash"

const screenWidth = Dimensions.get("window").width;
export default function House(props) {
  const { navigation } = props;
  const { house } = props.route.params;
  const { images, place, location, address } = house;
  useEffect(() => {
    navigation.setOptions({ title: place });
  }, []);
  console.log(props);
  return (
    <ScrollView style={{backgroundColor: "#FFF"}}>
      <MyCarousel arrayImages={images} height={250} width={screenWidth} />
      <TitleHouse house={house} />
    </ScrollView>
  );
}
function TitleHouse(props) {
  const { house } = props;
  const { rating, description, place, location, address } = house;
  return (
    <View style={styles.containerTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.place}>{place}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.description}>{description}</Text>
      <HouseInfo
      location={location}
      place={place}
      address={address}
      />
    </View>
  );
}
function HouseInfo(props){
  const {location, place, address} = props
  const listInfo =[
    {
      text: address,
      iconName: "map",
      iconType: "material-community",
      action: null
    },
    {
      text: "77-127-54-85",
      iconName: "phone",
      iconType: "material-community",
      action: null
    },
    {
      text: "myhouse@gmail.com",
      iconName: "at",
      iconType: "material-community",
      action: null
    }
  ]
  return (
    <View style={styles.containerHouseInfo}>
      <Text style={styles.textInformation}>Información del condominio</Text>
      <Map
      location={location}
      place={place}
      height={200}/>
      {map(listInfo, (item, index)=>(
        <ListItem bottomDivider key={index}>
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
            <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron onPress={()=> console.log("Llego al ListItem")}/>
        </ListItem>
      ))}
    </View>
  )

}
const styles = StyleSheet.create({
  containerTitle:{
    flex:1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  place:{
    fontSize:20,
    fontWeight: "bold"
  },
  description:{
    marginTop: 5,
    color: "gray"
  },
  rating:{
    position: "absolute",
    right:0
  },
  containerHouseInfo:{
    margin: 15,
    backgroundColor: "#FFF",
    marginBottom: 20

  },
  textInformation:{
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  }
});
