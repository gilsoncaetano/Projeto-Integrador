import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Value } from 'react-native-reanimated';

export default function IsaLoja() {
    const [cep, setCep] = useState("")
    const [endereco, setEndereco] = useState(null)

    const buscarCep = () => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resposta) => resposta.json())
        .then((data) => setEndereco(data))
        .catch(erro => alert(erro));
    }

    return(
        <View style={estilo.area}>
            <Text style={estilo.txt1}> Busca CEP</Text>
            <Text style={estilo.txt1}> Digite CEP</Text>
            
            {/* <TextInput style={estilo.input} placeholder="CEP"  
            keyboardType="numeric" value={cep}
            onChangeText={Value => setCep(Value)}></TextInput> */}
              {endereco != null && (
            <View>
                <Text style={estilo.txt1}> CEP {endereco.cep}</Text>
                <Text style={estilo.txt1}> Logradouro {endereco.logradouro}</Text>
                <Text style={estilo.txt1}> Bairro {endereco.bairro}</Text>
                <Text style={estilo.txt1}> Cidade {endereco.localidade}</Text>
                <Text style={estilo.txt1}> Estado {endereco.uf}</Text>
            </View>
          
        )}
        <View style={estilo.inputView}>  
        <TextInput
          placeholder="Buscar CEP"
          keyboardType="numeric"
          style={estilo.endcaixa} 
          onChangeText={(value) => setCep(value)}
          value={cep}
        />
        <View style={estilo.inputend}>
        <TouchableOpacity onPress={()=>{
        buscarCep();
        }}>
        <Text style={estilo.inputpaga}>Buscar CEP</Text>
        </TouchableOpacity>
        </View>
        <StatusBar style="auto"/>
        </View>

           {/* <button type="submit" disabled={!isValid}>
              Enviar
            </button> */}

          {/* <TouchableOpacity onPress={() =>{
              Buscarcep
          }}>
        <Text style={estilo.inputpaga}>Buscar CEP</Text>
          </TouchableOpacity> */}
{/* 
            <TextInput
            placeholder="CEP"
            keyboardType="numeric"
            style={estilo.endcaixa} 
            onChangeText={(value) => setCepend(value)}
            value={cep}
          /> */}
        </View>
    )
}

const estilo = StyleSheet.create({

area: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  endcaixa: {
    height:40,
    width:185,
    shadowColor: "gray",
    borderWidth:2,
    borderColor:'gray',
    marginLeft: "auto",
    marginRight: "auto",
  },
  input:{
    height:40,
    width:250,
    shadowColor: "gray",
    borderWidth:2,
    borderColor:'gray',
    marginLeft: "auto",
    marginRight: "auto",
  },
  txt1:{
    marginBottom:10,
    marginTop:20,
    //paddingLeft:10,
    fontSize:21,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputend: {
    padding: 10,
    height: 40,
    marginTop:30,
    marginBottom:30,
    borderRadius: 4,
    backgroundColor: "#ffea00",
    width: "35%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputpaga: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  inputView:{
    marginTop:20,
    marginLeft:30,
    marginRight:30,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: "#0000",
  },
});