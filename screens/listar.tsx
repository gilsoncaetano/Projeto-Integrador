import * as React from "react";
import { View, Text } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NumberFormat from "react-number-format";
import * as SQLite from "expo-sqlite";
import { createStackNavigator } from "@react-navigation/stack";
import Carrinho from "./Carrinho";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createStackNavigator();

export default function ListaPerfil({ route,navigation }) {
  
  const { idcliente } = route.params;
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `http://192.168.0.2:8080/projetoisaclube/service/usuario/listarlog.php?idcliente=${idcliente}`
    )
      .then((response) => response.json())
      .then((produto) => setDados(produto.saida))
      .catch((error) =>
        console.error(`Erro ao tentar o carregar o cliente ${error}`)
      )
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View style={tela.conteiner}>
      {carregado ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dados}
          renderItem={({ item }) => (
            <View style={tela.conteiner}>
              <Image
               source={{ uri: `http://192.168.0.2:8080/projetoisaclube/img/${foto}` }}
               style={tela.img}
             />            
         
              {/* <Text style={tela.nome}>{item.nomeproduto}</Text>
              <Text style={tela.txt}>{item.descricao}</Text> */}

              <Text style={tela.txt1}>Idcliente: {item.idcliente}</Text>
              <Text style={tela.txt1}>Nome: {item.nomecliente}</Text>
              <Text style={tela.txt1}>CPF: {item.cpf}</Text>
              <Text style={tela.txt1}>Sexo: {item.sexo}</Text>
              <Text style={tela.txt1}>E-Mail: {item.email}</Text>
              <Text style={tela.txt1}>Senha: {item.senha}</Text>
              <Text style={tela.txt1}>Telefone: {item.telefone}</Text>
              <Text style={tela.txt1}>Idendereco: {item.idendereco}</Text>
              <Text style={tela.txt1}>Tipo: {item.tipo}</Text>
              <Text style={tela.txt1}>Logradouro: {item.logradouro}</Text>
              <Text style={tela.txt1}>Número: {item.numero}</Text>
              <Text style={tela.txt1}>Complemento: {item.complemento}</Text>
              <Text style={tela.txt1}>Bairro: {item.bairro}</Text>
              <Text style={tela.txt1}>CEP: {item.cep}</Text>

              <View style={tela.inputView}>
              <TouchableOpacity
                onPress={() => { 
                  //navigation.navigate("Carrinho")
                  listarCliente( 
                    `${idcliente}`,
                    `${item.foto}`,
                    `${item.nomecliente}`,
                    `${item.cpf}`,
                    `${item.sexo}`,
                    `${item.email}`,
                    `${item.senha}`,
                    `${item.telefone}`,
                    `${item.idendereco}`,
                    `${item.tipo}`,
                    `${item.logradouro}`,
                    `${item.numero}`,
                    `${item.complemento}`,
                    `${item.bairro}`,
                    `${item.cep}`
                    
                  );
                }}>
                <Text style={tela.inputdeth}>Adiciona ao Carrinho</Text>
              </TouchableOpacity>
              </View>

              <View style={tela.inputView}>
              <TouchableOpacity onPress={()=>{
               navigation.navigate("Carrinho")
               }}>
          
          <Text style={tela.inputdeth}>Ir para o Carrinho</Text>
        </TouchableOpacity>
        </View>
            </View>
          )}
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}
    </View>
  );
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Carrinho" component={Carrinho} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const tela = StyleSheet.create({
    img: {
        borderRadius: 30,
        width: 220,
        height: 250,
        marginLeft: "auto",
        marginRight: "auto",
        flex: 1,
      },
      txt1:{
        marginTop:10,
        padding:10,
        paddingBottom:8,
        fontSize:23,
        backgroundColor: "#E4EBEE",
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
  inputdeth: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
    inputView: {
    padding: 10,
    height: 40,
    borderRadius: 6,
    marginTop: 30,
    backgroundColor: "#ffea00",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  conteiner: {
    flex: 1,
    width: "100%",
    marginBottom: 3,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#8bc34a",
  },
//   txt1:{
//     marginTop:10,
//     padding:10,
//     paddingBottom:8,
//     fontSize:23,
//     backgroundColor: "#E4EBEE",
//   },
//   nome: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 11,
//     fontSize: 19,
//     marginBottom: 2,
//   },
//   txt: {
//     color: "white",
//     textAlign: "center",
//     padding: 11,
//     fontSize: 19,
//   },
//   preco: {
//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 17,
//     marginBottom: -3,
//   },

});
//Fazer a constante do banco de dados. Vamos chamar de db

const db = SQLite.openDatabase("appisadb.banco");

function listarCliente(idcliente, foto, nomecliente, cpf, sexo, ,email, senha, telefone, idendereco, tipo, logradouro, numero, complemento, bairro, cep) {
  alert("Produto Foi Encaminhado Para O Carrinho");

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists listar(id integer primary key,idcliente int, foto text, nomecliente text, cpf text, sexo text, email text, senha text, telefone text,idendereco text, tipo text, logradouro text, numero text, complemento text, bairro text, cep text);"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "insert into listar(idcliente, foto, nomecliente, cpf, sexo, email, senha, telefone,idendereco, tipo, logradouro, numero, complemento, bairro, cep, logado)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [idcliente, foto, nomecliente, cpf, sexo, ,email, senha, telefone, idendereco, tipo, logradouro, numero, complemento, bairro, cep]
    );
    tx.executeSql("select * from listar", [], (_, { rows }) => {
      console.log(JSON.stringify(rows));
    });
    //tx.executeSql("drop table perfil");
  });
}
