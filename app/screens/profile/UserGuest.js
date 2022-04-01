import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image, Button } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

export default function UserGuest(props) {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} centerContent={true}>
                <Image
                source={require("../../../assets/profileGuest.png")}
                resizeMode={'contain'}
                style={styles.img} />
                <Text style={styles.title}>Consulta tu perfil de AirBnB</Text>
                <Text style={styles.description}>Como describirías tu mejor Viaje? Busca y visualiza
                    los mejores lugares para viajar, vota por el que te haya
                    gustado más y comenta como fue tu experiencia
                </Text>
                <View style={styles.containerViewBtn}>
                    <Button
                    title={"Iniciar sesión"}
                    buttonStyle={styles.btn}
                    containerStyle={styles.btnContainer}
                    icon={{name: 'sign-in',
                    type:'font-awesome',
                    size: 15,
                    color: "white"}}
                    iconContainerStyle={{marginRight: 10}}
                    onPress={() => navigation.navigate('userLogin')}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        height: "100%"
    },
    img:{
        width: "100%",
        height: 300,
        marginTop: 30,
    },
    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 16,
        textAlign: "center",
        marginLeft: 30,
        marginRight: 30,
    },
    description:{
        textAlign: "center",
        marginBottom: 16,
        marginLeft: 30,
        marginRight: 30,
    },
    containerViewBtn:{
        flex: 1,
        alignItems: "center"
    },
    btn: {
        backgroundColor: "#FF5A60", 
        color: "#FFF"
    },
    btnContainer:{
        width: "70%"
    }
})