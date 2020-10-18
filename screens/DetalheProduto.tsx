import * as React from "react";
import { View, Text } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NumberFormat from "react-number-format";
import * as SQLite from "expo-sqlite";
import { createStackNavigator } from "@react-navigation/stack";
import Carrinho from "./Carrinho";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
export default function DetalheProduto({ route,navigation }) {
  
  const { idproduto } = route.params;
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `http://192.168.0.2:8080/projeto/service/produto/detalheproduto.php?idproduto=${idproduto}`
    )
      .then((response) => response.json())
      .then((produto) => setDados(produto.saida))
      .catch((error) =>
        console.error(`Erro ao tentar o carregar o produto ${error}`)
      )
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View>
      {carregado ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View style={tela.conteiner}>
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projeto/img/${item.foto1}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projeto/img/${item.foto2}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projeto/img/${item.foto3}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projeto/img/${item.foto4}`,
                }}
                style={tela.img}
              />
              <Text style={tela.nome}>{item.nomeproduto}</Text>
              <Text style={tela.txt}>{item.descricao}</Text>

              <Text style={tela.preco}>
                <NumberFormat
                  value={item.preco}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"R$"}
                  renderText={(valor) => <Text>{valor} </Text>}
                />
              </Text>
              <TouchableOpacity
                onPress={() => { 
                  //navigation.navigate("Carrinho")
                  adicionarAoCarrinho( 
                    `${idproduto}`,
                    `${item.nomeproduto}`,
                    `${item.preco}`,
                    `${item.foto1}`
                  );
                }}
                style={tela.link}
              >
                <Text style={tela.carrinho}>Adiciona ao Carrinho</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
               navigation.navigate("Carrinho")
               }} style={tela.link}>
          
          <Text style={tela.carrinho}>Ir para o Carrinho</Text>
        </TouchableOpacity>
            </View>
          )}
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}
    </View>
  );
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Carrinho" component={Carrinho} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const tela = StyleSheet.create({
  img: {
    borderRadius: 10,

    marginTop: 10,
    width: "100%",
    height: 250,
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  link: {
    padding: 10,
    fontWeight: "bold",
  },
  conteiner: {
    width: 130,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#8bc34a",
  },
  nome: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 11,
    fontSize: 19,
    marginBottom: 2,
  },
  txt: {
    color: "white",
    textAlign: "center",
    padding: 11,
    fontSize: 19,
  },
  preco: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginTop: 20,
    marginBottom: 13,
  },
  carrinho: {
    backgroundColor: "#ffea00",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 13,
  },
});
//Fazer a constante do banco de dados. Vamos chamar de db

const db = SQLite.openDatabase("appisadb.banco");

function adicionarAoCarrinho(idcliente, nome, preco, foto) {
  alert("Produto Foi Encaminhado Para O Carrinho");

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists itens(idp integer primary key,idproduto int,nomeproduto text,preco text, foto text);"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "insert into itens(idproduto,nomeproduto,preco,foto)values(?,?,?,?)",
      [idcliente, nome, preco, foto]
    );
    tx.executeSql("select * from itens", [], (_, { rows }) => {
      console.log(JSON.stringify(rows));
    });
    //tx.executeSql("drop table perfil");
  });
}
