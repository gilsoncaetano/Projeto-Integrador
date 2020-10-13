import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, ScrollView } from "react-native";
import { Picker, Button, StyleSheet, Image } from "react-native";

import * as SQLite from "expo-sqlite";
import { TouchableOpacity } from "react-native-gesture-handler";

const db = SQLite.openDatabase("appisadb.banco");

export default function Carrinho() {
  const [dados, setDados] = React.useState([]);
  const [quantidade, setQuantidade] = React.useState(1);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from itens", [], (_, { rows: { _array } }) => {
        setDados(_array);
      });
    });
  }, []);
  return (
    <View>
      <ScrollView>
        <Text> Veja o que tem no carrinho</Text>
        {dados.map(({ id, idproduto, nomeproduto, preco, foto }) => (
          <View style={tela.conteiner}>
            <Image
              source={{ uri: `http://192.168.0.2:8080/projeto/img/${foto}` }}
              style={tela.img}
            />

            <Text>Produto:{nomeproduto}</Text>
            <Text>Preço:{preco}</Text>
            <Text>Quantidade:</Text>
            <TextInput
              placeholder="1"
              value={quantidade}
              onChangeText={(value) => setQuantidade(value)}
            />
            <TouchableOpacity
              onPress={() => {
                db.transaction((tx) => {
                  tx.executeSql("delete from itens where id=?", [id]);
                });
              }}
            >
              <Text>Tira do Carrinho</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity>
          <Text>Ir para pagamento</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  bloco2: {
    // flexDirection: "row",
    // backgroundColor: "#e0e0e0",
  },
  img: {
    borderRadius: 10,
    //padding: 10,
    margin: 5,
    marginBottom: 5,
    width: 190,
    height: 140,
    marginLeft: "auto",
    marginRight: "auto",
    //flex: 1,
  },
  conteiner: {
    //width: 160,
    width: "95%",
    marginBottom: 3,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#8bc34a",
  },
});
