import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import {Image, Picker,StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { TextInput, TouchableOpacity,ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from 'expo-sqlite';
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import ConfirmacaoPag from "../screens/ConfirmacaoPag";
import {StatusBar} from 'expo-status-bar';

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

  const [boleto, setBoleto] = useState("");
  const [debito, setDebito] = useState("");
  const [credito, setCredito] = useState("");
  const [pagamento, setPagamento] = useState()

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [cep, setCep] = useState("");

  

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




  const paga = () => {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((resposta) => resposta.json())
      .then((data) => setPagamento(data))
      .catch(() => alert("Ocorreu um erro na buscar do CEP!"))
      
  }


  

  return (
    <View>
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

        <View style={tela.inputView}>  
        <View style={tela.inputCep}>
        <TextInput
          placeholder="Buscar CEP"
          style={tela.endpsq} 
          onChangeText={(value) => setCep(value)}
         value={cep}
        />
        </View>
        



        

       
        <View >
        <TouchableOpacity onPress={()=>{
         paga();
        }}>
        <Text >Buscar CEP</Text>
        </TouchableOpacity>
        </View>

        {/* <View >
        <TouchableOpacity onPress={()=>{
         debito();
        }}>
        <Text >Buscar CEP</Text>
        </TouchableOpacity>
        </View> */}
        <StatusBar style="auto"/>
        </View>



        {pagamento != null && (
          

        <View style={tela.bloco1}>

        <View style={tela.inputxt}>
        <Text style={tela.txt1}>CEP :{pagamento.cep}</Text>
        {/* <TextInput style={tela.input3} onChangeText={(value) => setDebito(value)}
        value={debito}></TextInput> */}
        </View>

        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Pagamento:</Text>
        <TextInput style={tela.input2} value={debito} onChangeText={(value) => setDebito(value)}
           />
    
        </View>

        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Pagamento:</Text>
        <TextInput style={tela.input2} value={debito} onChangeText={(value) => setDebito(value)}
           />
    
        </View>

        <View style={tela.inputxt}>
        <Text style={tela.txt1}>Pagamento:</Text>
        <TextInput style={tela.input2} value={debito} onChangeText={(value) => setDebito(value)}
           />
    
        </View>
        </View>
  )}


        
    {pagamento != null && (
          

          <View style={tela.bloco1}>
  
          <View style={tela.inputxt}>
          <Text style={tela.txt1}>CEP :{pagamento.cep}</Text>
          {/* <TextInput style={tela.input3} onChangeText={(value) => setDebito(value)}
          value={debito}></TextInput> */}
          </View>
  
          <View style={tela.inputxt}>
          <Text style={tela.txt1}>Pagamento:</Text>
          <TextInput style={tela.input2} value={debito} onChangeText={(value) => setDebito(value)}
             />
      
          </View>
  
          <View style={tela.inputxt}>
          <Text style={tela.txt1}>Pagamento:</Text>
          <TextInput style={tela.input2} value={debito} onChangeText={(value) => setDebito(value)}
             />
      
          </View>
  
          <View style={tela.inputxt}>
          <Text style={tela.txt1}>Pagamento:</Text>
          <TextInput style={tela.input2} value={debito} onChangeText={(value) => setDebito(value)}
             />
      
          </View>
          </View>
    )}
  

  

  
        






           
            <View style={tela.ViewPaga} Value={tipo} mode="dropdown" onValueChange={setTipo}>

            <TouchableOpacity onPress={()=>{
            paga();
            setBoleto(boleto);
            }} >
            <Image
            source={require("../img/boleto1.png")}
            style={tela.boleto}
             ></Image>
            <Text >Boleto</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>{
            debito();
            setDebito(debito);
            }} >
            <Image
            source={require("../img/card1.png")}
            style={tela.boleto}
             ></Image>
            <Text >Debito</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            credito();
            setCredito(credito);
            }} >
            <Image
            source={require("../img/card.png")}
            style={tela.boleto}
             ></Image>
            <Text >credito</Text>
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

  bloco1:{
    width:"93%",
    //marginBottom:5,
    padding:10,
    marginTop:20,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#8bc34a",
    },
    inputxt: {
      padding:10,
      height: 40,
      borderRadius: 4,
      marginBottom:10,
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    txt1:{
      color: "red",
      marginBottom:-10,
      marginTop:-4,
      paddingLeft:10,
      fontSize:21,
      marginLeft: "auto",
      marginRight: "auto",
    },
    input2:{
      height: 39,
      marginTop:-21,
      fontSize:20,
      width: "65%",
      marginLeft:110,  
    },
    input3:{
      height: 39,
      marginTop:-21,
      fontSize:20,
      width: "69%",
      marginLeft:97,
      
    },
    inputView:{
      
      width: "86%",
      marginTop:20,
      marginLeft: "auto",
      marginRight: "auto",
      flexDirection:"row",
      alignItems:'center',
      justifyContent:'space-between',
      backgroundColor: "#0000",
    },
    inputCep: {
      backgroundColor: "blue",
      width: "60%",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 6,
      },
      endpsq: {
       // backgroundColor: "blue",
        
        padding: 2,
        width: "82%",
        fontSize:20,
        margin: 6,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 6,
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
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%",
    flexDirection:"row",
  alignItems:'center',
  justifyContent:'space-between',
  //backgroundColor: "#ffea00",
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
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
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