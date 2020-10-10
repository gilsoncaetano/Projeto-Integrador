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
import Endereco from "../screens/Endereco";
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

export default function Usuario({ navigation }) {
  const [foto, setFoto] = React.useState("");
  const [nomecli, setNomecli] = React.useState("");
  const [cpfcli, setCPFcli] = React.useState("");
  const [sexo, setSexo] = React.useState("");
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [fsenha, setFsenha] = React.useState("");
  const [emailcli, setEmailcli] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
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
        {/* =======================Inicio de dados pessoas=========================== */}
        <ScrollView>
          <Text style={estilo.dados}> Dados Pessoas</Text>
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
          <View style={estilo.botao}>
            <Button title="" />
            {/* <Text
              style={estilo.txtlogar}
              onPress={() => {
                efetuarCadastro();
              }}
              //onPress={() => navigation.navigate("Endereco")}
            >
              Cadastrar{" "}
            </Text> */}
          </View>

          {/*========================= inicio de contato============================= */}

          <TextInput
            placeholder="Foto"
            style={estilo.logo}
            onChangeText={(value) => setFoto(value)}
            value={foto}
          />
          <TextInput
            placeholder="Usuário"
            style={estilo.acessousu}
            onChangeText={(value) => setUsuario(value)}
            value={usuario}
          />
          <TextInput
            secureTextEntry
            placeholder="Senha"
            style={estilo.acessousu}
            onChangeText={(value) => setSenha(value)}
            value={senha}
          />
          <TextInput
            secureTextEntry
            placeholder="Confirme"
            style={estilo.acessousu}
            onChangeText={(value) => setFsenha(value)}
            value={fsenha}
          />
          <TextInput
            placeholder="E-Mail"
            keyboardType="email-address"
            style={estilo.acessousu}
            onChangeText={(value) => setEmailcli(value)}
            value={emailcli}
          />
          <View style={estilo.bot}>
            <Button title="" />
            {/* <Text
              style={estilo.txtlogar}
              onPress={() => {
                efetuarCadastro();
              }}
              //onPress={() => navigation.navigate("Endereco")}
            >
              Cadastrar{" "}
            </Text> */}
          </View>

          {/* =======================Inicio de Endereço================================ */}
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
                fsh = fsenha;
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
              //onPress={() => navigation.navigate("Endereco")}
            >
              Cadastrar{" "}
            </Text>
          </View>
        </ScrollView>
        {/* =====================================Fim de Endereço=========================== */}
      </ImageBackground>
    </View>
  );

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Endereco" component={Endereco} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const estilo = StyleSheet.create({
  fundo: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
  },
  sexo: {
    marginTop: -40,
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%",
  },
  logo: {
    padding: 13,
    width: "45%",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
  },
  bot: {
    borderRadius: 4,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 30,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  dados: {
    marginTop: 60,
    fontSize: 25,
    margin: 14,
    marginLeft: "auto",
    marginRight: "auto",
  },
  acessousu: {
    backgroundColor: "white",
    color: "#f50057",
    padding: 18,
    width: "85%",
    margin: 6,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    //shadowOpacity: 1,
    borderRadius: 5,
    borderBottomColor: "silver",
  },
  cadastro: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 18,
    width: "85%",
    margin: 8,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    shadowOpacity: 1,
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
    marginTop: -40,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  rolo: {
    marginTop: -40,
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%",
  },
});

function efetuarCadastro() {
  fetch("http://192.168.0.2:8080/projeto/service/cadastro/cadastro.php", {
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
