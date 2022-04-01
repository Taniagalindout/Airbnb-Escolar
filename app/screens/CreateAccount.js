import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import CreateAccountForms from '../../components/profile/CreateAccountForms'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
export default function CreateAccount() {
  const navigation = useNavigation()
  const toastRef = useRef()
  return (
    <View style={styles.container}>
        <CreateAccountForms navigation={navigation} toastRef={toastRef}/>
      <Toast
        ref={toastRef}
        opacity={0, 9}
        position="center" 
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFF",
  }
})