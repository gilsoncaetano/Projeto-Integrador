import * as React from "react";
import { Text, View } from "../components/Themed";
import { TextInput, ScrollView,TouchableOpacity } from "react-native-gesture-handler";
import {
  Picker,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  unstable_enableLogBox,
  Alert,
} from "react-native";
import Inicial from "../screens/Inicial";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();

export default function ConfirmacaoPag({ navigation }) {
 
  return (
    <View style={estilo.area}>
  
        <ScrollView>
        <Text style={estilo.txt}>
          Confirmação de pagamento
        </Text>
          <View style={estilo.cadastrar}>
          <TouchableOpacity
              onPress={() => {
                navigation.navigate("Inicial");
              }}
              >
                <Text style={estilo.botao}> Voltar a Tela Inicial </Text>
              </TouchableOpacity>
              </View>
        </ScrollView>
      
    </View>
  );

  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Inicial" component={Inicial} />
    </Stack.Navigator>
  </NavigationContainer>;
}

const estilo = StyleSheet.create({
//ide cliente
idcaixa: {
  borderRadius: 10,
  backgroundColor: "#ffea00",
  marginLeft:30,
  marginRight:30,
  marginBottom:6,
  alignItems:'center',
  padding: 4,
  marginTop:2,
  fontWeight: "bold",
},
  fundo: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
  },
  dados: {
    color: "white",
    marginTop: 40,
    fontSize: 25,
    margin: 14,
    marginLeft: "auto",
    marginRight: "auto",
  },
  txt: {
    padding: 13,
    flex: 1,
    //color: "#fafafa",
    marginLeft: "auto",
    marginRight: "auto",
  },
  area: {
    backgroundColor: "white",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  endcaixa: {
    backgroundColor: "white",
    padding: 13,
    width: "85%",
    margin: 6,
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    borderRadius: 6,
  },
 
  botao: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: "#f9a825",
    color: "white",
  },
  cadastrar: {
    height: 40,
    borderRadius: 6,
    marginTop: 90,
    backgroundColor: "#f9a825",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    marginTop:8,
    backgroundColor: "white",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

