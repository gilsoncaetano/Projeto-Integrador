import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, ScrollView,TouchableOpacity } from "react-native-gesture-handler";
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
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("appisadb.banco");
//const dbc = SQLite.openDatabase("appisadb.banco");
const Stack = createStackNavigator();
let tip = "";
let lograd = "";
let numer = "";
let compl = "";
let bair = "";
let cep = "";
let idcli = 0;

export default function Endereco({ navigation }) {
  //const { idendereco } = route.params;

  const [perfilend, setPerfilend] = React.useState([]);
  const [idcliente, setIdCliente] = React.useState(0);
  const [cepend, setCepend] = React.useState("");
  const [tipoend, setTipoend] = React.useState("");
  const [logradouroend, setLogradouroend] = React.useState("");
  const [numeend, setNumeend] = React.useState("");
  const [complementoend, setComplementoend] = React.useState("");
  const [bairroend, setBairroend] = React.useState("");

  // React.useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
  //       setPerfilend(_array);
  //     });
  //   });
  // }, []);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select idcliente from perfil", [], (_, { rows: { _array } }) => {
        setIdCliente(_array[0].idcliente.toString());
        console.log(_array); 
      });
    });
  }, []);

  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../img/camuflada.png")}
        style={estilo.fundo}
      >
        <ScrollView>
        
          
         
          <Text style={estilo.dados}> Endereço</Text>
          <Text style={estilo.txt}> "Preencha todos os campos"</Text>
          <View style={estilo.idcaixa}>
          {perfilend.map(
          ({
           idcliente,  
        }) => (
         
          <TextInput >CÓDIGO</TextInput>
            )   
            )}
            <Text style={estilo.idcaixa}>CÓDIGO : {idcliente} </Text>
          
           </View>

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
            style={estilo.input}
          >
            <Picker.Item label="Tipo" value="Tipo" />
            <Picker.Item label="Av" value="Av" />
            <Picker.Item label="Rua" value="Rua" />
            <Picker.Item label="Al" value="Al" />
            <Picker.Item label="Praça" value="Praça" />
          </Picker>
        

          <View style={estilo.cadastrar}>
          <TouchableOpacity
              onPress={() => {
                // if (tip == "" || lograd == "" || numer == "" || compl == "" || bair == "" || cep == ""){
                //   Alert.alert("Alerta", "preencha todos os campos");
                //   navigation.navigate("Endereco");
                // } else {
                tip = tipoend;
                lograd = logradouroend;
                numer = numeend;
                compl = complementoend;
                bair = bairroend;
                cep = cepend;
                idcli = idcliente;
                
                efetuarCadastro();
                
                //}
                
                navigation.navigate("Login");
                //gravarPerfilend({dados});
                
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
  //     <Stack.Screen name="Cadastrar" component={Cadastrar} />
  //   </Stack.Navigator>
  // </NavigationContainer>;
}

const estilo = StyleSheet.create({
//ide cliente
idcaixa: {
  borderRadius: 10,
  backgroundColor: "#ffea00",
  marginLeft:30,
  marginRight:30,
  marginBottom:6,
  alignItems:'center',
  padding: 4,
  marginTop:2,
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
  endcaixa: {
    backgroundColor: "white",
    padding: 13,
    width: "85%",
    margin: 6,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    borderRadius: 6,
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
    marginTop: 90,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    marginTop:8,
    backgroundColor: "white",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

function efetuarCadastro() {
  fetch("http://192.168.0.2:8080/projetoisaclube/service/endereco/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tipo: tip,
      logradouro: lograd,
      numero: numer,
      complemento: cep,
      bairro: bair,
      cep: cep,
      idcliente: idcli,
      
    }),
  })
  //   .then((response) => response.json())
  //   .then((resposta) => {
  //     //gravarPerfilend(resposta.saida[0]);
  //     console.log(resposta);
  //     alert("Cadastro realizado com sucesso");
  //    // Alert.alert("Cadastro realizado com sucesso");
  //   })
  //   .catch((error) => console.error(error));
  //   //sairPerfil();
  // }

  .then((response) => response.json())
  .then((resposta) => {
    console.log(resposta);
    alert("Seu pagamento foi efetuado");
  })
  .catch((error) => console.error(error));
  sairDoApp();
}
function sairDoApp(){
 db.transaction((tx)=>{
  tx.executeSql("drop table perfil");
});
alert("Deslogado do Perfil")
}






//   function sairPerfil(){
//     tx.executeSql("select * from itens", [], (_, { rows }) => {
//      db.transaction((tx)=>{ 
//       console.log(JSON.stringify(rows));
//       tx.executeSql("drop table perfil");
//     });
    
//   }
// }
// function gravarPerfilend(dados) {
//   alert("Endereço Listado");

//   db.transaction((tx) => {
//     tx.executeSql(
//       "create table if not exists endereco (id integer primary key, idendereco int, tipo text, logradouro text, numero text, complemento text, bairro text, cep text, logado int);"
//     );
//   });

//   db.transaction((tx) => {
//     tx.executeSql(
//       "insert into endereco (idendereco, tipo, logradouro, numero, complemento, bairro, cep,logado)values(?,?,?,?,?,?,?,?)",
//       [ dados.idendereco,            
//         dados.tipo,         
//         dados.logradouro,              
//         dados.numero,           
//         dados.complemento,               
//         dados.bairro,          
//         dados.cep,
        
//       ]
//     );
//     tx.executeSql("select * from endereco", [], (_, { rows }) => {
//       console.log(JSON.stringify(rows));
//     });
//     //tx.executeSql("drop table perfil");
//   });
// }

// const dbc = SQLite.openDatabase("appisadb.banco");


// function gravarPerfilend(idendereco, tipo, logradouro, numero, complemento, bairro, cep) {
//   alert("Produto Foi Encaminhado Para O Carrinho");

//   dbc.transaction((tx) => {
//     tx.executeSql(
//       "create table if not exists endereco(idp integer primary key,idendereco int,tipo text,logradouro text, numero text, complemento text, bairro text, cep text);"
//     );
//   });

//   dbc.transaction((tx) => {
//     tx.executeSql(
//       "insert into itens(idendereco,tipo,logradouro,numero,complemento,bairro,cep)values(?,?,?,?,?,?,?)",
//       [idendereco, tipo, logradouro, numero, complemento, bairro, cep]
//     );
//     tx.executeSql("select * from endereco", [], (_, { rows }) => {
//       console.log(JSON.stringify(rows));
//     });
//     tx.executeSql("drop table perfil");
//   });
// }