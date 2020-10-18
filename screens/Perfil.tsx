import * as React from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("appisadb.banco");

export default function Perfil() {
  const [perfil, setPerfil] = React.useState([]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
        setPerfil(_array);
      });
    });
  }, []);

  return (
    <View style={tela.conteiner}>
      <ScrollView>
        <Text>Veja o Perfil</Text>

        {perfil.map(
          ({
            idcliente,
            idusuario,
            nomeusuario,
            foto,
            nomecliente,
            cpf,
            sexo,
            email,
            telefone,
            tipo,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            logado,
          }) => (
            <View style={tela.conteiner}>
              <Image
                source={{ uri: `http://192.168.0.2:8080/projeto/img/${foto}` }}
                style={tela.img}
              />
              <Text>Idcliente:{idcliente}</Text>
              <Text>Usuário:{nomeusuario}</Text>
              <Text>Nome:{nomecliente}</Text>
              <Text>CPF:{cpf}</Text>
              <Text>Sexo:{sexo}</Text>
              <Text>E-Mail:{email}</Text>
              <Text>Telefone:{telefone}</Text>
              <Text>Tipo:{tipo}</Text>
              <Text>Logradouro:{logradouro}</Text>
              <Text>Número:{numero}</Text>
              <Text>Complemento:{complemento}</Text>
              <Text>Bairro{bairro}</Text>
              <Text>CEP{cep}</Text>

              <TouchableOpacity>
                <Text>Atualizar Perfil</Text>
              </TouchableOpacity>
            </View>
          )
        )}
        <TouchableOpacity>
          <Text>Sair do aplicativo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  img: {
    //resizeMode: "contain",
    borderRadius: 30,
    margin: 20,
    marginBottom: 10,
    width: 220,
    height: 250,
    marginLeft: "auto",
    marginRight: "auto",
    flex: 1,
  },
  conteiner: {
    flex: 1,
    //width: 160,
    width: "95%",
    marginBottom: 3,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#8bc34a",
  },
});
