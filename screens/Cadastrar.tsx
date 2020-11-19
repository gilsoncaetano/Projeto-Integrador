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
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
  unstable_enableLogBox,
  Alert,
} from "react-native";
import Login from "../screens/Login";
import PrimeiroCadEnd from "../screens/PrimeiroCadEnd";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("appisadb.banco");

const Stack = createStackNavigator();
let nomecl = "";
let cpf = "";
let tel = "";
let sx = "";
let email = "";
let ft = "";
let sh = "";
let fsh = ""

export default function Cadastrar() {
  return (
    <Stack.Navigator initialRouteName="Cadastra">
      <Stack.Screen name="Cadastra" component={Cadastra} />
      <Stack.Screen name="PrimeiroCadEnd" component={PrimeiroCadEnd} />
    </Stack.Navigator>
  );
}

function Cadastra({navigation }) {

  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);
  const [nomecli, setNomecli] = React.useState("");
  const [cpfcli, setCPFcli] = React.useState("");
  const [sexo, setSexo] = React.useState("");
  const [emailcli, setEmailcli] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [foto, setFoto] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [fsenha, setFsenha] = React.useState("");
 
   React.useEffect(() => {
    fetch("http://192.168.0.2:8080/projetoisaclube/service/cliente/cadastrar.php")
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
            keyboardType="phone-pad"
            style={estilo.cadastro}
            onChangeText={(value) => setCPFcli(value)}
            value={cpfcli}
          />
          <TextInput
            placeholder="E-Mail"
            keyboardType="email-address"
            style={estilo.cadastro}
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
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
          <TextInput
            placeholder="Foto De Perfil"
            style={estilo.cadastro}
            onChangeText={(value) => setFoto(value)}
            value={foto}
          />

          <TextInput
            secureTextEntry
            placeholder="Senha"
            style={estilo.cadastro}
            onChangeText={(value) => setSenha(value)}
            value={senha}
          />
          <TextInput
          style={estilo.cadastro}
            secureTextEntry
            placeholder="Confirme"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={(value) => setFsenha(value)}
            value={fsenha}
          />
          <Picker
            selectedValue={sexo}
            mode="dialog"
            onValueChange={setSexo}
            style={estilo.input}
          >
            <Picker.Item label="Sexo" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
          </Picker>

          <View style={estilo.cadastrar}>
          <TouchableOpacity
            onPress={() => {
              
              navigation.navigate("PrimeiroCadEnd", {
                nomecli: `${nomecli}`,
                cpfcli: `${cpfcli}`,
                sexo: `${sexo}`,
                emailcli: `${emailcli}`,
                telefone:`${telefone}`,
                foto: `${foto}`,
                senha:`${senha}`, 
                  
            }
            
          );
         
            }}
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
    padding: 13,
    width: "85%",
    margin: 8,
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
  input: {
    marginTop:8,
    backgroundColor: "white",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  cadastrar: {
    height: 40,
    marginTop:50,
    marginBottom:25,
    borderRadius: 4,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  }
});


// function efetuarCadastro() {
//   fetch("http://192.168.0.2:8080/projetoisaclube/service/cliente/cadastrar.php", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
     
//       nomecliente: nomecl,
//       cpf: cpf,
//       sexo: sx,
//       email: email,
//       telefone: tel,
//       senha: sh,
//       foto: ft,
//     }),
//   })
//     .then((response) => response.json())
//     .then((resposta) => {
//      // gravarCadastro(resposta.saida[0]);
//       console.log(resposta);
//       Alert.alert("Cadastro com sucesso");
//     })
//     .catch((error) => console.error(error));
//     //gravarCadastro(0);
// }
// gravarCadastro();
// function gravarCadastro(dados) {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "create table if not exists cadastro(id integer primary key, idcliente int, nomecliente text, foto text, cpf text, sexo text, email text, telefone text, logado int);"
//     );
//   })
//   db.transaction((tx) => {
//     tx.executeSql(
//       "insert into cadastro (idcliente, nomecliente, foto, cpf, sexo, email, telefone, logado)values(?,?,?,?,?,?,?,?)",
//       [
//         dados.idcliente,
//         dados.nomecliente,
//         dados.foto,                    
//         dados.cpf,        
//         dados.sexo,         
//         dados.email,         
//         dados.telefone,
//         1,
//       ]
//     );
//     tx.executeSql("select * from cadastro", [], (_, { rows }) => {
//       console.log(rows);
//     });
//   });
// }
