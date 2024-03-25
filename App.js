import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function App() {
  const regiaoInicialMapa = {
    latitude: -10,
    longitude: -55,

    /* Definição do zoom do mapa.
    Quanto menor, mais próximo o mapa. */
    latitudeDelta: 40,
    longitudeDelta: 40,
  };
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <MapView style={styles.mapa} initialRegion={regiaoInicialMapa} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapa: { width: "100%", height: "100%" },
});
