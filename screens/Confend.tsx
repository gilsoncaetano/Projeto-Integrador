import * as React from "react";
import { Text, View } from "../components/Themed";
import Pagamento from "./Pagamento";
import Endereco from "./Endereco";
import Perfilend from "./Perfilend";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, ScrollView,StyleSheet, RefreshControl,TouchableOpacity } from "react-native";

import * as SQLite from "expo-sqlite";
const Stack = createStackNavigator();
const db = SQLite.openDatabase("appisadb.banco");

export default function ConfirmacaoEndereco() {
  return (
    <Stack.Navigator initialRouteName="ConfEnd">
      <Stack.Screen name="ConfEnd" component={ConfEnd} />
      <Stack.Screen name="Endereco" component={Endereco} />
      <Stack.Screen name="Perfilend" component={Perfilend} />
      <Stack.Screen name="Pagamento" component={Pagamento} />
    </Stack.Navigator>
  );
}
function ConfEnd({navigation}){ 
  const [endereco, setEndereco] = React.useState([]);



  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from endereco", [], (_, { rows: { _array } }) => {
        setEndereco(_array);
      });
    });
  }, []);

  return (
    <View style={tela.conteiner}>
      <ScrollView>
      <Text style={tela.caixatxt}>Estamos dentro de Confirmação de Endereço</Text>
      {endereco.map(
        ({
          idendereco,
          tipo,
          logradouro,
          numero,
          complemento,
          bairro,
          cep,
          idcliente,
          logado,
        })=>(
          <View >
        <Text>ID Endereco:{idendereco}</Text>
          <Text>Tipo:{tipo}</Text>
          <Text>Logradouro:{logradouro}</Text>
          <Text>Número:{numero}</Text>
          <Text>Complemento:{complemento}</Text>
          <Text>Bairro{bairro}</Text>
          <Text>CEP{cep}</Text>
        <Text>ID Cliente{idcliente}</Text>
        </View>
        )
      )}

        <View style={tela.inputView}>
          <TouchableOpacity onPress={()=>{
              navigation.navigate("Endereco")
            }} style={tela.link}>
                <Text >Cadastrar</Text>
              </TouchableOpacity>
              <Text>OU</Text>
              <TouchableOpacity onPress={()=>{
              navigation.navigate("Perfilend")
        }} style={tela.link}>
          
          <Text >Atualizar</Text>
        </TouchableOpacity>
              </View>
      <View style={tela.inputend}>
      <TouchableOpacity onPress={()=>{
           navigation.navigate("Pagamento")
        }}>
          
          <Text style={tela.inputpaga}>Ir para pagamento</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
 inputpaga: {
  fontWeight: "bold",
  fontSize: 16,
  textAlign: "center",
},
inputend: {
  padding: 10,
  height: 40,
  marginTop:30,
  borderRadius: 4,
  backgroundColor: "#ffea00",
  width: "85%",
  marginLeft: "auto",
  marginRight: "auto",
},
link: {
  borderRadius: 6,
  backgroundColor: "#ffea00",
  width: "40%",
  alignItems:'center',
  padding: 10,
  fontWeight: "bold",
},
inputView:{
  marginTop:50,
  marginLeft:30,
  marginRight:30,
  flexDirection:"row",
  alignItems:'center',
  justifyContent:'space-between',
  backgroundColor: "#0000",
},
conteiner: {
  flex: 1,
  width: "100%",
  marginBottom: 3,
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#8bc34a",
},
caixatxt: {
  marginTop:20,
  marginBottom: 20,
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#8bc34a",
},
});