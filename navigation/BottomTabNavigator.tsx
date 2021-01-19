import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import Inicial from "../screens/Inicial";
import Perfil from "../screens/Perfil";
import Carrinho from "../screens/Carrinho";
import PedidosRealizados from "../screens/PedidosRealizados";
//import Dadoscli from "../screens/Dadoscli";
//import Cep from "../screens/Cep";
import Boleto from "../screens/Boleto";
import Credito from "../screens/Credito";
import Debito from "../screens/Debito";
import Pagamento from "../screens/Pagamento";
//import Listar from "../screens/Listar";

import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

import { createDrawerNavigator } from "react-navigation-drawer";
import { View } from "react-native";
// const Tabs = createBottomTabNavigator({
//   Home : {
//     Screen : Home,
//     navigationOptions : {
//       tabBarLabel : ({})=> {
//         <View>
//           <Ionicons name="md-person" color="#fff" size={22}/>
//           <Text style = {{color : "#fff"}}> Boleto</Text>
//         </View>
//       }
//       }
//     },
//   },{
// });

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Inicial"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Inicial"
        component={InicialNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-home" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Perfil"
        component={PerfilNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-person" color={color} />
          ),
        }}
      />

      {/* <BottomTab.Screen
        name="Debito"
        component={DebitoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-person" color={color} />
          ),
        }}
      />
       <BottomTab.Screen
        name="Credito"
        component={CreditoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon3 name="opencart" color={color} />
          ),
        }}
      /> */}

      <BottomTab.Screen
        name="Carrinho"
        component={CarrinhoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cart" color={color} />
          ),
        }}
      />
     

     

      {/* <BottomTab.Screen
        name="Boleto"
        component={BoletoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-contact" color={color} />
          ),
        }}
      />  */}

      {/* <BottomTab.Screen
        name="Cadastrar"
        component={CadastrarNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon2 name="id-card" color={color} />
          ),
        }}
      /> */}

      

      {/* <BottomTab.Screen
        name="Endereco"
        component={EnderecoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon2 name="map-signs" color={color} />
          ),
        }}
      /> */}

      {/* <BottomTab.Screen
        name="Confend"
        component={ConfendNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon2 name="map-signs" color={color} />
          ),
        }}
      /> */}

      {/* <BottomTab.Screen
        name="Dadoscli"
        component={DadoscliNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon3 name="opencart" color={color} />
          ),
        }}
      /> */}
 {/* <BottomTab.Screen
        name="Listar"
        component={ListarNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon3 name="opencart" color={color} />
          ),
        }}
      /> */}


    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIcon2(props: { name: string; color: string }) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIcon3(props: { name: string; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const InicialStack = createStackNavigator();
function InicialNavigator() {
  return (
    <InicialStack.Navigator>
      <InicialStack.Screen
        name="Inicial"
        component={Inicial}
        options={{ headerTitle: "Isa Clube de Tiro" }}
      />
    </InicialStack.Navigator>
  );
}

const PerfilStack = createStackNavigator();
function PerfilNavigator() {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerTitle: "Perfil" }}
      />
    </PerfilStack.Navigator>
  );
}

// const DebitoStack = createStackNavigator();
// function DebitoNavigator() {
//   return (
//     <DebitoStack.Navigator>
//       <DebitoStack.Screen
//         name="Debito"
//         component={Debito}
//         options={{ headerTitle: "Debito" }}
//       />
//     </DebitoStack.Navigator>
//   );
// }

const CarrinhoStack = createStackNavigator();
function CarrinhoNavigator() {
  return (
    <CarrinhoStack.Navigator>
      <CarrinhoStack.Screen
        name="Carrinho"
        component={Carrinho}
        options={{ headerTitle: "Carrinho" }}
      />
    </CarrinhoStack.Navigator>
  );
}
// const CreditoStack = createStackNavigator();
// function CreditoNavigator() {
//   return (
//     <CreditoStack.Navigator>
//       <CreditoStack.Screen
//         name="Credito"
//         component={Credito}
//         options={{ headerTitle: "Credito" }}
//       />
//     </CreditoStack.Navigator>
//   );
// }


// const BoletoStack = createStackNavigator();
// function BoletoNavigator() {
//   return (
//     <BoletoStack.Navigator>
//       <BoletoStack.Screen
//         name="Boleto"
//         component={Boleto}
//         options={{ headerTitle: "Boleto" }}
//       />
//     </BoletoStack.Navigator>
//   );
// }

// const DadoscliStack = createStackNavigator();
// function DadoscliNavigator() {
//   return (
//     <DadoscliStack.Navigator>
//       <DadoscliStack.Screen
//         name="Dados do cliente "
//         component={Dadoscli}
//         options={{ headerTitle: "Dados do cliente" }}
//       />
//     </DadoscliStack.Navigator>
//   );
// }


// const EnderecoStack = createStackNavigator();
// function EnderecoNavigator() {
//   return (
//     <EnderecoStack.Navigator>
//       <EnderecoStack.Screen
//         name="Endereço"
//         component={Endereco}
//         options={{ headerTitle: "Endereço" }}
//       />
//     </EnderecoStack.Navigator>
//   );
// }

// const ConfendStack = createStackNavigator();
// function ConfendNavigator() {
//   return (
//     <ConfendStack.Navigator>
//       <ConfendStack.Screen
//         name="Confirma Endereço"
//         component={Confend}
//         options={{ headerTitle: "Confirma Endereço" }}
//       />
//     </ConfendStack.Navigator>
//   );
// }

// const PagamentoStack = createStackNavigator();
// function PagamentoNavigator() {
//   return (
//     <PagamentoStack.Navigator>
//       <PagamentoStack.Screen
//         name="Pagamento"
//         component={Pagamento}
//         options={{ headerTitle: "Pagamento de Produtos" }}
//       />
//     </PagamentoStack.Navigator>
//   );
// }

// const ListarStack = createStackNavigator();
// function ListarNavigator() {
//   return (
//     <ListarStack.Navigator>
//       <ListarStack.Screen
//         name="Listar cliente"
//         component={Listar}
//         options={{ headerTitle: "Dados do cliente " }}
//       />
//     </ListarStack.Navigator>
//   );
// }