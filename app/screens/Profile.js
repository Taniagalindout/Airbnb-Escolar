import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserGuest from './profile/UserGuest';
import UserLogged from './profile/UserLogged';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../../components/Loading';


export default function Profile(props) {
  const { navigation } = props;
  const [login, setLogin] = useState();
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      !user ? setLogin(false) : setLogin(true)
    })
  }, [])
  if(login === null) return<Loading isVisible={true} text= "Cargando..."/>
  return login ? <UserLogged />
    : <UserGuest navigation={navigation} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});