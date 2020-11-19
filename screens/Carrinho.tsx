import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import { TextInput, ScrollView, RefreshControl, } from "react-native";
import { Picker, Button, StyleSheet, Image } from "react-native";
import Confend from "./Confend";
import * as SQLite from "expo-sqlite";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Value } from "react-native-reanimated";

const db = SQLite.openDatabase("appisadb.banco");
const Stack = createStackNavigator();
const StackPagamento = createStackNavigator();

//constante para nos ajudar a pausar a tela enquanto o indicator realizar a animação
//de girar anquanto o refreshControl atualiza a tela
const wait = (timeout)=>{
  return new Promise((resolver)=>{
    setTimeout(resolver,timeout);
  });
};

export default function Carrinho() {
  return (
    <Stack.Navigator initialRouteName="CarrinhoLoja">
      <Stack.Screen name="CarrinhoLoja" component={CarrinhoLoja} />
      <Stack.Screen name="Confend" component={Confend} />
    </Stack.Navigator>
  );
}
function CarrinhoLoja({navigation}){
  const [dados, setDados] = React.useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [valor, setValor] = useState(0);
  const [clinques, setClinques] = useState(0);

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
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <Text style={tela.titulo}> Veja seus produtos no carrinho</Text>
        <Text style={tela.infor}>"Toque na tela e arraster para baixo para atualizar o carrinho"</Text>
        {dados.map(({ idp, idproduto, nomeproduto, preco, foto }) => (
          <View style={tela.conteiner} key={idproduto}>
            <Image
              source={{ uri: `http://192.168.0.2:8080/projetoisaclube/img/${foto}` }}
              style={tela.img}
            />
            <Text style={tela.produto}>{nomeproduto}</Text>
            <Text style={tela.preco}>{preco}</Text>
            {/* <Text>Quantidade: </Text>
            <TextInput
              placeholder="1"
              value={quantidade}
              onChangeText={(value) => setQuantidade(value)}
            /> */}

          <View style={tela.input2}>
          <TouchableOpacity onPress={()=>{
            setQuantidade(quantidade -1);
            //setClinques(clinques + 1);
            }} style={tela.link}>
                <Text >- 1</Text>
          </TouchableOpacity>

            <View style={tela.inputTxt}>
                    
          <Text style={tela.txt} value={quantidade} onChangeText={(value) => setQuantidade(value)}
            >{quantidade}</Text>
          </View>

          <TouchableOpacity onPress={()=>{
            setQuantidade(quantidade + 1);
            //setClinques(clinques + 1);
             }} style={tela.link}>
          <Text >+ 1</Text>
          </TouchableOpacity>
           </View>

            <View style={tela.inputRetira}>
            <TouchableOpacity
              onPress={() => {
                db.transaction((tx) => {
                  tx.executeSql("delete from itens where idp=?", [idp]);
                });
              alert("Toque na tela e arraster para baixo para atualizar o carrinho")
              }}>
              <Text style={tela.inputcar}>Retira do Carrinho</Text>
            </TouchableOpacity>
            </View>
           
          </View>
        ))}
        <View style={tela.inputView}>
        <TouchableOpacity onPress={()=>{
          navigation.navigate("Confend")
        }}>
          
          <Text style={tela.inputcar}>Ir para pagamento</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
   img: {
    borderRadius: 10,
    //padding: 10,
    margin: 5,
    marginBottom: 5,
    width: 190,
    height: 140,
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
  inputcar: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  titulo:{
    color: "white",
    fontWeight: "bold",
    marginTop:17,
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  infor:{
    color: "#f44336",
    marginTop:10,
    marginBottom:10,
    fontSize: 12,
    paddingLeft:10,
    paddingRight:10,
    marginLeft: "auto",
    marginRight: "auto",
  },
produto:{
  marginTop:10,
  fontSize: 16,
  marginLeft: "auto",
  marginRight: "auto",
},
preco:{
  fontWeight: "bold",
  marginTop:15,
  fontSize: 16,
  marginLeft: "auto",
  marginRight: "auto",
},
  input2:{
    marginTop:20,
    marginLeft:95,
    marginRight:95,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: "#0000",
  },
  link: {
    borderRadius: 6,
    backgroundColor: "#ffea00",
    paddingLeft:20,
    paddingRight:20,
    alignItems:'center',
    padding: 10,
    fontWeight: "bold",
  },
txt:{
  fontSize: 20,
  backgroundColor: "#0000",
},
inputTxt:{
  borderRadius: 6,
  paddingLeft:20,
  paddingRight:20,
  padding: 6,
},
  inputRetira: {
    padding: 7,
    height: 35,
    borderRadius: 6,
    marginTop: 30,
    backgroundColor: "#f44336",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
    inputView: {
    padding: 10,
    height: 40,
    borderRadius: 6,
    marginTop: 30,
    backgroundColor: "#ffea00",
    width: "85%",
    marginBottom:25,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

