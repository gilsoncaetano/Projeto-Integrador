import * as React from "react";
import {
  Image,
  ImageBackground,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Cadastrar from "./Cadastrar";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import { useEffect, useState, } from "react";



const db = SQLite.openDatabase("appisadb.banco");

const Stack = createStackNavigator();
let logaemail = "";
let sh = "";

export default function Login() {

  return(
    <Stack.Navigator initialRouteName="TelaLogin">
      <Stack.Screen name="TelaLogin" component={TelaLogin}/>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator}
      options={{headerTitle:"App Isa Clube"}}/>
      <Stack.Screen name="Cadastrar" component={Cadastrar}/>
    </Stack.Navigator>
  );

  }
function TelaLogin({navigation}){
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  //const [cpf, setCpf] = React.useState("");

  return (
    <View style={estilo.area}>
       <ImageBackground
        source={require("../img/camuflada.png")}
        style={estilo.fundo}
      >
       <Image source={require("../img/saw-logo.png")} style={estilo.logo} />
       <TextInput
          placeholder="E-mail"
          keyboardType="email-address"
          style={estilo.acesso}
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Senha"
          style={estilo.acesso}
          onChangeText={(value) => setSenha(value)}
          value={senha}
        />

          <TouchableOpacity>
          <Text style={estilo.txt}> Esqueci a Senha ou Usuario</Text>
        </TouchableOpacity>

        <View style={estilo.inputloga}>
        <TouchableOpacity
          onPress={() => {
            logaemail = email;
            sh = senha;
            if (email == "" || senha == "" ){
              Alert.alert("Alerta", "Email ou senha Incorreto");
              navigation.navigate("Login");
            } else {
           // Alert.alert("Alerta", "Logado com sucesso");  
            logar();
            navigation.navigate("BottomTabNavigation");
            }
            
            }}>
          <Text style={estilo.botao}> Login </Text>
        </TouchableOpacity>
        </View>
        <View style={estilo.inputloga}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cadastrar")}>
          <Text style={estilo.botao}> Primeiro Acesso </Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
  // <NavigationContainer>
  //   <Stack.Navigator>
  //     {/* <Stack.Screen name="Listar" component={Listar} /> */}
  //     <Stack.Screen name="Cadastrar" component={Cadastrar} />
  //   </Stack.Navigator>
  // </NavigationContainer>;
}

const estilo = StyleSheet.create({
  area: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  acesso: {
    marginTop: 30,
    backgroundColor: "white",
    color: "#f50057",
    padding: 13,
    width: "85%",
    margin: 5,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    shadowOpacity: 1,
    borderRadius: 10,
    borderBottomColor: "silver",
  },
  txt: {
    color: "#fafafa",
    marginLeft: "auto",
    marginRight: "auto",
  },
  botao: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: "#f9a825",
    color: "white",
  },
    inputloga: {
    height: 40,
    borderRadius: 6,
    marginTop: 50,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
   logo: {
    width: 130,
    height: 150,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
  },
  fundo: {
    flex: 1,
    resizeMode: "center",
  },
});
function logar() {
  // fetch("http://192.168.0.2:8080/projetoisaclube/service/usuario/listarlog.php", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     email: logaemail,
  //     senha: sh,
  //   }),
  // })
  // .then((response) => response.json())
  //   .then((resposta) => {
  //     gravarPerfil(resposta.saida[0]);
  //     console.log(resposta);
  //     Alert.alert("logado");
  //   })
  
  fetch("http://192.168.0.2:8080/projetoisaclube/service/usuario/login.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: logaemail,
      senha: sh,
    }),
  })
 
    .then((response) => response.json())
    .then((resposta) => {
      gravarPerfil(resposta.saida[0]);
      //console.log(resposta);
     // Alert.alert("logado");
    })
    .catch((error) => console.error(error));
}
function gravarPerfil(dados) {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists perfil(id integer primary key, idcliente int, nomecliente text, foto text, cpf text, sexo text, email text, senha text, telefone text,idendereco text, logradouro text, numero text, complemento text, bairro text, cidade text, estado text, cep text, idarma text, cpfarma text, funcao text, sigma text, arma text, fabricante text, calibre text, modelo text, cano text, capacidade text, funcionamento text, notafiscal text, datafiscal text, orgaoauto text, codigoauto text, logado int);"
    );
  })
  db.transaction((tx) => {
    tx.executeSql(
      "insert into perfil (idcliente, nomecliente, foto, cpf, sexo, email, senha, telefone,idendereco, logradouro, numero, complemento, bairro, cidade, estado, cep, idarma, cpfarma, funcao, sigma, arma, fabricante, calibre, modelo, cano, capacidade, funcionamento, notafiscal, datafiscal, orgaoauto, codigoauto, logado)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        
        dados.idcliente,
        dados.nomecliente,
        dados.foto,                    
        dados.cpf,        
        dados.sexo,         
        dados.email,     
        dados.senha,     
        dados.telefone,
        dados.idendereco,                    
        dados.logradouro,              
        dados.numero,           
        dados.complemento,               
        dados.bairro,   
        dados.cidade,        
        dados.estado, 
        dados.cep,       
        dados.idarma,          
        dados.cpfarma,           
        dados.funcao,          
        dados.sigma,         
        dados.arma,        
        dados.fabricante,              
        dados.calibre,           
        dados.modelo,          
        dados.cano,        
        dados.capacidade,              
        dados.funcionamento, 
        dados.notafiscal,              
        dados.datafiscal,              
        dados.orgaoauto,             
        dados.codigoauto,             
        1,
      ]
    );
    tx.executeSql("select * from perfil", [], (_, { rows }) => {
      console.log(rows);
    });
  });
}