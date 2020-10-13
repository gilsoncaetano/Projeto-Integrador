import * as React from "react";
import { Text, View } from "../components/Themed";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import Usuario from "../screens/Usuario";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("appisadb.banco");

const Stack = createStackNavigator();
let us = "";
let sh = "";

export default function Login({ navigation }) {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");

  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../img/camuflada.png")}
        style={estilo.fundo}
      >
        <Image source={require("../img/saw-logo.png")} style={estilo.logo} />

        <TextInput
          placeholder="Usuario"
          style={estilo.acesso}
          onChangeText={(value) => setUsuario(value)}
          value={usuario}
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

        <View style={estilo.logar}>
          <Button title="" />
          <Text
            style={estilo.txtlogar}
            onPress={() => {
              us = usuario;
              sh = senha;
              logar();
            }}
          >
            Login
          </Text>
        </View>
        <View style={estilo.cadastrar}>
          <Button title="" />
          <Text
            style={estilo.txtlogar}
            onPress={() => navigation.navigate("Usuario")}
          >
            Cadastrar{" "}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Usuario" component={Usuario} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const estilo = StyleSheet.create({
  area: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  acesso: {
    marginTop: 20,
    backgroundColor: "white",
    color: "#f50057",
    padding: 18,
    width: "85%",
    margin: 5,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    shadowOpacity: 1,
    borderRadius: 3,
    borderBottomColor: "silver",
  },
  txt: {
    color: "#fafafa",
    marginLeft: "auto",
    marginRight: "auto",
  },
  logar: {
    borderRadius: 5,
    textAlign: "center",
    marginTop: 60,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  txtlogar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginTop: -20,
    marginBottom: 13,
  },
  cadastrar: {
    borderRadius: 4,
    textAlign: "center",
    marginTop: 30,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  logo: {
    width: 130,
    height: 150,
    marginTop: 20,
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
  // const [perfil, setPerfil] = React.useState([]);

  fetch("http://192.168.0.2:8080/projeto/service/usuario/login.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeusuario: us,
      senha: sh,
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      // setPerfil(resposta.saida);
      gravarPerfil(resposta.saida[0]);
      //console.log(resposta);
      Alert.alert("Olhe na tela de console");
    })
    .catch((error) => console.error(error));
}
function gravarPerfil(dados) {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists perfil(id integer primary key, idusuario int, nomeusuario text, foto text, idcliente text, nomecliente text, cpf text, sexo text, email text, telefone text, tipo text, logradouro text, numero text, complemento text, bairro text, cep text, logado int);"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "insert into perfil (idusuario , nomeusuario , foto , idcliente , nomecliente , cpf , sexo, email, telefone , tipo , logradouro, numero, complemento, bairro, cep, logado)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        dados.idusuario,
        dados.nomeusuario,
        dados.foto,
        dados.idcliente,
        dados.nomecliente,
        dados.cpf,
        dados.sexo,
        dados.email,
        dados.telefone,
        dados.tipo,
        dados.logradouro,
        dados.numero,
        dados.complemento,
        dados.bairro,
        dados.cep,
        1,
      ]
    );
    tx.executeSql("select *from perfil", [], (_, { rows }) => {
      console.log(rows);
    });
  });
}
