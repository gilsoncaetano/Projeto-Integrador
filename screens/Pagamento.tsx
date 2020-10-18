import * as React from "react";
import { Text, View } from "../components/Themed";
import {Picker,StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity,ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from 'expo-sqlite';
import ConfirmacaoPag from "../screens/ConfirmacaoPag";

const db = SQLite.openDatabase('appisadb.banco');
const Stack = createStackNavigator();
let idc= 0;
let tp = "";
let ds = "";
let vl = "";
let qp = 0;
let vp = "";
let total = "";


export default function Pagamento( { navigation }) {

  const [tipo, setTipo] = React.useState("");
  const [parcela, setParcela] = React.useState(1);
  const [idcliente, setIdCliente] = React.useState(0);
  const [produto, setProduto] = React.useState([]);

  // constante de passagem de dados
  const [descricao, setDescricao] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [vParcelas, setVParcelas] = React.useState("");
  

  React.useEffect(()=>{
    db.transaction((tx)=>{
      tx.executeSql("select idcliente from perfil",[],(_,{rows:{_array}})=>{
        setIdCliente(_array[0].idcliente.toString());
        console.log(_array); 
        //console.log(JSON.stringify(_array));
      });

      tx.executeSql("select * from itens", [], (_,{rows:{_array}})=>{
        setProduto(_array); 
        console.log(_array)
        
      });

       // //Vamos fazer uma nova consulta para calcular o valor total dos produtos no carrinho
       tx.executeSql("select sum(preco) as total from itens",[],(_,{rows:{_array}})=>{
        setValor(_array[0].total.toString());
        console.log(_array[0].total.toString());
        
      });
     
    });
  },[]);
  return (
    <View>
      <ScrollView>
      <Text>Pagamento de Produto</Text>
      <Picker selectedValue={tipo} mode="dropdown" onValueChange={setTipo}>
        <Picker.Item label="Boleto" value="Boleto"/>
        <Picker.Item label="Crédito" value="Crédito"/>
        <Picker.Item label="Débito" value="Débito"/>
      </Picker>

      <TextInput placeholder="Descrição do pagamento" value={descricao} onChangeText={(value)=>setDescricao(value)}/>
      <Text>Valor da Compra:</Text>
      <TextInput keyboardType="decimal-pad" placeholder="R$0.00" value={valor} onChangeText={(value)=>setValor(value)}/>

      <Text>Selecione as parcelas</Text>
      <Picker selectedValue={parcela}mode="dropdown"onValueChange={(parcela) => {
          setParcela(parcela);
          setVParcelas((parseFloat(valor) / parcela).toString());
        }}
      >

        <Picker.Item label="À vista de R$" value="1"/>
        <Picker.Item label="2x sem juros" value="2"/>
        <Picker.Item label="3x sem juros" value="3"/>
        <Picker.Item label="4x sem juros" value="4"/>
        <Picker.Item label="5x sem juros" value="5"/>
        <Picker.Item label="6x sem juros" value="6"/>
        <Picker.Item label="7x sem juros" value="7"/>
        <Picker.Item label="8x sem juros" value="8"/>
        <Picker.Item label="9x sem juros" value="9"/>
        <Picker.Item label="10x sem juros" value="10"/>
      </Picker>
      <Text>Valor das Parcelas</Text>
      <TextInput keyboardType="decimal-pad" placeholder="R$0.00" value={vParcelas} onChangeText={(value) => setVParcelas(value)}/>

      <TouchableOpacity onPress={()=>{
        navigation.navigate("ConfirmacaoPag")
        // passagens de dados do formulários para os variáveis e depois cadastro do pagamento
        idc = idcliente;
        tp = tipo;
      ds = descricao;
      vl = valor;
      qp = parcela;
      vp = vParcelas;
        efetuarPagamento();
      
       // navigation.navigate("ConfirmacaoPagamento");
      }}>
        <Text style={tela.pagar}>Pagar</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="ConfirmacaoPag" component={ConfirmacaoPag} />
    </Stack.Navigator>
  </NavigationContainer>;
}

function efetuarPagamento(){
  fetch("http://192.168.0.2:8080/projeto/service/pagamento/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idcliente: idc,
      tipo: tp,
      descricao: ds,
      valor: vl,
      parcelas: qp,
      valorparcela: vp,

    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      alert("Seu pagamento foi efetuado");
    })
    .catch((error) => console.error(error));
    limparCarrinho();
}
function limparCarrinho(){
   db.transaction((tx)=>{
    tx.executeSql("delete from itens");
  });

}

const tela = StyleSheet.create({
  pagar: {
    backgroundColor: "#ffea00",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 13,
  },
});