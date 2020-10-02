import * as React from "react";
import { Text, View } from "../components/Themed";
import { Picker } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("appvendadb.banco");

let idc = 0;
let tp = "";
let ds = "";
let vl = "";
let qp = 0;
let vp = "";

export default function Pagamento() {
  const [tipo, setTipo] = React.useState("");
  const [parcelas, setParcelas] = React.useState(1);
  const [idcliente, setIdCliente] = React.useState(0);

  // constantes de passagem de dados

  const [descricao, setDescricao] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [vParcela, setVParcelas] = React.useState("");

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select idcliente from perfil",
        [],
        (_, { rows: { _array } }) => {
          setIdCliente(_array);
        }
      );
    });
  });

  return (
    <View>
      <Text>Pagamento do Produto</Text>
      <Picker selectedValue={tipo} mode="dropdown" onValueChange={setTipo}>
        <Picker.Item label="Boleto" value="Boleto" />
        <Picker.Item label="Crédito" value="Crédito" />
        <Picker.Item label="Débito" value="Débito" />
      </Picker>

      <TextInput placeholder="Detalhes do pagamento" />
      <TextInput keyboardType="decimal-pad" placeholder="R$ 00" />

      <Picker
        selectedValue={parcelas}
        mode="dropdown"
        onValueChange={setParcelas}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>

      <TextInput keyboardType="decimal-pad" placeholder="R$ 00" />

      <TouchableOpacity
        onPress={() => {
          // passagens de dados do formulário para as variáveis e depois cadastro do pgamento
          idc = idcliente;
          tp = tipo;
          ds = descricao;
          vl = valor;
          qp = parcelas;
          vp = vParcela;
          efetuarPagamento();
        }}
      >
        <Text>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
}
function efetuarPagamento() {
  fetch("http://192.168.0.8/projeto/service/pagamento/cadastro.php", {
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
      quantidadeparcelas: qp,
      valorparcela: vp,
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      alert("Olhe na tela de console");
    })
    .catch((error) => console.error(error));
}
