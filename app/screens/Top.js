import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../../util/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  QuerySnapshot,
  limit,
} from "firebase/firestore";
import ListHouses from "../../components/travel/ListHouses";
import Loading from "../../components/Loading";
export default function Top(props) {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const getHouses = async () => {
    const result = [];
    const housesRef = collection(db, "houses");
    const q = query(housesRef, orderBy("rating", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return result;
  };
  return (
    <View style={styles.container}>
      <ListHouses houses={houses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
