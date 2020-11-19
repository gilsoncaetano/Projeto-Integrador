import * as React from "react";
import Perfil from "./Perfil";
import Dadoscli from "./Dadoscli";
import Inicial from "./Inicial";
import { Text, View } from "../components/Themed";
import { StyleSheet, Picker, Alert, TextInput, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView, RefreshControl, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "../navigation/BottomTabNavigator";


import * as SQLite from "expo-sqlite";
const Stack = createStackNavigator();
const db = SQLite.openDatabase("appisadb.banco");

let lograd = "";
let numer = "";
let compl = "";
let bair = "";
let cidadeend = "";
let estadoend = "";
let cepend = "";
let idcli = 0;

export default function Editar({navigation}) {
  const [idcliente, setIdcliente] = React.useState([0]);
  const [logradouro, setLogradouro] = React.useState([0]);
  const [numero, setNumero] = React.useState([0]);
  const [complemento, setComplemento] = React.useState([0]);
  const [bairro, setBairro] = React.useState([0]);
  const [cidade, setCidade] = React.useState([0]);
  const [estado, setEstado] = React.useState([0]);
  const [cep, setCep] = React.useState([0]);

  const [perfil, setPerfil] = React.useState([]);

    // ---Vamos criar uma constante para realizar o refresh(atualizarção da tela)
    const [refreshing, setRefreshing] = React.useState(false);
    // codificação de atualização de atualização dos dados de tela
   const onRefresh = React.useCallback(()=>{
     setRefreshing(true);
     db.transaction((tx)=>{
     });
    
   },[]);

   React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
        setIdcliente(_array[0].idcliente.toString());
        setLogradouro(_array[0].logradouro.toString());
        setNumero(_array[0].numero.toString());
        setComplemento(_array[0].complemento.toString());
        setBairro(_array[0].bairro.toString());
        setCidade(_array[0].cidade.toString());
        setEstado(_array[0].estado.toString());
        setCep(_array[0].cep.toString());
        setPerfil(_array);
        console.log(_array); 
      });
    });
  }, []);

   return (
      <View style={tela.conteiner}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <Text style={tela.perfiltxt}>Atualizar Endereço</Text>
      
        {perfil.map(
          ({
          id,           
          foto,               
          
          }) => (
            <View style={tela.bloco}>

              <Image
                source={{ uri: `http://192.168.0.2:8080/projetoisaclube/img/${foto}` }}
                style={tela.img}
              />   
            </View>
            
          )
          
        )}
      <View style={tela.bloco1}>
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Endereço:</Text>
        <TextInput style={tela.input2} onChangeText={(value) => setLogradouro(value)}
            value={logradouro}></TextInput>
        </View>

        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Número:</Text>
        <TextInput style={tela.input3} onChangeText={(value) => setNumero(value)}
            value={numero}></TextInput>
        </View>
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Complemento:</Text>
        <TextInput style={tela.input4} onChangeText={(value) => setComplemento(value)}
            value={complemento}></TextInput>
        </View>
                         
             
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Bairro:</Text>
        <TextInput style={tela.input5} onChangeText={(value) => setBairro(value)}
            value={bairro}></TextInput>
        </View>

        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Cidade:</Text>
        <TextInput style={tela.input1} onChangeText={(value) => setCidade(value)}
            value={cidade}></TextInput>
        </View>

        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Estado:</Text>
        <TextInput style={tela.input1} onChangeText={(value) => setEstado(value)}
            value={estado}></TextInput>
        </View>
        
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>CEP:</Text>
        <TextInput style={tela.input6} keyboardType="phone-pad" onChangeText={(value) => setCep(value)}
            value={cep}></TextInput>
        </View>

        {/* <View style={tela.inputxt}>
        <Text style={tela.txt1}>ID:</Text>
        <TextInput style={tela.input5} keyboardType="phone-pad">{idcliente}</TextInput>
        </View> */}

        </View>
                  
          <View style={tela.inputperf}>
          <TouchableOpacity onPress={()=>{
           lograd = logradouro;
           numer = numero;
           compl = complemento;
           bair = bairro;
           cidadeend = cidade;
           estadoend = estado;
           cepend = cep;
           idcli = idcliente;
           
            if (lograd == "" || numer == "" || compl == "" || bair == "" || cidadeend == "" || estadoend == "" || cepend == ""){
             Alert.alert("Alerta", "preencha todos os campos");
             navigation.navigate("Endereco");
           } else {
           Alert.alert("Alerta", "Endereço Alterado com sucesso");
          
          salva();
          //navigation.navigate("Perfil");
          }}}>
          
          <Text style={tela.inputpe}>Salvar</Text>
        </TouchableOpacity>
        </View>
 
    </ScrollView>
    </View>
    );
    
  <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Perfil" component={Perfil} />
  </Stack.Navigator>
