import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from "../../../components/Loading"
import Toast from 'react-native-easy-toast'
import AddHouseForm from '../../../components/travel/AddHouseForm'
export default function AddHouse() {
  const toastRef = useRef()
  const [loading, setLoading] = useState(false)
  return (
    <View>
      <AddHouseForm toastRef={toastRef} setLoading={setLoading}/>
     <Loading isVisible={loading} text="Creando condominio"/>
     <Toast ref={toastRef} opacity={0,9} position="center"/>
    </View>
  )
}

const styles = StyleSheet.create({})