import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import {Image, Picker,StyleSheet, Alert} from 'react-native';
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
    <Stack.Screen name="Credito" component={Credito}/>
    <Stack.Screen name="Boleto" component={Boleto}/>
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

  const [perfil, setPerfil] = React.useState([]);
  const [nomecliente, setNomecliente] = React.useState([0]);
  

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

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
        setNomecliente(_array[0].nomecliente.toString());
        setPerfil(_array);
        console.log(_array); 
      });
  
    });
  }, []);
  return (
    <View style={tela.area}>
      <ScrollView>
      <Text style={tela.titulo}>Pagamento em Boleto</Text>

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

          {perfil.map(
          ({      
          nomecliente, 
          }) => (
            <View >
            </View>
            
          )
          
        )}


        <View style={tela.bloco1}>
        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Nome :</Text>
        <TextInput style={tela.input1}  placeholder="Nome Completo" onChangeText={(value) => setNomecliente(value)}
            value={nomecliente}></TextInput>
        </View>
        <View style={tela.inputcpf}>
        <Text style={tela.txt2}>CPF : </Text>
        <TextInput style={tela.input2} placeholder="CPF"></TextInput>
        </View>

        <View style={tela.bloboicons}>
          <View style={tela.icons}>
          <Image
            source={require("../img/impresora2.png")}
            style={tela.img}
             ></Image>
          </View>
          <Text style={tela.iconsTxt1}>imprima o boleto e</Text>
          <Text style={tela.iconsTxt2}>Pague no boleto</Text>

        </View>

        <View style={tela.bloboicons}>
          <View style={tela.icons}>
          <Image
            source={require("../img/tele1.png")}
            style={tela.img1}
             ></Image>
          </View>
          <View style={tela.viewTxt}>
          <Text style={tela.iconsTxt4}>ou pague pela internet</Text>
          <Text style={tela.iconsTxt3}>utilizando o código de barras do boleto</Text>
          </View>

        </View>

        <View style={tela.bloboicons}>
          <View style={tela.icons}>
          <Image
            source={require("../img/calendario.png")}
            style={tela.img}
             ></Image>
          </View>
          <View style={tela.viewTxt2}>
          <Text style={tela.iconsTxt5}>prazo de validade do boleto 2</Text>
          <Text style={tela.iconsTxt4}>ou pague pela internet</Text>
         
          </View>

        </View>
        </View>


     
      <View style={tela.valor}>
      <Text style={tela.valorTxt}>Valor Total:                        R$ {valor}</Text>
      <TextInput style={tela.valorTxt} keyboardType="decimal-pad" onChangeText={(value)=>setValor(value)}/>
      </View>

      <Picker selectedValue={parcela}mode="dropdown"onValueChange={(parcela) => {
          setParcela(parcela);
          setVParcelas((parseFloat(valor) / parcela).toString());
        }}
      >
        <Text style={tela.valorTxt1}>Valor total pago no boleto:            R$ {valor}</Text>
        <Picker.Item label="Valor À vista no Boleto de R$" value="1"/>
       
      </Picker> 
      <Text style={tela.valorTxt1}>Valor total pago no boleto:            R$ {valor}</Text>
      <TextInput keyboardType="decimal-pad" onChangeText={(value) => setVParcelas(value)}/>

      <View style={tela.inputpagar}>
      <TouchableOpacity onPress={()=>{
        //navigation.navigate("ConfirmacaoPag")
        // passagens de dados do formulários para os variáveis e depois cadastro do pagamento
        idc = idcliente;
        tp = "Boleto";
        ds = "Boleto gerado";
        vl = valor;
        qp = parcela;
        vp = vParcelas;
        efetuarPagamento();
      
       // navigation.navigate("ConfirmacaoPagamento");
      }}>
        <Text style={tela.pagar}>Pagar com boleto</Text>
      </TouchableOpacity>
      </View>
      <View style={tela.blocotxt}>
        <Text style={tela.iconsTxt4}>
        importante
        </Text>
        <Text >
      •	no período de 30 dias, se houver cinco ou mais boletos bancários de um mesmo cliente, não pagos, poderá ocorrer bloqueio temporário desta forma 
          de quitação, por até 30 dias. nesse período, novas compras poderão ser feitas no site por meio de outras formas de pagamento ou com boleto, pelo televendas.
        </Text>
        <Text >
        •	caso o seu computador tenha um programa anti pop-up, será preciso desativá-lo antes de finalizar sua compra e imprimir o boleto ou pagar pelo internet banking;
        </Text>
        <Text>
        •	não faça depósito ou transferência entre contas. o boleto não é enviado pelos correios. imprima-o e pague-o no banco ou pela internet; 
        </Text>
        <Text>
        •	se o boleto não for pago até a data de vencimento, o pedido será automaticamente cancelado;
        </Text>
        <Text>
        •	o prazo de entrega dos pedidos pagos com boleto bancário começa a contar três dias depois do pagamento do
         boleto, tempo necessário para que a instituição bancária confirme o pagamento.
        </Text>
      </View>
      </ScrollView>
    </View>
  );
 
}

