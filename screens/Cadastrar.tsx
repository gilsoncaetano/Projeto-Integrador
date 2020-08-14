import * as React from "react";
import { Text, View } from "../components/Themed";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import {
  SectionList,
  Picker,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";

export default function Cadastrar() {
  const [sexo, setSexo] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../assets/images/fundo.jpg")}
        style={estilo.fundo}
      >
        <ScrollView>
          <Image
            source={require("../assets/images/iconcad.png")}
            style={estilo.icon}
          />

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Dados Pessoais</Text>

            <TextInput placeholder="Nome Completo" style={estilo.input} />
            <TextInput placeholder="CPF" style={estilo.input} />
            <Picker
              selectedValue={sexo}
              mode="dropdown"
              onValueChange={setSexo}
              style={estilo.input}
            >
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
            </Picker>
          </View>

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Acesso</Text>
            <TextInput placeholder="Usuário" style={estilo.input} />
            <TextInput
              secureTextEntry
              placeholder="Senha"
              style={estilo.input}
            />
            <TextInput
              secureTextEntry
              placeholder="Confirme"
              style={estilo.input}
            />
          </View>

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Contato</Text>
            <TextInput
              placeholder="E-Mail"
              keyboardType="email-address"
              style={estilo.input}
            />
            <TextInput
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={estilo.input}
            />
          </View>

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Endereço</Text>
            <Picker
              mode="dropdown"
              selectedValue={tipo}
              onValueChange={setTipo}
              style={estilo.input}
            >
              <Picker.Item label="Tipo" value="Tipo" />
              <Picker.Item label="Av" value="Av" />
              <Picker.Item label="Rua" value="Rua" />
              <Picker.Item label="Al" value="Al" />
              <Picker.Item label="Praça" value="Praça" />
            </Picker>
            <TextInput placeholder="Logradouro" style={estilo.input} />
            <TextInput placeholder="Número" style={estilo.input} />
            <TextInput placeholder="Complemento" style={estilo.input} />
            <TextInput placeholder="Bairro" style={estilo.input} />
            <TextInput
              placeholder="CEP"
              keyboardType="numeric"
              style={estilo.input}
            />
          </View>
          <TouchableOpacity style={estilo.cadastrar}>
            <Text style={estilo.txtCadastrar}> Cadastrar </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const estilo = StyleSheet.create({
  area: {
    backgroundColor: "#2ba97a",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  fundo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  titulo: {
    textAlign: "center",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    fontSize: 15,
  },

  input: {
    width: "90%",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    color: "silver",
  },
  cadastrar: {
    width: "60%",
    backgroundColor: "#2ba97a",
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
  },
  txtCadastrar: {
    color: "white",
    textAlign: "center",
  },
  dados: {
    borderColor: "silver",
    borderWidth: 1,
    marginVertical: 5,
    width: "95%",
    padding: 5,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 10,
    paddingTop: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
  },
});