</NavigationContainer>;

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
  nome: {
    padding: 7,
    fontSize: 16,
  },
  blocotxt:{
  marginTop:20,
  backgroundColor: "#8bc34a",
  },
  cadastro: {
  marginTop:-10,
  backgroundColor: "white",
  borderRadius: 5,
  padding: 13,
  width: "50%",
  margin: 8,
  marginLeft: "auto",
  marginRight: "auto",
  },
 input1:{
  height: 39,
  marginTop:-21,
  fontSize:20,
  width: "73%",
  marginLeft:85,
  //backgroundColor: "#8bc34a",
},
input2:{
  height: 39,
  marginTop:-21,
  fontSize:20,
  width: "65%",
  marginLeft:110,  
},
input3:{
  height: 39,
  marginTop:-21,
  fontSize:20,
  width: "69%",
  marginLeft:97,
  
},
input4:{
  height: 37,
  marginTop:-21,
  fontSize:20,
  width: "51%",
  marginLeft:153,
},
input5:{
  height: 38,
  marginTop:-21,
  fontSize:20,
  width: "73%",
  marginLeft:77,
},
input6:{
  height: 38,
  marginTop:-21,
  fontSize:20,
  width: "82%",
  marginLeft:60,
  //backgroundColor: "#8bc34a",
},
  inputxt: {
    padding:10,
    height: 40,
    borderRadius: 4,
    marginBottom:10,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  txt1:{
    marginBottom:-10,
    marginTop:-4,
    paddingLeft:10,
    fontSize:21,
  },
  inputxtsh: {
    padding:10,
    height: 40,
    borderRadius: 4,
    marginBottom:10,
    width: "84%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  txt2:{
    marginBottom:-10,
    marginTop:-4,
    paddingLeft:10,
    fontSize:21,
  },
  perfiltxt: {
    marginTop:20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize:24,
    backgroundColor: "#8bc34a",
  },
  bloco:{
  width:"93%",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#8bc34a",
  },
  bloco1:{
    width:"93%",
    marginTop:18,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#8bc34a",
    },
  conteiner: {
    flex: 1,
    width: "100%",
    marginBottom: 3,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#8bc34a",
  },
  inputpe: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  inputperf: {
    padding:10,
    height: 40,
    marginTop:30,
    borderRadius: 4,
    marginBottom:20,
    backgroundColor: "#ffea00",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  link: {
    borderRadius: 6,
    backgroundColor: "#ffea00",
    width: "45%",
    padding: 10,
  },
  inputView:{
    marginTop:20,
    marginLeft:30,
    marginRight:30,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: "#8bc34a",
  },
  botao2:{
    textAlign: "center", 
  },

});

function salva() {
  fetch("http://192.168.0.2:8080/projetoisaclube/service/endereco/alterarendereco.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    logradouro: lograd,
    numero: numer,
    complemento: compl,
    bairro: bair,
    cidade: cidadeend ,
    estado: estadoend ,
    cep: cepend,
    idcliente: idcli,
      
    }),
  })

  .then((response) => response.json())
  .then((resposta) => {
    console.log(resposta);
    //Alert.alert("Gravado");
  })
  .catch((error) => console.error(error));
 // sairDoApp();
}

// sairDoApp();
// function sairDoApp(){
//  db.transaction((tx)=>{
//   tx.executeSql("drop table perfil");
// });
// //alert("Deslogado do Perfil")
// }
