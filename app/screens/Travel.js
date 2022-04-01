import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../../util/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  QuerySnapshot,
  limit
} from "firebase/firestore";
import { size } from "lodash";
import Loading from "../../components/Loading";
import ListHouses from "../../components/travel/ListHouses";

export default function Travel(props) {
  const { navigation, route } = props;
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userCredential) => {
      setUser(userCredential);
    });
  }, []);
  useFocusEffect(
    useCallback(()=>{
      getHouses().then((response)=>{
        setHouses(response)
      })
    },[])
  );
  const getHouses = async () =>{
    const result=[]
    const housesRef = collection(db, "houses")
    const q = query(housesRef, orderBy("createAt", "desc"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc)=>{
      result.push(doc.data())
    })
    return result
  }

  return (
    <View style={styles.container}>
      <ListHouses
      houses={houses}
      />
      {user && (
        <Icon
          reverse
          type="material-community"
          size={22}
          color="#FF5A60"
          containerStyle={styles.iconContainer}
          name="plus"
          onPress={() => navigation.navigate("addHouse")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  iconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
