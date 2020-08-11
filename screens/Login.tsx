import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Button, StyleSheet, Image } from "react-native";

export default function Login() {
  return (
    <View style={estilo.area}>
      <Image
        source={require("../assets/images/logo.png")}
        style={estilo.logo}
      />

      <TextInput placeholder="Usuário" style={estilo.acesso} />
      <TextInput secureTextEntry placeholder="Senha" style={estilo.acesso} />

      <TouchableOpacity style={estilo.logar}>
        <Text style={estilo.txtLogar}> Logar </Text>
      </TouchableOpacity>

      <TouchableOpacity style={estilo.cadastrar}>
        <Text style={estilo.txtCadastrar}> Cadastrar </Text>
      </TouchableOpacity>
    </View>
  );
}

const estilo = StyleSheet.create({
  area: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  acesso: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    width: "60%",
    margin: 5,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    shadowOpacity: 1,
    borderBottomWidth: 1,
    borderBottomColor: "silver",
  },

  logar: {
    width: "60%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#2ba97a",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 5,
  },
  txtLogar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },

  cadastrar: {
    width: "60%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
    borderColor: "#2ba97a",
    borderWidth: 1,
    borderRadius: 10,
  },
  txtCadastrar: {
    color: "#2ba97a",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },

  logo: {
    width: 100,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
    opacity: 0.2,
  },
});
