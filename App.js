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

  /* Este state tem a finalidade de determinar
  a posição/localização no MapView junto com o Marker.
  Inicialmente é nulo pois o usuário ainda não acionou o botão da sua localização. */
  const [localizacao, setLocalizacao] = useState(null);

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

  const marcarLocal = () => {
    // console.log(event.nativeEvent);
    setLocalizacao({
      /*  Obtendo novos valores a partir da geolocalização da posição do usuário
      Aqui é necessário acessar a propriedade 'coords' do state minhaLocalizacao. Os valores desta propriedade correspondem ao que o Location conseguiu obter à partir do GPS do aparelho */
      latitude: minhaLocalizacao.coords.latitude,
      longitude: minhaLocalizacao.coords.longitude,

      /* Aqui usamos deltas bem baixos para poder aproximar bastante
      a visualização do mapa e do marker. */
      longitudeDelta: 0.02,
      latitudeDelta: 0.01,
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
            region={localizacao ?? regiaoInicialMapa}
            // minZoomLevel={5}  Delimitando o zoom minimo do usuário
            // maxZoomLevel={15}  Delimitando o zoom máximo do usuário
          >
            {localizacao && <Marker coordinate={localizacao} />}
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
