import * as React from "react";
import Perfilend from "../screens/Perfilend";
import Login from "../screens/Login";
import Inicial from "../screens/Inicial";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView, RefreshControl } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "../navigation/BottomTabNavigator";


import * as SQLite from "expo-sqlite";
const Stack = createStackNavigator();
const db = SQLite.openDatabase("appisadb.banco");

export default function Perfil() {
  return(
    <Stack.Navigator initialRouteName="TelaPerfil">
      <Stack.Screen name="TelaPerfil" component={TelaPerfil}/>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator}
      options={{headerTitle:"COnfirmaão de Endereço"}}/>
      <Stack.Screen name="Perfilend" component={Perfilend}/>
      <Stack.Screen name="Login" component={Login}/>
    </Stack.Navigator>
   );
  
  }
  function TelaPerfil({navigation}){
  const [dados, setDados] = React.useState([]);
  const [perfil, setPerfil] = React.useState([]);
  const [endereco, setEndereco] = React.useState([]);  

    // ---Vamos criar uma constante para realizar o refresh(atualizarção da tela)
    const [refreshing, setRefreshing] = React.useState(false);
    // codificação de atualização de atualização dos dados de tela
   const onRefresh = React.useCallback(()=>{
     setRefreshing(true);
     db.transaction((tx)=>{
     });
    
   },[]);

   React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
        setPerfil(_array);
      });
       tx.executeSql("select * from endereco", [], (_,{rows:{_array}})=>{
        setEndereco(_array); 
        console.log(_array)
        
      });
    });
  }, []);

   return (
      <View style={tela.conteiner}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <Text style={tela.perfiltxt}>Perfil</Text>

        {perfil.map(
          ({
          id,
          idcliente,             
          nomecliente, 
          foto,               
          cpf,        
          sexo,         
          email,
          senha,         
          telefone,      
          idendereco,      
          tipo,         
          logradouro,              
          numero,           
          complemento,               
          bairro,          
          cep,       
          idarma,          
          cpfarma,           
          funcao,          
          sigma,         
          arma,        
          fabricante,              
          calibre,           
          modelo,          
          cano,        
          capacidade,              
          funcionamento, 
          notafiscal,              
          datafiscal,              
          orgaoauto,             
          codigoauto,      
          logado,
          }) => (
            <View style={tela.bloco}>

              <Image
                source={{ uri: `http://192.168.0.2:8080/projetoisaclube/img/${foto}` }}
                style={tela.img}
              />
              <Text style={tela.txt1}>Idcliente: {idcliente}</Text>
              <Text style={tela.txt1}>Nome: {nomecliente}</Text>
              <Text style={tela.txt1}>CPF: {cpf}</Text>
              <Text style={tela.txt1}>Sexo: {sexo}</Text>
              <Text style={tela.txt1}>E-Mail: {email}</Text>
              <Text style={tela.txt1}>Senha: {senha}</Text>
              <Text style={tela.txt1}>Telefone: {telefone}</Text>
              <Text style={tela.txt1}>Idendereco: {idendereco}</Text>
              <Text style={tela.txt1}>Tipo: {tipo}</Text>
              <Text style={tela.txt1}>Logradouro: {logradouro}</Text>
              <Text style={tela.txt1}>Número: {numero}</Text>
              <Text style={tela.txt1}>Complemento: {complemento}</Text>
              <Text style={tela.txt1}>Bairro: {bairro}</Text>
              <Text style={tela.txt1}>CEP: {cep}</Text>
              <Text style={tela.txt1}>Idarma: {idarma}</Text>
              <Text style={tela.txt1}>Nome: {nomecliente}</Text>
              <Text style={tela.txt1}>CPF Registro: {cpfarma}</Text>
              <Text style={tela.txt1}>Função: {funcao}</Text>
              <Text style={tela.txt1}>Orgão de registro: {sigma}</Text>
              <Text style={tela.txt1}>Tipo de Arma: {arma}</Text>
              <Text style={tela.txt1}>Fabricante: {fabricante}</Text>
              <Text style={tela.txt1}>Calibre: {calibre}</Text>
              <Text style={tela.txt1}>Modelo: {modelo}</Text>
              <Text style={tela.txt1}>Qt. Cano: {cano}</Text>
              <Text style={tela.txt1}>Capacidade: {capacidade}</Text>
              <Text style={tela.txt1}>Funcionamento: {funcionamento}</Text>
              <Text style={tela.txt1}>Nota Fiscal: {notafiscal}</Text>
              <Text style={tela.txt1}>Data da Nota: {datafiscal}</Text>
              <Text style={tela.txt1}>Orgão de Autorização: {orgaoauto}</Text>
              <Text style={tela.txt1}>Código De Autorização: {codigoauto}</Text>
              
            </View>
            
          )
          
        )}
            <View style={tela.inputView}>
              <TouchableOpacity 
              onPress={() => {

                navigation.navigate("Inicial")
              }}  style={tela.link}>
                <Text style={tela.botao2}>Atualizar Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  navigation.navigate("Perfilend", {
                    //idproduto: `${item.idproduto}`,
                  });
                }} style={tela.link}
              >
          <Text style={tela.botao2}>Endereco</Text>
        </TouchableOpacity>
              </View>

              <View style={tela.inputperf}>
              <TouchableOpacity onPress={()=>{
               // sairDoAppp();
          //navigation.navigate("Login")
          
        }}>
          
          <Text style={tela.inputpe}>Sair do Perfil</Text>
        </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
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
  bloco:{
  width:"90%",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#8bc34a",
  },
  conteiner: {
    flex: 1,
    width: "100%",
    marginBottom: 3,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#8bc34a",
  },
  inputpe: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  inputperf: {
    padding:10,
    height: 40,
    marginTop:30,
    borderRadius: 4,
    marginBottom:20,
    backgroundColor: "#ffea00",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  link: {
    borderRadius: 6,
    backgroundColor: "#ffea00",
    width: "45%",
    padding: 10,
  },
  inputView:{
    marginTop:20,
    marginLeft:30,
    marginRight:30,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: "#8bc34a",
  },
  botao2:{
    textAlign: "center", 
  },

});

