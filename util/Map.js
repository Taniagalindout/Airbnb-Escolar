import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import OpenMap from "react-native-open-maps"

export default function Map(props) {
    const{location, place, height}=props
    const openAppMap=()=>{
        OpenMap({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 19,
            query: place
        })
    }
  return (
    <MapView
    style={{height: height, width: "100%"}}
    initialRegion={location}
    onPress={openAppMap}
    >
        <MapView.Marker
        coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
        }}
        />
    </MapView>
  )
}

const styles = StyleSheet.create({})