// function efetuarPagamento() {
//   Alert.alert(
//     "IDC: " +
//       idc +
//       "\nTipo: " +
//       tp +
//       "\nDescricao: " +
//       ds +
//       "\nValor: " +
//       vl +
//       "\nQuantidade: " +
//       qp +
//       "\nValor parcela:" +
//       vp 
//   );


function efetuarPagamento(){
  fetch("http://192.168.0.2:8080/projetoisaclube/service/pagamento/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idcliente: idc,
      tipo: "Boleto",
      descricao: "Pagamento a Vista no boleto",
      valor: vl,
      parcelas: "1 Parcela a Vista",
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

    //====================================== Texto de detalhe do boleto===========================//
  iconsTxt1:{
    marginBottom:16,
    marginTop:20,
    fontSize:16,
  },
  iconsTxt2:{
    marginBottom:16,
    marginRight:10,
    fontWeight: "bold",
    marginTop:20,
    fontSize:16,
  },
  iconsTxt3:{
     fontSize:15,
  },
  iconsTxt4:{
     fontWeight: "bold",
     marginTop:10,
  },
  viewTxt:{
    // borderWidth:2,
    // borderColor:"red",
    backgroundColor: "#0000",
    marginRight:6,
  },
  iconsTxt5:{
    marginTop:10,
    marginBottom:-10,
    fontSize:15,
 },
 iconsTxt6:{
  fontWeight: "bold",
   marginTop:10,
 },
 viewTxt2:{
  //  borderWidth:2,
  //  borderColor:"red",
   backgroundColor: "#0000",
   marginRight:71,
 },
  icons:{
    borderRadius: 50,
    backgroundColor: "#9e9e9e",
    // borderWidth:2,
    // borderColor:"red",
    width: "18%",
    marginLeft:10,
    alignItems:'center',
    padding: 8,
    fontWeight: "bold",
  },
  bloboicons:{
    marginTop:25,
    flexDirection:"row",
    justifyContent:'space-between',
    backgroundColor: "#eeeeee",
    marginBottom:-10,
    
  
  },

  //====================================== Texto de detalhe do boleto===========================//
   //====================================== Valor de pagameto===========================//
  valor:{
    width: "86%",
    marginLeft: "auto",
    marginRight: "auto",
    padding:20,
    marginTop:30,
    flexDirection:"row",
    justifyContent:'space-between',
    backgroundColor: "#eeeeee",
  },
  valorTxt:{
    fontWeight: "bold",
    fontSize:16,
  },
  valorTxt1:{
    marginTop:10,
    marginLeft:25,
    fontWeight: "bold",
    color:'#388e3c',
    fontSize:16,
    marginBottom:-20,
  },

  blocotxt:{
   // width:"100%",
    marginTop:5,
    padding:10,
    paddingBottom:30,
    // borderWidth:2,
    // borderColor:"red",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#eeeeee",
    },
  //=================================================Campo de cpf =============================================//
  txt2:{
    marginBottom:-10,
    marginTop:-4,
    paddingLeft:10,
    fontSize:21,
   
  },
  inputcpf: {
    padding:10,
    height: 40,
    borderRadius: 4,
    marginBottom:10,
    width: "80%",
    //backgroundColor: "#ff5722",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input1:{
    height: 38,
    marginTop:-22,
    fontSize:20,
    width: "77%",
    marginLeft:79,
  },
  input2:{
    height: 38,
    marginTop:-22,
    fontSize:20,
    width: "77%",
    marginLeft:65,
  },
  txt1:{
    marginBottom:-10,
    marginTop:-4,
    paddingLeft:10,
    fontSize:21,
  },
  inputxt: {
    marginTop:10,
    padding:10,
    height: 40,
    borderRadius: 4,
    marginBottom:10,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  bloco1:{
    width:"100%",
    marginTop:25,
    paddingBottom:30,
    // borderWidth:2,
    // borderColor:"red",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#eeeeee",
    },
 
  //================================================= Campo de CPF =============================================//
 
  //=================================================Botao da Opcoes de pagamento =============================================//
  inputView:{
    padding:5,
    backgroundColor: "#eeeeee",
    marginTop:30,
    flexDirection:"row",
    justifyContent:'space-between',
  },
  img: {
    width: 40,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 3,
  },
  img1: {
    width: 50,
    height: 45,
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

  //=================================================Botao da Opcoes de pagamento =============================================//
   area: {
   marginLeft:10,
   marginRight:10,
   alignContent: "center",
   justifyContent: "center",
  },
 
   //=============================================== Titulo de pagamento ======================================================//
  titulo:{
  fontWeight: "bold",
  marginTop:17,
  fontSize: 20,
  marginLeft: "auto",
  marginRight: "auto",
  },
  
   //=============================================== Titulo de pagamento ======================================================//

 // =====================================================Botao de pagamento ===================================================//
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
  // =====================================================Botao de pagamento ===================================================//

  
});