import * as React from "react";
import Perfilend from "../screens/Perfilend";
import Editardados from "../screens/Editardados";
import Inicial from "../screens/Inicial";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView, RefreshControl, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "../navigation/BottomTabNavigator";


import * as SQLite from "expo-sqlite";
const Stack = createStackNavigator();
const db = SQLite.openDatabase("appisadb.banco");

export default function Perfil() {
  return(
    <Stack.Navigator initialRouteName="TelaPerfil">
      <Stack.Screen name="TelaPerfil" component={TelaPerfil}/>
      <Stack.Screen name="BottomNavigator" component={BottomTabNavigator}
      options={{headerTitle:"Confirmação de Endereço"}}/>
      <Stack.Screen name="Editardados" component={Editardados}/>
      <Stack.Screen name="Perfilend" component={Perfilend}/>
      
    </Stack.Navigator>
   );
  
  }
  function TelaPerfil({navigation}){
  const [dados, setDados] = React.useState([]);
  const [perfil, setPerfil] = React.useState([]);
  const [endereco, setEndereco] = React.useState([]);  
  const [carregado, setCarregado] = React.useState(true);

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
        setPerfil(_array);
      });
       tx.executeSql("select * from endereco", [], (_,{rows:{_array}})=>{
        setEndereco(_array); 
        console.log(_array)
        
      });
    });
  }, []);

   return (
      <View style={tela.conteiner}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <Text style={tela.perfiltxt}>Perfil</Text>
      
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
          }) => (
            <View style={tela.bloco}>

              <Image
                source={{ uri: `http://192.168.0.2:8080/projetoisaclube/img/${foto}` }}
                style={tela.img}
              />
              <View style={tela.blocotxt}>
              {/* <Text style={tela.txt1}>Idcliente: {idcliente}</Text> */}
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>Nome: {nomecliente}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>CPF: {cpf}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>Sexo: {sexo}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>E-Mail: {email}</Text>
              </View>
              <View style={tela.inputxt}>
              <Text style={tela.txt1}>Telefone: {telefone}</Text>
              </View>
              </View>
              
            </View>
            
          )
          
        )}
             <View style={tela.inputView}>
              <TouchableOpacity 
              onPress={() => {

                navigation.navigate("Editardados")
              }}  style={tela.link}>
                <Text style={tela.botao2}>Atualizar Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  navigation.navigate("Perfilend", {
                   // idcliente: `${item.idcliente}`,
                  });
                }} style={tela.link}
              >
          <Text style={tela.botao2}>Endereco</Text>
        </TouchableOpacity>
          </View>

           
          <View style={tela.inputperf}>
          <TouchableOpacity onPress={()=>{
          navigation.navigate("Inicial")
          
        }}>
          
          <Text style={tela.inputpe}>Sair do Perfil</Text>
        </TouchableOpacity>
        </View>
 
    </ScrollView>
    </View>
    );
    
  <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Inicial" component={Inicial} />
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
    fontSize:23,
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

sairDoApp();
function sairDoApp(){
 db.transaction((tx)=>{
  tx.executeSql("drop table perfil");
});
//alert("Deslogado do Perfil")
}
