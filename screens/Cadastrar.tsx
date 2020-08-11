import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { SectionList, Picker, Button } from "react-native";

export default function Cadastrar() {
  const [sexo, setSexo] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  return (
    <View>
      <Text>Dados Pessoais</Text>
      <TextInput placeholder="Nome Completo" />
      <TextInput placeholder="CPF" />
      <Picker selectedValue={sexo} mode="dropdown" onValueChange={setSexo}>
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Feminino" value="Feminino" />
      </Picker>

      <Text>Acesso</Text>
      <TextInput placeholder="Usuário" />
      <TextInput secureTextEntry placeholder="Senha" />
      <TextInput secureTextEntry placeholder="Confirme" />

      <Text>Contato</Text>
      <TextInput placeholder="E-Mail" keyboardType="email-address" />
      <TextInput placeholder="Telefone" keyboardType="phone-pad" />

      <Text>Endereço</Text>
      <Picker mode="dropdown" selectedValue={tipo} onValueChange={setTipo}>
        <Picker.Item label="Tipo" value="Tipo" />
        <Picker.Item label="Av" value="Av" />
        <Picker.Item label="Rua" value="Rua" />
        <Picker.Item label="Al" value="Al" />
        <Picker.Item label="Praça" value="Praça" />
      </Picker>
      <TextInput placeholder="Logradouro" />
      <TextInput placeholder="Número" />
      <TextInput placeholder="Complemento" />
      <TextInput placeholder="Bairro" />
      <TextInput placeholder="CEP" keyboardType="numeric" />

      <Button title="Cadastrar" />
    </View>
  );
}
