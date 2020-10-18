import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import {
  Picker,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  unstable_enableLogBox,
  Alert,
} from "react-native";
import Cadastrar from "../screens/Cadastrar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



const Stack = createStackNavigator();
let ft = "";
let nome = "";
let cpf = "";
let sx = "";
let us = "";
let sh = "";
let fsh = "";
let email = "";
let tel = "";
let cep = "";
let lograd = "";
let numer = "";
let compl = "";
let bair = "";
let tip = "";

export default function Endereco({ route }) {
  // const { usuario } = route.params;
  // const { senha } = route.params;
  // const { foto } = route.params;
  // const { nomecli } = route.params;
  // const { cpfcli } = route.params;
  // const { emailcli } = route.params;
  // const { telefone } = route.params;
  // const { sexo } = route.params;
  // React.useEffect(() => {
  //   us = usuario;
  //   sh = senha;
  //   ft = foto;
  //   nome = nomecli;
  //   cpf = cpfcli;
  //   email = emailcli;
  //   tel = telefone;
  //   sx = sexo;
  // }, []);

  const [cepend, setCepend] = React.useState("");
  const [tipoend, setTipoend] = React.useState("");
  const [logradouroend, setLogradouroend] = React.useState("");
  const [numeend, setNumeend] = React.useState("");
  const [complementoend, setComplementoend] = React.useState("");
  const [bairroend, setBairroend] = React.useState("");

  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../img/camuflada.png")}
        style={estilo.fundo}
      >
        <ScrollView>
          <Text style={estilo.dados}> Endereço</Text>
          <Text style={estilo.txt}> "Preencha todos os campos"</Text>

          <TextInput
            placeholder="CEP"
            keyboardType="numeric"
            style={estilo.endcaixa}
            onChangeText={(value) => setCepend(value)}
            value={cepend}
          />
          <TextInput
            placeholder="Logradouro"
            style={estilo.endcaixa}
            onChangeText={(value) => setLogradouroend(value)}
            value={logradouroend}
          />
          <TextInput
            placeholder="Número"
            style={estilo.endcaixa}
            onChangeText={(value) => setNumeend(value)}
            value={numeend}
          />
          <TextInput
            placeholder="Complemento"
            style={estilo.endcaixa}
            onChangeText={(value) => setComplementoend(value)}
            value={complementoend}
          />
          <TextInput
            placeholder="Bairro"
            style={estilo.endcaixa}
            onChangeText={(value) => setBairroend(value)}
            value={bairroend}
          />
          <Picker
            selectedValue={tipoend}
            mode="dialog"
            onValueChange={setTipoend}
            style={estilo.rolo}
          >
            <Picker.Item label="Tipo" value="Tipo" />
            <Picker.Item label="Av" value="Av" />
            <Picker.Item label="Rua" value="Rua" />
            <Picker.Item label="Al" value="Al" />
            <Picker.Item label="Praça" value="Praça" />
          </Picker>

          <View style={estilo.botao}>
            <Button title="" />
            <Text
              style={estilo.txtlogar}
              onPress={() => {
                us = usuario;
                cpf = cpfcli;
                sh = senha;
                //fsh = fsenha;
                ft = foto;
                sx = sexo;
                email = emailcli;
                nome = nomecli;
                tip = tipoend;
                tel = telefone;
                lograd = logradouroend;
                numer = numeend;
                compl = complementoend;
                bair = bairroend;
                cep = cepend;
                efetuarCadastro();
              }}
              //onPress={() => navigation.navigate("")}
            >
              SALVAR{" "}
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Cadastrar" component={Cadastrar} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const estilo = StyleSheet.create({
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
  areaend: {
    fontSize: 18,
    padding: 14,
    marginLeft: "auto",
    marginRight: "auto",
  },
  endcaixa: {
    backgroundColor: "white",
    color: "#f50057",
    padding: 18,
    width: "85%",
    margin: 6,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    shadowOpacity: 1,
    borderRadius: 5,
    borderBottomColor: "silver",
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
    borderRadius: 4,
    textAlign: "center",
    marginTop: -60,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  rolo: {
    marginTop: -30,
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%",
  },
});

// function efetuarCadastro() {
//   Alert.alert(
//     "CEP: " +
//       cep +
//       "\nlograd: " +
//       lograd +
//       "\nNumero: " +
//       numer +
//       "\nCompl: " +
//       compl +
//       "\nBairro: " +
//       bair +
//       "\nTipo:" +
//       tip +
//       "Nome: " +
//       nome +
//       "\nCPF: " +
//       cpf +
//       "\nEmail: " +
//       email +
//       "\nTel: " +
//       tel +
//       "\nSexo: " +
//       sx +
//       "Usuario: " +
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
  fetch("http://192.168.0.2:8080/projeto/service/endereco/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomecliente: nome,
      cpf: cpf,
      sexo: sx,
      email: email,
      telefone: tel,
      tipo: tip,
      logradouro: lograd,
      numero: numer,
      complemento: cep,
      bairro: bair,
      cep: cep,
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
