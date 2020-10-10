import * as React from "react";
import { Text, View } from "../components/Themed";
import {
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  InteractionManager,
  TouchableOpacity,
} from "react-native";
import NumberFormat from "react-number-format";
import { template } from "@babel/core";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import DetalheProduto from "./DetalheProduto";

const Stack = createStackNavigator();

export default function Inicial() {
  return (
    <Stack.Navigator initialRouteName="Produtos">
      <Stack.Screen name="Produto" component={Produtos} />
      <Stack.Screen name="DetalheProduto" component={DetalheProduto} />
    </Stack.Navigator>
  );
}

function Produtos({ navigation }) {
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  // Carregar a qpi com os dados do banco de dados.
  //Executar a consulta listatelainicial

  React.useEffect(() => {
    fetch(
      "http://192.168.0.2:8080/projeto/service/produto/listartelainicial.php"
    )
      .then((response) => response.json())
      .then((produtos) => setDados(produtos.saida))
      .catch((error) => console.error(error))
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View style={tela.bloco2}>
      <ScrollView>
        <Image source={require("../img/isa-logo.png")} style={tela.imagem} />

        {/* <Image source={require("../assets/images/camuflada.png")} /> */}

        {carregado ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View style={tela.conteiner}>
                <Image
                  source={{
                    uri: `http://192.168.0.2:8080/projeto/img/${item.foto}`,
                  }}
                  style={tela.img}
                />
                <View style={tela.bloco1}>
                  <Text style={tela.nome}>{item.nomeproduto}</Text>
                  <Text style={tela.preco}>
                    <NumberFormat
                      value={item.preco}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"R$"}
                      renderText={(valor) => <Text>{valor}</Text>}
                    />
                  </Text>
                  <Text style={tela.parcela}> 12x Sem juros </Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("DetalheProduto", {
                        idproduto: `${item.idproduto}`,
                      });
                    }}
                  >
                    <Text style={tela.link}> Saiba mais </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={({ idproduto }, index) => idproduto}
          />
        )}
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  imagem: {
    marginTop: 30,
    marginLeft: 70,
  },
  bloco1: {
    flex: 1,
    width: 150,
    height: 150,
    fontSize: 16,
    marginBottom: 0,
    backgroundColor: "#ffea00",
  },
  bloco2: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
  },
  img: {
    borderRadius: 10,
    //padding: 10,
    marginBottom: 5,
    width: 140,
    height: 140,
    marginLeft: "auto",
    marginRight: "auto",
    flex: 1,
  },
  nome: {
    padding: 7,
    fontSize: 16,
  },
  preco: {
    padding: 5,
    top: 22,
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 16,
    //backgroundColor: "#ff5722",
  },
  link: {
    marginTop: -24,
    top: 30,
    paddingBottom: -10,
    textAlign: "center",
    fontSize: 17,
    backgroundColor: "#1b5e20",
    color: "white",
  },

  conteiner: {
    flex: 1,
    flexDirection: "row",
    width: "97%",
    marginBottom: 3,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
