import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import {Image, Picker,StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { TextInput, TouchableOpacity,ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from 'expo-sqlite';
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import ConfirmacaoPag from "./ConfirmacaoPag";
import Debito from "../screens/Debito";
import Credito from "../screens/Credito";
import Boleto from "../screens/Boleto";

const db = SQLite.openDatabase('appisadb.banco');
const Stack = createStackNavigator();
let idc= 0;
let tp = "";
let ds = "";
let vl = "";
let qp = 0;
let vp = "";
let total = "";


export default function Pagamento() {
  return(
    <Stack.Navigator initialRouteName="TelaPagamento">
    <Stack.Screen name="TelaPagamento" component={TelaPagamento}/>
    <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator}
    options={{headerTitle:"Confirmacão de Pagamento"}}/>
    <Stack.Screen name="ConfirmacaoPag" component={ConfirmacaoPag}/>
    <Stack.Screen name="Debito" component={Debito}/>
    <Stack.Screen name="Boleto" component={Boleto}/>
    <Stack.Screen name="Credito" component={Credito}/>
  </Stack.Navigator>
 );
  
  }
  function TelaPagamento({navigation}){

  const [tipo, setTipo] = React.useState("");
  const [parcela, setParcela] = React.useState(1);
  const [idcliente, setIdCliente] = React.useState(0);
  const [produto, setProduto] = React.useState([]);
  const [perfilend, setPerfilend] = React.useState([]);
  // constante de passagem de dados
  const [descricao, setDescricao] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [vParcelas, setVParcelas] = React.useState("");

  const [boleto, setBoleto] = useState([]);
  const [debito, setDebito] = useState(0);
  const [credito, setCredito] = useState(0);
  

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
    <View style={tela.area}>
      <ScrollView>
      <Text style={tela.titulo}>Cratão de Débito</Text>


        <View style={tela.inputView}>
        
        <TouchableOpacity onPress={()=>{
          navigation.navigate("Debito")
          }} style={tela.link}>
            <Image
          source={require("../img/card3.png")}
          style={tela.img}
           ></Image>
            <Text >Debito</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
          navigation.navigate("Credito")
          }} style={tela.link}>
            <Image
          source={require("../img/card.png")}
          style={tela.img}
           ></Image>
              <Text >Credito</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
              navigation.navigate("Boleto")
      }} style={tela.link}>
        <Image
          source={require("../img/boleto4.png")}
          style={tela.img}
           ></Image>
        <Text >Boleto</Text>
      </TouchableOpacity>
      </View>
     
      <View>
        <View style={tela.inputView2}>
      <Text style={tela.txt1}>Número do cartão</Text>
      <TextInput style={tela.inputxt} placeholder="1234.1234.1234.1234"></TextInput>
      <Text style={tela.txt1}>Nome impresso no cartão</Text>
      <TextInput style={tela.inputxt} placeholder="Titular do cartão"></TextInput>
      </View>
      <View style={tela.inputView1}>
      <Text style={tela.txt1}>Validade</Text>
      <Text style={tela.txt1}>cvv</Text>
      </View>
      <View style={tela.inputView1}>
      <TextInput style={tela.input2} placeholder="00/00"></TextInput>
      <TextInput style={tela.input2} placeholder="***"></TextInput>
      </View>
      <View style={tela.inputView2}>
      <Text style={tela.txt1}>Valor total a pagor </Text>

      <Picker selectedValue={parcela}mode="dropdown"onValueChange={(parcela) => {
          setParcela(parcela);
          setVParcelas((parseFloat(valor) / parcela).toString());
        }}
      >
       <Text style={tela.valorTxt1}>Valor total pago À vista de:   R$ {valor}</Text>
        <Picker.Item label="Valor Pago no Dèbito R$" value="1"/>
        
       
      </Picker>
      {/* <Text style={tela.txt1}>Valor das Parcelas</Text>
      <TextInput style={tela.txt1} keyboardType="decimal-pad" placeholder="R$0.00" value={vParcelas} onChangeText={(value) => setVParcelas(value)}/> */}
      </View>
      </View>
      
      <Text style={tela.valorTxt1}>Valor total pago À vista de:   R$ {valor}</Text>
      <TextInput keyboardType="decimal-pad" onChangeText={(value) => setValor(value)}/>
    

      <View style={tela.inputpagar}>
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
        <Text style={tela.pagar}>Pagar com cartão de Debito</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
 
}

function efetuarPagamento(){
  fetch("http://192.168.0.2:8080/projetoisaclube/service/pagamento/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idcliente: idc,
      tipo: "Cartão de Debito",
      descricao: "Pagamento efetuado no Debito",
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
  valorTxt1:{
    marginTop:10,
    marginLeft:25,
    fontWeight: "bold",
    color:'#388e3c',
    fontSize:16,
    marginBottom:-20,
  },
  inputView1:{
    marginLeft:10,
    marginRight:10,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
  },
  inputView2:{
    marginTop:20,
    marginLeft:10,
    marginRight:10,
  },
    inputxt: {
    padding:10,
    height: 40,
    borderRadius: 4,
    marginBottom:10,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth:1,
    borderColor:"black",
  },
   txt1:{
    fontWeight: "bold",
    marginRight:130,
  },
    input2:{
    borderRadius: 4,
    borderWidth:1,
    borderColor:"black",
    height: 40,
    padding:10,
    fontSize:15,
    width: "45%",
    },
    area: {
    marginLeft:10,
    marginRight:10,
    alignContent: "center",
    justifyContent: "center",
  },
  InputTxt:{
    marginTop:-21,
    marginBottom:10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  titulo:{
    fontWeight: "bold",
    marginTop:17,
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
    ViewPaga:{
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    marginTop:10,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: "#eeeeee",
  },
  Input1: {
    height: 50,
    marginTop: -30,
    marginLeft: 15,
    marginBottom: 30,
    backgroundColor: "#8bc34a",
  },
  boleto: {
    width: 81,
    height: 50,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
  },

  inputpagar: {
  padding: 8,
  height: 36,
  borderRadius: 6,
  marginTop: 30,
  backgroundColor: "#ffea00",
  width: "85%",
  marginBottom:25,
  marginLeft: "auto",
  marginRight: "auto",
  },
  pagar: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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
  img: {
    width: 40,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3,
  },
 
  link: {
    borderRadius: 6,
    marginLeft:10,
    marginRight:10,
    borderWidth:1,
    borderColor:"red",
    alignItems:'center',
    padding: 10,
    fontWeight: "bold",
  },
  inputView:{
    backgroundColor: "#eeeeee",
    padding:5,
    marginTop:30,
    flexDirection:"row",
    justifyContent:'space-between',
  },
});