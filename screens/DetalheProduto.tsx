import React, { useState } from "react";
import { View, Text } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NumberFormat from "react-number-format";
import * as SQLite from "expo-sqlite";
import { createStackNavigator } from "@react-navigation/stack";
import Carrinho from "./Carrinho";
import { NavigationContainer } from "@react-navigation/native";

let tipo = 0;

const Stack = createStackNavigator();
export default function DetalheProduto({ route,navigation }) {
 
  const {idproduto } = route.params;

 //const [tipo1, setTipo1] = React.useState(0);
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);
  React.useEffect(() => {
    fetch(
      `http://192.168.0.2:8080/projetoisaclube/service/produto/detalheproduto.php?idproduto=${idproduto}`
    )
      .then((response) => response.json())
      .then((produto) => setDados(produto.saida))
      .catch((error) =>
        console.error(`Erro ao tentar o carregar o produto ${error}`)
      )
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View style={tela.conteiner}>
      {carregado ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View style={tela.conteiner}>
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projetoisaclube/img/${item.foto1}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projetoisaclube/img/${item.foto2}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projetoisaclube/img/${item.foto3}`,
                }}
                style={tela.img}
              />
              <Image
                source={{
                  uri: `http://192.168.0.2:8080/projetoisaclube/img/${item.foto4}`,
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
                       
              
              {item.tipo=="Permitido" ? (
                <View style={tela.inputView}>
              <TouchableOpacity
                onPress={() => {
                  //navigation.navigate("Carrinho")
                  adicionarAoCarrinho( 
                    `${idproduto}`,
                    `${item.nomeproduto}`,
                    `${item.preco}`,
                    `${item.foto1}`
                    
                   
                  );
                }}>
                <Text style={tela.inputdeth}>Adiciona ao Carrinho</Text>
              </TouchableOpacity>
              </View>
                ):(
                  <View style={tela.aviso}>
                    <Text style={tela.txtaviso}>"Produtos Controlado não e possivel adicionar"</Text>
                    <Text style={tela.txtaviso2}>"ao carrinho, compra somente na Loja"</Text>
                    </View>
                )
              }
            
              <View style={tela.inputView}>
              <TouchableOpacity onPress={()=>{
               navigation.navigate("Carrinho")
               }}>
          
          <Text style={tela.inputdeth}>Ir para o Carrinho</Text>
        </TouchableOpacity>
        </View>
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
    width: "90%",
    height: 250,
    marginLeft: "auto",
    marginRight: "auto",
  },
  txtaviso: {
    color: "#f44336",
    padding:5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  txtaviso2: {
    color:"#f44336",
    marginTop:-9,
    padding:5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  aviso:{
    marginTop:17,
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom:-10,
    backgroundColor: "#8bc34a",
  },
  inputdeth: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
    inputView: {
    padding: 10,
    height: 40,
    borderRadius: 6,
    marginTop: 30,
    backgroundColor: "#ffea00",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  conteiner: {
    flex: 1,
    width: "100%",
    marginBottom: 3,
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
    padding: 11,
    fontSize: 19,
  },
  preco: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginBottom: -3,
  },

});
//Fazer a constante do banco de dados. Vamos chamar de db

const db = SQLite.openDatabase("appisadb.banco");

function adicionarAoCarrinho(idcliente, nome, preco, foto) {
  alert("Produto Encaminhado Para o Carrinho");

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
    //tx.executeSql("drop table endereco");
  });
}