function listarlog() {
  fetch("http://192.168.0.2:8080/projetoisaclube/service/usuario/listarlog.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      
    }),
  })

  .then((response) => response.json())
  .then((resposta) => {
    console.log(resposta);
    alert("Voçê sai do App");
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




//     .then((response) => response.json())
//     .then((resposta) => {
//       gravarPerfil(resposta.saida[0]);
//       console.log(resposta);
//       //Alert.alert("logado");
//     })
//     .catch((error) => console.error(error));
// }


function gravarPerfil(dados) {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists perfil(id integer primary key, idcliente int, nomecliente text, foto text, cpf text, sexo text, email text, senha text, telefone text,idendereco text, tipo text, logradouro text, numero text, complemento text, bairro text, cep text, idarma text, cpfarma text, funcao text, sigma text, arma text, fabricante text, calibre text, modelo text, cano text, capacidade text, funcionamento text, notafiscal text, datafiscal text, orgaoauto text, codigoauto text, logado int);"
    );
  })
  db.transaction((tx) => {
    tx.executeSql(
      "insert into perfil (idcliente, nomecliente, foto, cpf, sexo, email, senha, telefone,idendereco, tipo, logradouro, numero, complemento, bairro, cep, idarma, cpfarma, funcao, sigma, arma, fabricante, calibre, modelo, cano, capacidade, funcionamento, notafiscal, datafiscal, orgaoauto, codigoauto, logado)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        
        dados.idcliente,
        dados.nomecliente,
        dados.foto,                    
        dados.cpf,        
        dados.sexo,         
        dados.email,     
        dados.senha,     
        dados.telefone,
        dados.idendereco,            
        dados.tipo,         
        dados.logradouro,              
        dados.numero,           
        dados.complemento,               
        dados.bairro,          
        dados.cep,       
        dados.idarma,          
        dados.cpfarma,           
        dados.funcao,          
        dados.sigma,         
        dados.arma,        
        dados.fabricante,              
        dados.calibre,           
        dados.modelo,          
        dados.cano,        
        dados.capacidade,              
        dados.funcionamento, 
        dados.notafiscal,              
        dados.datafiscal,              
        dados.orgaoauto,             
        dados.codigoauto,             
        1,
      ]
    );
    tx.executeSql("select * from perfil", [], (_, { rows }) => {
      console.log(rows);
    });
  });
}

// function atualizar(idcliente, nomecliente, cpf, sexo, email, telefone) {
//   alert("Atualizado");

//   db.transaction((tx) => {
//     tx.executeSql(
//       "create table if not exists ferfil(idp integer primary key,idcliente int,nomecliente text,cpf text, sexo text, email text, telefone text);"
//     );
//   });

//   db.transaction((tx) => {
//     tx.executeSql(
//       "insert into itens(idcliente,nomecliente,cpf,sexo,email,telefone)values(?,?,?,?,?,?)",
//       [idcliente, nomecliente, cpf, sexo, email, telefone]
//     );
//     tx.executeSql("select * from perfil", [], (_, { rows }) => {
//       console.log(JSON.stringify(rows));
//     });
//    // tx.executeSql("drop table perfil");
//   });
// }
// .then((response) => response.json())
// .then((resposta) => {
//   console.log(resposta);
//   alert("Seu pagamento foi efetuado");
// })
// .catch((error) => console.error(error));
// sairDoAppp();
// }

// function sairDoAppp(){
//   db.transaction((pf)=>{
//    pf.executeSql("drop table perfil");
//  });
// alert("Deslogado do Perfil")
// }