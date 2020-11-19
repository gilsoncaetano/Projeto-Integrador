import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, FlatList, ScrollView,TouchableOpacity } from "react-native-gesture-handler";
import {
  Picker,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageBackground,
  unstable_enableLogBox,
  Alert,
} from "react-native";
import {StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
let lograd = "";
let numer = "";
let compl = "";
let bair = "";
let cidadeend = "";
let estadoend = "";
let cepend = "";
let idcli = 0;
let nomecl = "";
let cpf = "";
let sx = "";
let email = "";
let tel = "";
let ft = "";
let sh = "";

export default function Endereco({ route, navigation }) {
  const { idcliente } = route.params;
  const { nomecli } = route.params;
  const { cpfcli } = route.params;
  const { sexo } = route.params;
  const { emailcli } = route.params;
  const { telefone } = route.params;
  const { foto } = route.params;
  const { senha } = route.params;
  
    

  const [perfilend, setPerfilend] = React.useState([]);
  //const [nomecli, setNomecli] = React.useState("ggg");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [logradouro, setLogradouro] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [complemento, setComplemento] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [localidade, setCidade] = React.useState("");
  const [uf, setEstado] = React.useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");


  const buscar = () => {
    if(cep.replace("-","").length != 8){
      setErro("CEP Invalido")
      return
    }
    setCarregando(true)
      fetch(`https://viacep.com.br/ws/${cep.replace("-","")}/json/`)
      .then((resposta) => resposta.json())
      .then((data) => {
       if (data.erro){
        setErro("CEP não encontrado")
        return
       }
      setEndereco(data)
      setErro("")
      })
      .catch(() => alert("Ocorreu um erro na buscar do CEP!"))
      .finally(() => setCarregando(false))
  }

  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../img/camuflada.png")}
        style={estilo.fundo}
      >
        <ScrollView>
   {/* <View>
        <Text > Nome cliente: {nomecli}</Text>
        <Text > CPF:{cpfcli}</Text>
        <Text >Sexo:{sexo}</Text>
        <Text > E-mail: {emailcli}</Text>
        <Text > Telefone:{telefone}</Text>
        <Text > Foto:{foto}</Text>
        <Text > Senha: {senha}</Text>
        
    </View>    */}
         
          <Text style={estilo.dados}> Endereço</Text>
          <Text style={estilo.txt}> "Preencha todos os campos"</Text>

        
          <View style={estilo.inputView}>  
        <View style={estilo.inputCep}>
        <TextInput
          placeholder="Buscar CEP"
          keyboardType="numeric"
          style={estilo.endpsq} 
          onBlur={(ev) => buscar(ev, setEndereco)}
          onChangeText={(value) => setCep(value)}
          value={cep}
        />
        </View>
        <View style={estilo.inputend}>
        <TouchableOpacity onPress={()=>{
         buscar();
        }}>
        <Text style={estilo.inputpesquisa}>Buscar CEP</Text>
        </TouchableOpacity>
        </View>
        <StatusBar style="auto"/>
        </View>
       
        {carregando && <Text style={estilo.carregando}> Carregando...</Text>}
      
        {erro !="" && <Text style={estilo.erro}>{erro}</Text>}
        
        
        {endereco != null && !carregando && erro == "" && (
        <View style={estilo.bloco1}>


        <View style={estilo.inputxt}>
        <Text style={estilo.txt1}>Endereco:</Text>
        <TextInput style={estilo.input2} value={logradouro} onChangeText={(value) => setLogradouro(value)}
           value={endereco.logradouro}/>
    
        </View>

        <View style={estilo.inputxt}>
        <Text style={estilo.txt1}>Numero:</Text>
        <TextInput style={estilo.input3} onChangeText={(value) => setNumero(value)}
        value={numero}></TextInput>
        </View>
        
        <View style={estilo.inputxt}>
        <Text style={estilo.txt1}>Complemento:</Text>
        <TextInput style={estilo.input4} onChangeText={(value) => setComplemento(value)}
        value={complemento}></TextInput>
        </View>
                        
             
        <View style={estilo.inputxt}>
        <Text style={estilo.txt1}>Bairro:</Text>
        <TextInput  style={estilo.input5} value={bairro} onChangeText={(value) => setBairro(value)}
         value={endereco.bairro}></TextInput>
        </View>

        <View style={estilo.inputxt}>
        <Text style={estilo.txt1}>Cidade:</Text>
        <TextInput style={estilo.input7}  value={localidade} onChangeText={(value) => setCidade(value)}
          value={endereco.localidade}/> 

        </View>

       

        <View style={estilo.inputxt}>
        <Text style={estilo.txt1}>Estado:</Text>
        <TextInput  style={estilo.input7} value={uf} onChangeText={(value) => setEstado(value)}
           value={endereco.uf}></TextInput>
        </View>

        </View>
        )}
          


          <View style={estilo.cadastrar}>
          <TouchableOpacity
              onPress={() => {
                nomecl = nomecli;
                cpf = cpfcli;
                sx = sexo;
                email = emailcli;
                tel = telefone;
                ft = foto;
                sh = senha;
                lograd = logradouro;
                numer = numero;
                compl = complemento;
                bair = bairro;
                cidadeend = localidade;
                estadoend = uf;
                cepend = cep;

                if (lograd == "" || numer == "" || compl == "" || bair == "" || cidadeend == "" || estadoend == "" || cep == ""){
                  Alert.alert("Alerta", "Para Validadar todos os campos Preenchido altomatico e preciso da um espaço ao final de cada campo preenchedo altomatio!");
                  navigation.navigate("PrimeiroCadEnd");
                } else {
                  Alert.alert("Alerta", "Cliente cadastrado com sucesso!");
                
                efetuarCadastro();
               // navigation.navigate("Login");
                               
              }}}
              >
                <Text style={estilo.botao}> Cadastrar </Text>
              </TouchableOpacity>
              </View>
              

        </ScrollView>
      </ImageBackground>
    </View>
  );

  // <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Login" component={Login} />
  //   </Stack.Navigator>
  // </NavigationContainer>;
}

