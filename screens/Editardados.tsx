import * as React from "react";
import Perfil from "../screens/Perfil";
import Dadoscli from "../screens/Dadoscli";
import Inicial from "../screens/Inicial";
import { Text, View } from "../components/Themed";
import { StyleSheet, Picker, Alert, TextInput, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView, RefreshControl, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "../navigation/BottomTabNavigator";


import * as SQLite from "expo-sqlite";
const Stack = createStackNavigator();
const db = SQLite.openDatabase("appisadb.banco");
let nomecl = "";
let cpfcli = "";
let sx = "";
let emailcli = "";
let tel = "";
let ft = "";
let sh = "";
let idcli = 0;

export default function Editar({navigation}) {
  const [idcliente, setIdcliente] = React.useState([0]);
  const [nomecliente, setNomecliente] = React.useState([0]);
  const [cpf, setCpf] = React.useState([0]);
  const [sexo, setSexo] = React.useState([0]);
  const [email, setEmail] = React.useState([0]);
  const [telefone, setTelefone] = React.useState([0]);
  const [foto, setFoto] = React.useState([0]);
  const [senha, setSenha] = React.useState([0]);

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
        setNomecliente(_array[0].nomecliente.toString());
        setCpf(_array[0].cpf.toString());
        setSexo(_array[0].sexo.toString());
        setEmail(_array[0].email.toString());
        setTelefone(_array[0].telefone.toString());
        setFoto(_array[0].foto.toString());
        setSenha(_array[0].senha.toString());
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
        <Text style={tela.perfiltxt}>Atualizar Perfil</Text>
      
        {perfil.map(
          ({
          id,           
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

            </View>
            
          )
          
        )}
      <View style={tela.bloco1}>
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Nome:</Text>
        <TextInput style={tela.input1} onChangeText={(value) => setNomecliente(value)}
            value={nomecliente}></TextInput>
        </View>
        <View style={tela.inputcpf}>
        <Text style={tela.txt2}>CPF: {cpf}</Text>
        {/* <TextInput style={tela.input2}>{cpf}</TextInput> */}
        </View>
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Sexo:</Text>
        <TextInput style={tela.input3} onChangeText={(value) => setSexo(value)}
            value={sexo}></TextInput>
        </View>
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>E-Mail:</Text>
        <TextInput style={tela.input4} keyboardType="email-address" onChangeText={(value) => setEmail(value)}
            value={email}></TextInput>
        </View>
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Telefone:</Text>
        <TextInput style={tela.input5} keyboardType="phone-pad" onChangeText={(value) => setTelefone(value)}
            value={telefone}></TextInput>
        </View>
                         
             
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Foto:</Text>
        <TextInput style={tela.input2} onChangeText={(value) => setFoto(value)}
            value={foto}></TextInput>
        </View>
        
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Senha:</Text>
        <TextInput placeholder="Atualiza ou confirma!" style={tela.input6} onChangeText={(value) => setSenha(value)}
          secureTextEntry></TextInput>
        </View>

        {/* <View style={tela.inputxt}>
        <Text style={tela.txt1}>ID:</Text>
        <TextInput style={tela.input5} keyboardType="phone-pad">{idcliente}</TextInput>
        </View> */}

        </View>
                  
          <View style={tela.inputperf}>
          <TouchableOpacity onPress={()=>{
           nomecl = nomecliente;
           cpfcli = cpf;
           sx = sexo;
           emailcli = email;
           tel = telefone;
           ft = foto;
           sh = senha;
           idcli = idcliente;
           if (nomecl == "" || cpfcli == "" || sx == "" || emailcli == "" || tel == "" || ft == "" || sh == ""){
            Alert.alert("Alerta", "preencha todos os campos");
            navigation.navigate("Editardados");
          } else {
          Alert.alert("Alerta", "Endereço cadastrado com sucesso");
          
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
  height: 38,
  marginTop:-22,
  fontSize:20,
  width: "77%",
  marginLeft:79,
},
input2:{
  height: 38,
  marginTop:-22,
  fontSize:20,
  width: "81%",
  marginLeft:63,
    
},
input3:{
  height: 38,
  marginTop:-22,
  fontSize:20,
  width: "79%",
  marginLeft:69,
},
input4:{
  height: 38,
  marginTop:-22,
  fontSize:20,
  width: "74%",
  marginLeft:80,
},
input5:{
  height: 38,
  marginTop:-22,
  fontSize:20,
  width: "67%",
  marginLeft:100,
},
input6:{
  height: 38,
  marginTop:-22,
  fontSize:20,
  width: "67%",
  marginLeft:80,
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
  inputcpf: {
    padding:10,
    height: 40,
    borderRadius: 4,
    marginBottom:10,
    width: "90%",
    //borderWidth:5,
    //borderColor:"red",
    backgroundColor: "#ff5722",
    marginLeft: "auto",
    marginRight: "auto",
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
  txt1:{
    marginBottom:-10,
    marginTop:-4,
    paddingLeft:10,
    fontSize:21,
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
  fetch("http://192.168.0.2:8080/projetoisaclube/service/cliente/atualizacli.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
 
    nomecliente: nomecl,
    cpf: cpfcli,
    sexo: sx,
    email: emailcli,
    telefone: tel,
    senha: sh,
    foto: ft,
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
