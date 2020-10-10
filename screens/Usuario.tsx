import * as React from "react";
import { Text, View } from "../components/Themed";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native-gesture-handler";
import {
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageBackground,
  unstable_enableLogBox,
  Alert,
} from "react-native";
import NumberFormat from "react-number-format";
import Endereco from "../screens/Endereco";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Cadastrar from "./Cadastrar";
import PedidoRealizados from "./PedidosRealizados";

const Stack = createStackNavigator();
let us = "";
let fsh = "";
let sh = "";
let ft = "";
let email = "";

export default function Usuario() {
  return (
    <Stack.Navigator initialRouteName="Usuarios">
      <Stack.Screen name="Usuarios" component={Usuarios} />
      <Stack.Screen name="cadastrar" component={Cadastrar} />
    </Stack.Navigator>
  );
}

function Usuarios({ navigation }) {
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [fsenha, setFsenha] = React.useState("");
  const [foto, setFoto] = React.useState("");
  const [usemail, setUsemail] = React.useState("");

  React.useEffect(() => {
    fetch("http://192.168.0.2:8080/projeto/service/usuario/listar.php")
      .then((response) => response.json())
      .then((usuario) => setDados(usuario.saida))
      .catch((error) => console.error(error))
      .finally(() => setCarregado(false));
  }, []);
  {
    //============================================
    carregado ? (
      <ActivityIndicator style={estilo.fundo} />
    ) : (
      <FlatList
        data={dados}
        renderItem={() => (
          <View>
            {/* <Text style={estilo.txtlogar}>{idusuario}</Text> */}
            <Text style={estilo.txtlogar}>{usuario}</Text>
            <Text style={estilo.txtlogar}>{senha}</Text>
            <Text style={estilo.txtlogar}>{foto}</Text>
          </View>
        )}
        keyExtractor={({ idusuario }, index) => idusuario}
      />
    );
  }
  //==================================================
  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../img/camuflada.png")}
        style={estilo.fundo}
      >
        <ScrollView>
          <Text style={estilo.txt}> "Preencha todos os campos"</Text>
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
            onChangeText={(value) => setUsemail(value)}
            value={usemail}
          />

          {/* <View style={estilo.botao}>
            <Button title="" />
            <Text
              style={estilo.txtlogar}
              onPress={() => {
                us = usuario;
                sh = senha;
                fsh = fsenha;
                ft = foto;
                email = usemail;

                efetuarCadastro();
              }}
              //onPress={() => navigation.navigate("Endereco")}
            >
              Cadastrar{" "}
            </Text>
          </View> */}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cadastrar", {
                // idusuario: `${idusuario}`,
                usr: { usuario },
                sha: { senha },
                fto: { foto },
              });
            }}
          >
            <Text style={estilo.botao}> Salvar </Text>
          </TouchableOpacity>
        </ScrollView>
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
  link: {
    padding: 10,
  },
  fundo: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
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
  areausu: {
    fontSize: 18,
    padding: 14,
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
    marginTop: 40,
    fontSize: 18,
    padding: 11,
    textAlign: "center",
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
  },
});
// function efetuarCadastro() {
//   Alert.alert(
//     "Usuario: " +
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
  fetch("http://192.168.0.2:8080/projeto/service/usuario/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
