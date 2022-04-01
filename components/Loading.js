import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'
import { ActivityIndicator } from 'react-native'

export default function Loading(props) {
    const { isVisible, text } = props
    return (
        <Overlay
        isVisible={isVisible}
            windowsBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View>
                <ActivityIndicator size="large" color="#FF5A60" />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:{
        height: 100,
        width: 200,
        backgroundColor: "#FFF",
        borderColor: "#FF5A60",
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text:{
        color: "#FF5A60",
        textTransform: "uppercase",
        marginTop: 10,
        textAlign: "center"
    }
})