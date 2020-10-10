import * as React from "react";
import { Text, View } from "../components/Themed";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Settings } from "react-native";

const Drawer = createDrawerNavigator(
  {
    Home: { screer: Home },
    Profile: { screen: Profiler },
    Settings: { screen: Settings },
  },
  {
    initialRouteName: "Home",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: (props) => <Sidebar {...props} />,
  }
);
//const AppContainer = createAppContainer(AppNavigator);
