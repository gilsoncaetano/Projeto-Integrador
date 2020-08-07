import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import Inicial from "../screens/Inicial";
import Perfil from "../screens/Perfil";
import Carrinho from "../screens/Carrinho";
import PedidosRealizados from "../screens/PedidosRealizados";

import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

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
        component={InicialNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="md-home" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Carrinho"
        component={CarrinhoNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cart" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="PedidosRealizados"
        component={PedidosRealizadosNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-list" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Perfil"
        component={PerfilNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-contact" color={color} />
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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const InicialStack = createStackNavigator();
function InicialNavegador() {
  return (
    <InicialStack.Navigator>
      <InicialStack.Screen
        name="Inicial"
        component={Inicial}
        options={{ headerTitle: "App Venda" }}
      />
    </InicialStack.Navigator>
  );
}

const PerfilStack = createStackNavigator();
function PerfilNavegador() {
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

const CarrinhoStack = createStackNavigator();
function CarrinhoNavegador() {
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

const PedidosRealizadosStack = createStackNavigator();
function PedidosRealizadosNavegador() {
  return (
    <PedidosRealizadosStack.Navigator>
      <PedidosRealizadosStack.Screen
        name="PedidosRealizados"
        component={PedidosRealizados}
        options={{ headerTitle: "Pedidos Realizados" }}
      />
    </PedidosRealizadosStack.Navigator>
  );
}
