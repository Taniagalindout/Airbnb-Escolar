import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { isEmpty } from "lodash"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loading from '../Loading';
export default function LoginForms(props) {
    const { navigation, toastRef } = props;
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const [formData, setFormData] = useState({ email: "", password: "" })
    //const [email, setEmail] = useState()
    const change = (event, type) => {
        setFormData({ ...formData, [type]: event.nativeEvent.text })
    }
    const [error, setError] = useState({ email: "", password: "" })
    const login = () => {
        if (isEmpty(formData.email) || isEmpty(formData.password)) {
            setError({
                email: "Campo obligatorio",
                password: "Campo obligatorio"
            })
        } else {
            setError({
                email: "",
                password: ""
            })
            setLoading(true)
            //Inicio de sesión de Firebase
            const auth = getAuth(); //API De AUTH (Contiene las sesiones de los usuarios)
            signInWithEmailAndPassword(auth, formData.email, formData.password) //Metodo Singn
                .then((userCredential) => { //Hacer un log
                    // Signed in
                    //const user = userCredential.user;
                    //console.log(user)
                    // ...
                    setLoading(false)
                    navigation.navigate("profileStack");
                })
                .catch((error) => {
                    setLoading(false)
                    toastRef.current.show("Usuario(a) o contraseña incorrectos");
                });

        }
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder="nombreapellido...@gmail.com"
                keyboardType="email-address"
                rightIcon={
                    <Icon type="material-community"
                        name="email-outline"
                        size={16}
                        color="#FF5A60" />
                }
                label="Correo electrónico"
                containerStyle={styles.containerInputEmail}
                labelStyle={styles.labelInput}
                onChange={(event) => change(event, "email")}
                errorMessage={error.email}
            />
            <Input
                placeholder="************"
                rightIcon={
                    <Icon type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={16}
                        color="#FF5A60"
                        onPress={() => setShowPassword(!showPassword)} />
                }
                label="Contraseña: *"
                containerStyle={styles.containerInputEmail}
                labelStyle={styles.labelInput}
                secureTextEntry={showPassword}
                onChange={(event) => change(event, "password")}
                errorMessage={error.password}

            />
            <Button
                title={"Iniciar sesión"}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                icon={
                    <Icon
                        name="sign-in"
                        type="font-awesome"
                        size={20}
                        color="#FFF"
                    />
                }
                iconContainerStyle={{ marginRight: 20 }}
                onPress={login}
            />
            <Text style={styles.textCreateAccount}
             onPress={() => navigation.navigate('createAccount')}>
                <Icon   
                    type="material-community"
                    name="account-plus"
                    size={16}
                    color="#00CCDB" />
                Crear cuenta
            </Text>
            <Loading isVisible={loading} text="Cargando.."/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        height: "100%"
    },
    containerInputEmail: {
        width: "100%",
        marginBottom: 20
    },
    labelInput: {
        fontSize: 20,
        color: "#FF5A60"
    },
    btnContainer: {
        width: "70%"
    },
    btn: {
        color: "#FFF",
        backgroundColor: "#FF5A60"
    },
    textCreateAccount: {
        color: "#00CCDB",
        marginTop: 16

    }

})