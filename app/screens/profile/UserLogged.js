import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { getAuth } from 'firebase/auth'
import UserInfo from '../../../components/profile/UserInfo'

export default function UserLogged() {
  const [reload, setReload] = useState()
  const [infoUser, setInfoUser] = useState()
  const auth = getAuth()
  useEffect(() => {
    (async () => {
      const user = await auth.currentUser
      setInfoUser(user)
    })()
    setReload(false)
  }, [reload])
  return (
    <View style={styles.container}>
      {infoUser && <UserInfo
        infoUser={infoUser}/>}
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btn}
        titleStyle ={styles.btnTitle}
        onPress={() => auth.signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   minHeight: "100%",
   backgroundColor: "#FFF"
  },
  btnTitle: {
    color: "#FF5A60"
  },
  btn: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#FF5A60",
    borderBottomWidth: 1,
    borderBottomColor: "#FF5A60",
    paddingTop: 10,
    paddingBottom: 10
  }
})