import * as React from "react";
import { Text, View } from "../components/Themed";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native-gesture-handler";
import {
  SectionList,
  Picker,
  Button,
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
  unstable_enableLogBox,
  Alert,
} from "react-native";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Endereco from "./Endereco";

const Stack = createStackNavigator();
let nomecl = "";
let cpf = "";
let email = "";
let tel = "";
let sx = "";
let us = "";
let sh = "";
let ft = "";
let fsh = "";
let cep = "";
let lograd = "";
let numer = "";
let compl = "";
let bair = "";
let tip = "";

export default function Cadastrar() {
  return (
    <Stack.Navigator initialRouteName="Cadastra">
      <Stack.Screen name="Cadastra" component={Cadastra} />
      <Stack.Screen name="Endereco" component={Endereco} />
    </Stack.Navigator>
  );
}

function Cadastra({ route, navigation }) {
  // const { usr } = route.params;
  // const { sha } = route.params;
  // const { fto } = route.params;
  // React.useEffect(() => {
  //   us = usr;
  //   sh = sha;
  //   ft = fto;
  // }, []);

  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  const [sexo, setSexo] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [nomecli, setNomecli] = React.useState("");
  const [cpfcli, setCPFcli] = React.useState("");
  const [emailcli, setEmailcli] = React.useState("");
  // const [usuario, setUsuario] = React.useState("");
  // const [senha, setSenha] = React.useState("");
  // const [foto, setFoto] = React.useState("");
  // const [fsenha, setFsenha] = React.useState("");

  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [fsenha, setFsenha] = React.useState("");
  const [foto, setFoto] = React.useState("");
  const [usemail, setUsemail] = React.useState("");

  const [cepend, setCepend] = React.useState("");
  const [tipoend, setTipoend] = React.useState("");
  const [logradouroend, setLogradouroend] = React.useState("");
  const [numeend, setNumeend] = React.useState("");
  const [complementoend, setComplementoend] = React.useState("");
  const [bairroend, setBairroend] = React.useState("");

  React.useEffect(() => {
    fetch("http://192.168.0.2:8080/projeto/service/cadastro/cadastro.php")
      .then((response) => response.json())
      .then((login) => setDados(login.saida))
      .catch((error) => console.error(error))
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../img/camuflada.png")}
        style={estilo.fundo}
      >
        <ScrollView>
          <Text style={estilo.dados}> Dados Pessoais</Text>
          <Text style={estilo.txt}> "Preencha todos os campos"</Text>
          <TextInput
            placeholder="Nome Completo"
            style={estilo.cadastro}
            onChangeText={(value) => setNomecli(value)}
            value={nomecli}
          />
          <TextInput
            placeholder="CPF"
            style={estilo.cadastro}
            onChangeText={(value) => setCPFcli(value)}
            value={cpfcli}
          />
          <TextInput
            placeholder="E-Mail"
            keyboardType="email-address"
            style={estilo.cadastro}
            onChangeText={(value) => setEmailcli(value)}
            value={emailcli}
          />
          <TextInput
            placeholder="Telefone"
            keyboardType="phone-pad"
            style={estilo.cadastro}
            onChangeText={(value) => setTelefone(value)}
            value={telefone}
          />
          <Picker
            selectedValue={sexo}
            mode="dialog"
            onValueChange={setSexo}
            style={estilo.sexo}
          >
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
          </Picker>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Endereco", {
                usuario: { us },
                senha: { sh },
                foto: { ft },
                nomecli: { nomecli },
                cpfcli: { cpfcli },
                emailcli: { emailcli },
                telefone: { telefone },
                sexo: { sexo },
              });
            }}
          >
            <Text style={estilo.botao}> Cadastrar </Text>
          </TouchableOpacity>

          {/* <View style={estilo.botao}>
            <Button title="" />
            <Text
              style={estilo.txtlogar}
              onPress={() => {
                us = usuario;
                cpf = cpfcli;
                sh = senha;
                fsh = fsenha;
                ft = foto;
                sx = sexo;
                tel = telefone;
                email = emailcli;
                nomecl = nomecli;
                lograd = logradouroend;
                numer = numeend;
                compl = complementoend;
                bair = bairroend;
                cep = cepend;

                efetuarCadastro();
              }}
              //onPress={() => navigation.navigate("Cadastrar")}
            >
              SALVAR{" "}
            </Text>
          </View> */}

          {/* <View style={estilo.botao}>
            <Button title="" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("", {
                  nomecli: { nomecli },
                  cpfcli: { cpf },
                  emailcli: { emailcli },
                  telefon: { telefone },
                  sexo: { sexo },
                  usuario: { usuario },
                  senha: { senha },
                  foto: { foto },
                });
              }}
            >
              <Text style={estilo.botao}> Proximo </Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const estilo = StyleSheet.create({
  fundo: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
  },
  area: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",
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
  cadastro: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 18,
    width: "85%",
    margin: 8,
    marginLeft: "auto",
    marginRight: "auto",
    //shadowColor: "gray",
    shadowOpacity: 1,
  },

  usuario: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 14,
    width: "85%",
    margin: 14,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    shadowOpacity: 1,
  },
  txtlogar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginTop: -20,
    marginBottom: 13,
  },
  botao: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 11,
    textAlign: "center",
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
  },
  sexo: {
    color: "white",
    marginBottom: -50,
    marginTop: -50,
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%",
  },
});

// function efetuarCadastro() {
//   Alert.alert(
//     "Nome: " +
//       nomecl +
//       "\nCPF: " +
//       cpf +
//       "\nEmail: " +
//       email +
//       "\nTel: " +
//       tel +
//       "\nSexo: " +
//       sx +
//       "\nUsuario: " +
//       us +
//       "\nSenha: " +
//       sh +
//       "\nFsh: " +
//       fsh +
//       "\nFoto: " +
//       ft +
//       "\nEmail: " +
//       email
//   );

function efetuarCadastro() {
  fetch("http://192.168.0.2:8080/projeto/service/cadastro/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // nomeusuario: us,
      // senha: sh,
      // foto: ft,

      nomecliente: nomecl,
      cpf: cpf,
      sexo: sx,
      email: email,
      telefone: tel,
      nomeusuario: us,
      senha: sh,
      foto: ft,
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      Alert.alert("Olhe na tela de console");
    })
    .catch((error) => console.error(error));
}
