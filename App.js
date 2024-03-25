import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import fantasma from "./assets/ghost.png";

export default function App() {
  /* Coordenadas para o MapView */
  const regiaoInicialMapa = {
    /*
    Coordenadas para o Brasil:
    latitude: -10,
    longitude: -55, */
    // São Paulo
    latitude: -23.53,
    longitude: -46.65529,

    /* Definição do zoom do mapa.
    Quanto menor, mais próximo o mapa.
    Quanto maior mais longe. */
    latitudeDelta: 40,
    longitudeDelta: 40,
  };

  /* Coordenadas para Marker que será aplicado ao MapView */
  const localizacao = {
    latitude: -33.867886,
    longitude: -63.987,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <MapView
          mapType="hybrid"
          userInterfaceStyle="dark" // funcionara só para ios
          style={styles.mapa}
          initialRegion={regiaoInicialMapa}
          // minZoomLevel={5}  Delimitando o zoom minimo do usuário
          // maxZoomLevel={15}  Delimitando o zoom máximo do usuário
        >
          <Marker coordinate={localizacao} draggable />
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapa: { width: "100%", height: "100%" },
});
