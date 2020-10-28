import * as React from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView, RefreshControl } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import Endereco from "../screens/Endereco";

import * as SQLite from "expo-sqlite";
const Stack = createStackNavigator();
const db = SQLite.openDatabase("appisadb.banco");


// constante para nos ajudar a pausar a tela enquanto o indicator realizar a animação
// de girar anquanto o refreshControl atualiza a tela
const wait = (timeout)=>{
  return new Promise((resolver)=>{
    setTimeout(resolver,timeout);
  });
};

export default function PerfilEnd() {
  return(
    <Stack.Navigator initialRouteName="TelaPerfilend">
      <Stack.Screen name="TelaPerfilend" component={TelaPerfilend}/>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator}
      options={{headerTitle:"Endereço"}}/>
      <Stack.Screen name="Endereco" component={Endereco}/>
    </Stack.Navigator>
   );
  
  }




  function TelaPerfilend({navigation}){
  const [dados, setDados] = React.useState([]);
  const [perfil, setPerfil] = React.useState([]);

    // ---Vamos criar uma constante para realizar o refresh(atualizarção da tela)
    const [refreshing, setRefreshing] = React.useState(false);
    // codificação de atualização de atualização dos dados de tela
   const onRefresh = React.useCallback(()=>{
     setRefreshing(true);
     db.transaction((tx)=>{
       tx.executeSql("select * from perfil",[],(_,{rows:{_array}})=>{
         setDados(_array);
       })
     })
     wait(2000).then(()=> setRefreshing(false));
   },[]);

   React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
        setPerfil(_array);
      });
    });
  }, []);

  return (
      <View style={tela.conteiner}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <Text style={tela.perfiltxt}>Endereço</Text>

        {perfil.map(
          ({
          id,
          
          idcliente,             
          nomecliente, 
          foto,               
          cpf,        
          sexo,         
          email,         
          telefone,      
          idendereco,      
          tipo,         
          logradouro,              
          numero,           
          complemento,               
          bairro,          
          cep,       
          idarma,          
          cpfarma,           
          funcao,          
          sigma,         
          arma,        
          fabricante,              
          calibre,           
          modelo,          
          cano,        
          capacidade,              
          funcionamento, 
          notafiscal,              
          datafiscal,              
          orgaoauto,             
          codigoauto,      
          logado,
          }) => (
            <View style={tela.bloco}>
              <Image
                source={{ uri: `http://192.168.0.2:8080/projetoisaclube/img/${foto}` }}
                style={tela.img}
              />
              <Text style={tela.txt1}>IDC: {idcliente}</Text>
              <Text style={tela.txt1}>Idendereco: {idendereco}</Text>
              <Text style={tela.txt1}>Tipo: {tipo}</Text>
              <Text style={tela.txt1}>Logradouro: {logradouro}</Text>
              <Text style={tela.txt1}>Número: {numero}</Text>
              <Text style={tela.txt1}>Complemento: {complemento}</Text>
              <Text style={tela.txt1}>Bairro: {bairro}</Text>
              <Text style={tela.txt1}>CEP: {cep}</Text>
             
            </View>
          )
        )}
        <View style={tela.inputView}>
         
          <TouchableOpacity onPress={()=>{
            navigation.navigate("Perfil")
        }} style={tela.link}>
          
          <Text style={tela.botao2}>Atualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
         navigation.navigate("Endereco")
         }} style={tela.link}>
          <Text >Cadastrar</Text>
          </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  img: {
    borderRadius: 30,
    width: 220,
    height: 250,
    marginLeft: "auto",
    marginRight: "auto",
    flex: 1,
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
  txt1:{
    marginTop:10,
    padding:10,
    paddingBottom:8,
    fontSize:23,
    backgroundColor: "#E4EBEE",
  },
  bloco:{
    width:"90%",
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
  marginBottom:20,
  flexDirection:"row",
  alignItems:'center',
  justifyContent:'space-between',
  backgroundColor: "#8bc34a",
},
botao2:{
    textAlign: "center", 
},
});

function perfilEnd(idcliente) {
    alert("Produto Foi Encaminhado Para O Carrinho");
  
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists cliente(id integer primary key,idcliente int);"
      );
    });
  
    db.transaction((tx) => {
      tx.executeSql(
        "insert into itens(idcliente)values(?)",
        [idcliente]
      );
      tx.executeSql("select * from cliente", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
      });
      tx.executeSql("drop table perfil");
    });
  }