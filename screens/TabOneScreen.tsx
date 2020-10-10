import * as React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { FlatList } from "react-native-gesture-handler";

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //Carregar os dados da api usando a função fetch

  useEffect(() => {
    fetch("http://192.168.0.2:8080/projeto/service/produto/listar.php")
      .then((response) => response.json())
      .then((produto) => setData(produto.saida))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text>
              Nome: {item.nomeproduto} | Descricao: {item.descricao} | Preço: R$
              {"  "} {item.preco}
            </Text>
          )}
          keyExtractor={({ idproduto }, index) => idproduto}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
