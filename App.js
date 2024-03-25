import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function App() {
  /* State para monitorar a localização atula do 
  usuário  */
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  useEffect(() => {
    async function obterLocalizacao() {
      /* Acessando o status da requisição de permissão de uso 
      dos recursos de geolocalização */
      const { status } = await Location.requestForegroundPermissionsAsync();

      /* Se o status Não foi liberado/permitindo, então 
      será dado um alerta notificando o usuário */
      if (status !== "granted") {
        Alert.alert("Ops !", "Você não autorizou o uso da geolocalização");
        return;
      }

      /* Se o status estiver Ok, obtemos os dados da localização atual. 
      E atualizamos o state de minhaLocalização  */
      let localizacaoAtual = await Location.getCurrentPositionAsync({});

      setMinhaLocalizacao(localizacaoAtual);
    }

    obterLocalizacao();
  }, []);

  // console.log(minhaLocalizacao);

  const [localizacao, setLocalizacao] = useState({
    latitude: -33.867886,
    longitude: -63.987,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

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

  const marcarLocal = (event) => {
    // console.log(event.nativeEvent);
    setLocalizacao({
      ...localizacao, // usado para pegar/manter os deltas

      // Obtendo novos valores a partir do evento de pressionar
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View>
          <Button title="Onde estou?" onPress={marcarLocal} />
        </View>
        <View style={styles.viewMapa}>
          <MapView
            mapType="hybrid"
            userInterfaceStyle="dark" // funcionara só para ios
            style={styles.mapa}
            initialRegion={regiaoInicialMapa}
            // minZoomLevel={5}  Delimitando o zoom minimo do usuário
            // maxZoomLevel={15}  Delimitando o zoom máximo do usuário
          >
            <Marker coordinate={localizacao} />
          </MapView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapa: { width: "100%", height: "100%" },
});
