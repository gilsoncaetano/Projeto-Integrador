import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import {Image, Picker,StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { TextInput, TouchableOpacity,ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from 'expo-sqlite';
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import ConfirmacaoPag from "../screens/ConfirmacaoPag";
import Debito from "../screens/Debito";
import Credito from "../screens/Credito";
//import Boleto from "../screens/Boleto";

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
      <Text style={tela.titulo}>Pagamento de Produto</Text>

      {/* {perfilend.map(
          ({
          idcliente,  
        }) => ( 
          <TextInput style={estilo.endcaixa} keyboardType="decimal-pad" placeholder="R$0.00" value={idcliente} onChangeText={(value)=>setIdCliente(value)}>{idcliente}</TextInput>
          // <TextInput
          // // placeholder="ID"
          // // keyboardType="numeric" 
          // //   style={estilo.endcaixa}
          // //   onChangeText={(value) => setIdCliente(value)}
          // //   value={idcliente}>{idcliente} </TextInput>
            )   
            )}  */}
           
            <View style={tela.ViewPaga} >

            <TouchableOpacity onPress={()=>{
            setBoleto(boleto);
            }} >
            <Image
            source={require("../img/boleto1.png")}
            style={tela.boleto}
             ></Image>
            <Text style={tela.InputTxt}>Boleto</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>{
             navigation.navigate("Credito")
            }} >
            <Image
            source={require("../img/card1.png")}
            style={tela.boleto}
             ></Image>
            <Text style={tela.InputTxt}>Debito</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            navigation.navigate("Debito")
            }} >
            <Image
            source={require("../img/card.png")}
            style={tela.boleto}
             ></Image>
            <Text style={tela.InputTxt}>credito</Text>
          </TouchableOpacity>
  
            </View>
            
      




            
            {/* <View style={tela.input2}>
          <TouchableOpacity onPress={()=>{
            setQuantidade(quantidade -1);
            }} style={tela.link}>
                <Text >- 1</Text>
          </TouchableOpacity>

            <View style={tela.inputTxt}>
                    
          

          <TouchableOpacity onPress={()=>{
            setQuantidade(quantidade + 1);
             }} style={tela.link}>
          <Text >+ 1</Text>
          </TouchableOpacity>
           </View> */}


      {/* <Picker selectedValue={tipo} mode="dropdown" onValueChange={setTipo}>
        <Picker.Item label="Boleto" value="Boleto"/>
        <Picker.Item label="Crédito" value="Crédito"/>
        <Picker.Item label="Débito" value="Débito"/>
      </Picker> */}

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
        <Text style={tela.pagar}>Pagar</Text>
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
   area: {
   //backgroundColor: "#ffea00",
   //backgroundColor: "white",
   //flex: 1,
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
    //color: "white",
    fontWeight: "bold",
    marginTop:17,
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  ViewPaga:{

  //horizontal:true,
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
    //backgroundColor: "#8bc34a",
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
});