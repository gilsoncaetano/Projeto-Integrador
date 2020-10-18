import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, ScrollView, RefreshControl } from "react-native";
import { Picker, Button, StyleSheet, Image } from "react-native";

import * as SQLite from "expo-sqlite";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

const db = SQLite.openDatabase("appisadb.banco");
const StackPagamento = createStackNavigator();

//constante para nos ajudar a pausar a tela enquanto o indicator realizar a animação
//de girar anquanto o refreshControl atualiza a tela
const wait = (timeout)=>{
  return new Promise((resolver)=>{
    setTimeout(resolver,timeout);
  });
};

export default function Carrinho({navigation}) {
  const [dados, setDados] = React.useState([]);
  const [quantidade, setQuantidade] = React.useState("1");

  // ---Vamos criar uma constante para realizar o refresh(atualizarção da tela)
  const [refreshing, setRefreshing] = React.useState(false);
  // codificação de atualização de atualização dos dados de tela
  const onRefresh = React.useCallback(()=>{
    setRefreshing(true);
    db.transaction((tx)=>{
      tx.executeSql("select * from itens",[],(_,{rows:{_array}})=>{
        setDados(_array);
      })
    })
    wait(2000).then(()=> setRefreshing(false));
  },[]);

  React.useEffect(() => {
    db.transaction((tx) => {  
      tx.executeSql("select * from itens", [], (_, { rows: { _array } }) => {
        setDados(_array);
        //console.log(JSON.stringify(_array));
        console.log(_array); 
      });
    });
  }, []);

  
  return (
    <View style={tela.conteiner}>
      <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <Text> Veja o que tem no carrinho</Text>
        <Text>"Toque na tela e arraster para baixo para atualizar o carrinho"</Text>
        {dados.map(({ idp, idproduto, nomeproduto, preco, foto }) => (
          <View style={tela.conteiner} key={idproduto}>
            <Image
              source={{ uri: `http://192.168.0.2:8080/projeto/img/${foto}` }}
              style={tela.img}
            />
            <Text>Produto:{nomeproduto}</Text>
            <Text>Preço:{preco}</Text>
            <Text>Quantidade:</Text>
            <TextInput
              placeholder="1"
              value={quantidade}
              onChangeText={(value) => setQuantidade(value)}
            />
            <TouchableOpacity
              onPress={() => {
                db.transaction((tx) => {
                  tx.executeSql("delete from itens where idp=?", [idp]);
                });
              alert("Toque na tela e arraster para baixo para atualizar o carrinho")
              }}
            >
              <Text style={tela.botao1}>Tira do Carrinho</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={()=>{
          navigation.navigate("Pagamento")
        }} style={tela.link}>
          
          <Text style={tela.carrinho}>Ir para pagamento</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  bloco2: {
    // flexDirection: "row",
    // backgroundColor: "#e0e0e0",
  },
  img: {
    borderRadius: 10,
    //padding: 10,
    margin: 5,
    marginBottom: 5,
    width: 190,
    height: 140,
    marginLeft: "auto",
    marginRight: "auto",
    //flex: 1,
  },
  conteiner: {
    flex: 1,
    //width: 160,
    width: "95%",
    marginBottom: 3,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#8bc34a",
  },
  link: {
    padding: 10,
    fontWeight: "bold",
  },
  carrinho: {
    backgroundColor: "#ffea00",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 13,
  },
 
  botao1: {
    backgroundColor: "#ffea00",
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 13,
  },
});

