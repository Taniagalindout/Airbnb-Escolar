import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { isEmpty, size } from "lodash"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loading from '../Loading'
export default function CreateAccountForms(props) {
    const { navigation, toastRef } = props;
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const [formData, setFormData] = useState({ email: "", password: "", confirmpassword: "" })
    const change = (event, type) => {
        setFormData({ ...formData, [type]: event.nativeEvent.text })
    }
    const [error, setError] = useState({ email: "", password: "", confirmpassword: "" })
    const login = () => {
        if (!isEmpty(formData.email) && !isEmpty(formData.password) && !isEmpty(formData.confirmpassword)) {
            if(size(formData.password)>= 6){
                if(formData.password === formData.confirmpassword){
                    setLoading(true)
                    const auth = getAuth();
                    createUserWithEmailAndPassword(auth, formData.email, formData.password)
                    .then((userCredential) => {
                        setLoading(false)
                        navigation.navigate("profileStack");
                    })
                    .catch((error) => {
                        setLoading(false)
                        toastRef.current.show("Usuario(a) existente");
                        console.log("Usuario existente", error)
                    });
                }else{
                    setError({
                        email: "",
                        password: "La contraseña no es la misma",
                        confirmpassword: "La contraseña no es la misma"
                    })
                }
            }else{
                setError({
                    email: "",
                    password: "La contraseña debe tener un minimo de 6 caracteres",
                    confirmpassword: "La contraseña debe tener un minimo de 6 caracteres"
                })
            }
        } else {
            setError({
                email: "Campo obligatorio",
                password: "Campo obligatorio",
                confirmpassword: "Campo obligatorio"
            })
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
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                label="Contraseña: *"
                containerStyle={styles.containerInputEmail}
                labelStyle={styles.labelInput}
                secureTextEntry={showPassword}
                onChange={(event) => change(event, "password")}
                errorMessage={error.password}
            />
            <Input
                placeholder="************"
                rightIcon={
                    <Icon type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={16}
                        color="#FF5A60"
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                label="Confirmar contraseña: *"
                containerStyle={styles.containerInputEmail}
                labelStyle={styles.labelInput}
                secureTextEntry={showPassword}
                onChange={(event) => change(event, "confirmpassword")}
                errorMessage={error.confirmpassword}
            />
            <Button
                title={"Crear cuenta"}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                icon={
                    <Icon
                        name="account-plus"
                        type="material-community"
                        size={20}
                        color="#FFF"
                    />
                }
                iconContainerStyle={{ marginRight: 20 }}
                onPress={login}
            />
        <Loading isVisible={loading} text="Cargando.."/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "70%"
    },
    containerInputEmail: {
        width: "100%",
        marginBottom: 15
    },
    labelInput: {
        fontSize: 20,
        color: "#FF5A60"
    },
    btnContainer: {
        width: "70%",
        alignItems: "center",
    },
    btn: {
        color: "#FFF",
        backgroundColor: "#FF5A60"
    }
})