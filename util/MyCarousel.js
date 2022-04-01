import React from "react";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
export default function MyCarousel(props) {
  const { arrayImages, height, width } = props;
  const renderItem = ({ item }) => {
    return (
      <Image
        PlaceholderContent={<ActivityIndicator size="large" color="ff5a60" />}
        style={{ width: width, height: height }}
        source={{ uri: item }}
      />
    );
  };
  return (
    <Carousel
      layout="default"
      data={arrayImages}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
    />
  );
}
