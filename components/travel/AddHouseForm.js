import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Divider,
  Icon,
  Avatar,
  Image,
} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { map, size, filter, isEmpty } from "lodash";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Modal from "../../util/Modal";
import { db } from "../../util/firebase";
import { collection, addDoc } from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {getAuth} from "firebase/auth"
import uuid from "random-uuid-v4"
import {useNavigation} from "@react-navigation/native"

//Obtener el ancho de la pantalla del usuario

const widthScreen = Dimensions.get("window").width;

export default function AddHouseForm(props) {
  const navigation = useNavigation()
  const { toastRef, setLoading } = props;
  const [imageSelected, setImageSelected] = useState([]);
  const [error, setError] = useState({
    camera: "",
    place: "",
    address: "",
    description: "",
  });
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [locationHouse, setLocationHouse] = useState("");
  const saveHouse = () => {
    if (
      isEmpty(error.place) ||
      isEmpty(error.address) ||
      isEmpty(error.description)
    ) {
      setError({
        place: "Campo obligatorio",
        address: "Campo obligatorio",
        description: "Campo oblogatorio",
      });
    } else {
      setError({
        place: "",
        address: "",
        description: "",
      });
      setLoading(true)
      saveImage().then(async(response)=>{
        try{
        const auth = getAuth()
          const docRef = await addDoc(collection(db, "houses"), {
            id: uuid(),
            place: place,
            description: description,
            address: address,
            location: locationHouse,
            images: response,
            rating: 0,
            ratingTotal:0,
            quantityVoting:0,
            createAt: new Date(),
            createBy: auth.currentUser.uid
          })
          setLoading(false)
          navigation.navigate("travelStack")
        }catch(err){
          console.log(err);
        }
      }).catch((err)=>{
        console.log("Error al obtener la imagen", err)
      })
    }
  };
  const saveImage = async ()=>{
    const imageBlob = []
    await Promise.all(
      map(imageSelected, async(image)=>{
        const response = await fetch(image)
        const{_bodyBlob} = response
        const storage = getStorage()
        const id= uuid()
        const storageRef= ref(storage, `house/${id}`)
        await uploadBytes(storageRef, _bodyBlob)
        .then(async()=>{
          await getDownloadURL(ref(storage, `house/${id}`))
          .then((url)=>{
            imageBlob.push(url)
          }).catch((err)=>{
            console.log("Error al descargar", err)
          }).catch((err)=>{
            console.log("Error al registrar", err)
          })
        })
      })
    )
    return imageBlob;
  }

  return (
    <View>
      <ScrollView>
        <ImagePreview
          imageSelected={imageSelected}
        />
        <UploadImage
          toastRef={toastRef}
          setImageSelected={setImageSelected}
          imageSelected={imageSelected}
          error={error}
        />
        <FormAdd
          setIsVisibleMap={setIsVisibleMap}
          setPlace={setPlace}
          setDescription={setDescription}
          setAddress={setAddress}
          error={error}
          locationHouse={locationHouse}
        />
        <Button
          title="Crear condominio"
          buttonStyle={styles.btn}
          icon={
            <Icon type="font-awesome" name="save" size={15} color="white" />
          }
          iconContainerStyle={{ marginRight: 10 }}
          onPress={saveHouse}
        />
        <Maps
          isVisibleMap={isVisibleMap}
          setIsVisibleMap={setIsVisibleMap}
          toastRef={toastRef}
          setLocationHouse={setLocationHouse}
        />
      </ScrollView>
    </View>
  );
}

function ImagePreview(props) {
  const { imageSelected } = props;
  return (
    <View>
      <Image
        source={
          size(imageSelected)
            ? { uri: imageSelected[0] }
            : require("../../assets/logo.png")
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}
function UploadImage(props) {
  const { toastRef, setImageSelected, imageSelected, error } = props;
  const addImage = async () => {
    const resultPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (resultPermission.status !== "denied") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 2],
      });
      if (!result.cancelled) {
        setImageSelected([...imageSelected, result.uri]);
      } else {
        toastRef.current.show("Has cerrado la galeria");
      }
    } else {
      toastRef.current.show(
        "Es necesario aceptar los permisos de camara",
        4000
      );
    }
  };

  const removeImage = (image) => {
    Alert.alert("Eliminar imagen", "Estas seguro de eliminar la imagen ?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: () => {
          setImageSelected(
            filter(imageSelected, (imageUri) => imageUri !== image)
          );
        },
      },
    ]);
  };
  return (
    <View style={styles.viewUploadImage}>
      {size(imageSelected) < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.iconUploadImage}
          onPress={addImage}
          erroMessage={error.camera}
        />
      )}
      {map(imageSelected, (image, index) => (
        <Avatar
          key={index}
          style={styles.miniatureImage}
          source={{ uri: image }}
          onPress={() => removeImage(image)}
        />
      ))}
    </View>
  );
}

function FormAdd(props) {
  const {
    setIsVisibleMap,
    setPlace,
    setDescription,
    setAddress,
    error,
    locationHouse,
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        label="Lugar*"
        labelStyle={styles.label}
        placeholder="Acapulco"
        containerStyle={styles.inputContainer}
        errorMessage={error.place}
        onChange={(event) => setPlace(event.nativeEvent.text)}
        errorMessage={error.place}
      />
      <Input
        label="Direccion*"
        labelStyle={styles.label}
        placeholder="Colonia laureles"
        containerStyle={styles.inputContainer}
        errorMessage={error.address}
        onChange={(event) => setAddress(event.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="google-maps"
            color={locationHouse ? "#00a680" : "#c2c2c2"}
            onPress={() => setIsVisibleMap(true)}
          />
        }
        errorMessage={error.address}
      />
      <Input
        label="Descripcion*"
        labelStyle={styles.label}
        placeholder="Comentarios"
        inputContainerStyle={styles.textArea}
        errorMessage={error.description}
        multiline={true}
        onChange={(event) => setDescription(event.nativeEvent.text)}
        errorMessage={error.description}
      />
    </View>
  );
}

function Maps(props) {
  const { isVisibleMap, setIsVisibleMap, toastRef, setLocationHouse } = props;
  const [location, setLocation] = useState();

  useEffect(() => {
    (async () => {
      const resultPermission =
        await Location.requestForegroundPermissionsAsync();
      if (resultPermission.status === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      } else {
        toastRef.current.show("Es necesario aceptar los permisos de ubicacion");
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationHouse(location);
    toastRef.current.show("Ubicacion guardada");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
          <Divider style={styles.divider} />
        </View>
        <View>
          <Button
            title="Cancelar"
            containerStyle={styles.btnContainerCancelar}
            buttonStyle={styles.btnStyleCancel}
            onPress={() => setIsVisibleMap(false)}
          />
          <Button
            title="Guardar"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnStyleSave}
            onPress={confirmLocation}
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  viewUploadImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  iconUploadImage: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 16,
  },
  label: {
    fontSize: 15,
    color: "#ff5a60",
  },
  inputContainer: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    width: "100%",
  },
  btn: {
    backgroundColor: "#ff5a60",
    margin: 20,
  },
  map: {
    width: "100%",
    height: 560,
  },
  divider: {
    width: "85%",
    backgroundColor: "#ff5a60",
    marginBottom: 2,
  },
  btnContainer: {
    padding: 5,
    marginBottom: 10,
  },
  btnStyleCancel: {
    backgroundColor: "#A60a0d",
  },
  btnStyleSave: {
    backgroundColor: "#00a680",
  },
});
