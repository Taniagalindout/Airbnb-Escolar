import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './app/navigation/Navigation';
import {app} from "./util/firebase"
//Export deafult es una funcion que va a ser exportada para importarla en otra clase
//Export default -> Se importa sin llaves, si no tiene default, se usan llaves
export default function App() {
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({});
