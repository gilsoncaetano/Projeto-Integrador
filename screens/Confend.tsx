import * as React from "react";
import { Text, View } from "../components/Themed";
import Credito from "./Credito";
import Endereco from "./Endereco";
import EditarEndereco from "./EditarEndereco";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput,Image, ScrollView,StyleSheet, RefreshControl,TouchableOpacity } from "react-native";

import * as SQLite from "expo-sqlite";
const Stack = createStackNavigator();
const db = SQLite.openDatabase("appisadb.banco");

export default function ConfirmacaoEndereco() {
  return (
    <Stack.Navigator initialRouteName="ConfEnd">
      <Stack.Screen name="ConfEnd" component={ConfEnd} />
      <Stack.Screen name="Endereco" component={Endereco} />
      <Stack.Screen name="EditarEndereco" component={EditarEndereco} />
      <Stack.Screen name="Credito" component={Credito} />
    </Stack.Navigator>
  );
}
function ConfEnd({navigation}){ 
  const [endereco, setEndereco] = React.useState([]);



  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
        setEndereco(_array);
      });
    });
  }, []);

  return (
    <View style={tela.conteiner}>
      <ScrollView>
      <Text style={tela.caixatxt}>Confirmação de Endereço</Text>
      {endereco.map(
        ({
          id,
          idcliente,             
          foto,
          tipo,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade, 
          estado,         
          cep, 
          logado,
        })=>(
          <View style={tela.bloco}>
            <Image
                source={{ uri: `http://192.168.0.2:8080/projetoisaclube/img/${foto}` }}
                style={tela.img}
              />
            <View style={tela.blocotxt}>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>Logradouro: {logradouro}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>Número: {numero}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>Complemento: {complemento}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>Bairro: {bairro}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>Cidade: {cidade}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>Estado: {estado}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>CEP: {cep}</Text>
              </View>
              </View>
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
              navigation.navigate("EditarEndereco")
        }} style={tela.link}>
          
          <Text >Atualizar</Text>
        </TouchableOpacity>
        </View>
      <View style={tela.inputend}>
      <TouchableOpacity onPress={()=>{
           navigation.navigate("Credito")
        }}>
          
          <Text style={tela.inputpaga}>Ir para pagamento</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  img: {
    borderRadius: 30,
    width: 215,
    height: 250,
    marginLeft: "auto",
    marginRight: "auto",
    flex: 1,
  },
  blocotxt:{
   marginTop:20,
  backgroundColor: "#8bc34a",
  },
  inputxt: {
  padding:10,
  height: 40,
  borderRadius: 4,
  marginBottom:10,
  width: "93%",
  marginLeft: "auto",
  marginRight: "auto",
  },
  txt1:{
  marginBottom:-10,
  marginTop:-4,
  paddingLeft:10,
  fontSize:23,
  },
 inputpaga: {
  fontWeight: "bold",
  fontSize: 16,
  textAlign: "center",
},
bloco:{
  width:"90%",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#8bc34a",
  },
inputend: {
  padding: 10,
  height: 40,
  marginTop:30,
  marginBottom:30,
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
  marginTop:20,
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
  fontWeight: "bold",
  fontSize:20,
  backgroundColor: "#8bc34a",
},
});