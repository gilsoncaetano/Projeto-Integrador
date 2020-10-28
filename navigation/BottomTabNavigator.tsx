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
import Login from "../screens/Login";
import Cadastrar from "../screens/Cadastrar";
import Perfilend from "../screens/Perfilend";
import Endereco from "../screens/Endereco";
import Confend from "../screens/Confend";
import Pagamento from "../screens/Pagamento";
import ConfirmacaoPag from "../screens/ConfirmacaoPag";


import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

import { createDrawerNavigator } from "react-navigation-drawer";

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
        name="Perfilend"
        component={PerfilendNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-person" color={color} />
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
        name="PedidosRealizados"
        component={PedidosRealizadosNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon3 name="opencart" color={color} />
          ),
        }}
      /> */}

      {/* <BottomTab.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-contact" color={color} />
          ),
        }}
      /> */}

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

      <BottomTab.Screen
        name="Pagamento"
        component={PagamentoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon3 name="opencart" color={color} />
          ),
        }}
      />
 <BottomTab.Screen
        name="ConfirmacaoPag"
        component={ConfirmacaoPagNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon3 name="opencart" color={color} />
          ),
        }}
      />


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

const PerfilendStack = createStackNavigator();
function PerfilendNavigator() {
  return (
    <PerfilendStack.Navigator>
      <PerfilendStack.Screen
        name="Perfilend"
        component={Perfilend}
        options={{ headerTitle: "Perfilend" }}
      />
    </PerfilendStack.Navigator>
  );
}

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

// const PedidosRealizadosStack = createStackNavigator();
// function PedidosRealizadosNavigator() {
//   return (
//     <PedidosRealizadosStack.Navigator>
//       <PedidosRealizadosStack.Screen
//         name="PedidosRealizados"
//         component={PedidosRealizados}
//         options={{ headerTitle: "Pedidos Realizados" }}
//       />
//     </PedidosRealizadosStack.Navigator>
//   );
// }

// const LoginStack = createStackNavigator();
// function LoginNavigator() {
//   return (
//     <LoginStack.Navigator>
//       <LoginStack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerTitle: "Login" }}
//       />
//     </LoginStack.Navigator>
//   );
// }

const CadastrarStack = createStackNavigator();
function CadastrarNavigator() {
  return (
    <CadastrarStack.Navigator>
      <CadastrarStack.Screen
        name="Cadastrar"
        component={Cadastrar}
        options={{ headerTitle: "Cadastrar" }}
      />
    </CadastrarStack.Navigator>
  );
}


const EnderecoStack = createStackNavigator();
function EnderecoNavigator() {
  return (
    <EnderecoStack.Navigator>
      <EnderecoStack.Screen
        name="Endereço"
        component={Endereco}
        options={{ headerTitle: "Endereço" }}
      />
    </EnderecoStack.Navigator>
  );
}

const ConfendStack = createStackNavigator();
function ConfendNavigator() {
  return (
    <ConfendStack.Navigator>
      <ConfendStack.Screen
        name="Confirma Endereço"
        component={Confend}
        options={{ headerTitle: "Confirma Endereço" }}
      />
    </ConfendStack.Navigator>
  );
}

const PagamentoStack = createStackNavigator();
function PagamentoNavigator() {
  return (
    <PagamentoStack.Navigator>
      <PagamentoStack.Screen
        name="Pagamento"
        component={Pagamento}
        options={{ headerTitle: "Pagamento de Produtos" }}
      />
    </PagamentoStack.Navigator>
  );
}

const ConfirmacaoPagStack = createStackNavigator();
function ConfirmacaoPagNavigator() {
  return (
    <ConfirmacaoPagStack.Navigator>
      <ConfirmacaoPagStack.Screen
        name="Confirmação De Pagamento"
        component={ConfirmacaoPag}
        options={{ headerTitle: "Confirmação De Pagamento" }}
      />
    </ConfirmacaoPagStack.Navigator>
  );
}