const estilo = StyleSheet.create({
  carregando:{
    color:'#2b2d42',
    fontSize:25,
    marginLeft: "auto",
    marginRight: "auto",
  },
  erro:{
    width: "60%",
    marginTop:20,
    backgroundColor: "#fafafa",
    paddingLeft:40,
    //borderRadius: 4,
    padding:6,
    fontSize:25,
    color:'red',
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom:-20,
  },
  endcaixa:{
    height: 39,
    marginTop:-21,
    fontSize:20,
    width: "65%",
    marginLeft:110,  
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
    color: "red",
    marginBottom:-10,
    marginTop:-4,
    paddingLeft:10,
    fontSize:21,
  },

  input1:{
    height: 39,
    marginTop:-21,
    fontSize:20,
    width: "77%",
    marginLeft:63,
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
  input7:{
    height: 38,
    marginTop:-21,
    fontSize:20,
    width: "74%",
    marginLeft:85,
  },
bloco1:{
  width:"93%",
  marginBottom:-54,
  marginTop:3,
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#0000",
  },

idcaixa: {
  borderRadius: 10,
  backgroundColor: "#ffea00",
  marginLeft:30,
  marginRight:30,
  marginBottom:5,
  alignItems:'center',
  padding: 4,
  marginTop:3,
  fontWeight: "bold",
},
  fundo: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
  },
  dados: {
    color: "white",
    marginTop: 40,
    fontSize: 25,
    margin: 14,
    marginLeft: "auto",
    marginRight: "auto",
  },
  txt: {
    color: "#fafafa",
    marginLeft: "auto",
    marginRight: "auto",
  },
  area: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  botao: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: "#f9a825",
    color: "white",
  },
  cadastrar: {
    height: 40,
    borderRadius: 6,
    marginTop: 80,
    marginBottom:25,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputend: {
    padding: 10,
    height: 40,
    marginTop:10,
    marginBottom:10,
    borderRadius: 4,
    backgroundColor: "#ffea00",
    width: "35%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputpesquisa: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  endpsq: {
    backgroundColor: "white",
    padding: 2,
    width: "82%",
    fontSize:20,
    margin: 6,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  inputCep: {
  width: "60%",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: 6,
  },
  inputView:{
    width: "86%",
    marginTop:20,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: "#0000",
  },
});

function efetuarCadastro() {
  fetch("http://192.168.0.2:8080/projetoisaclube/service/cliente/cadend.php", {
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
      nomecliente: nomecl,
      cpf: cpf,
      sexo: sx,
      email: email,
      telefone: tel,
      senha: sh,
      foto: ft,
      
    }),
  })

  .then((response) => response.json())
  .then((resposta) => {
   
    console.log(resposta);
  
  })
  .catch((error) => console.error(error));

}

