import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { Badge } from "react-native-elements";

import MatriculaScreen from "../screen/MatriculaScreens/MatriculaScreen";
import ProgramacionScreen from "../screen/ProgramacionScreens/ProgramacionScreen";
import NotificationScreen from "../screen/NotificationScreens/NotificationScreen";
import CustomDrawer from "./CustomDrawer";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const BottonTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const icons = {
            Principal: "home",
            Matricula: "credit-card",
            Programacion: "table",
            Notification: "bell",
          };

          const iconName = icons[route.name];
          const iconSize = focused ? width * 0.06 : width * 0.05;
          const iconColor = focused ? "#FFFFFF" : "#A0A0A0";

          return (
            <View
              style={[
                styles.tabIconContainer,
                focused ? styles.activeTabBackground : null,
              ]}
            >
              <Icon name={iconName} size={iconSize} color={iconColor} />
              {route.name === "Notification" && (
                <Badge
                  status="error"
                  value="4"
                  containerStyle={styles.badgeContainer}
                />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#A0A0A0",
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? height * 0.08 : height * 0.09,
        },
        tabBarLabelStyle: {
          fontSize: width * 0.025,
          fontWeight: "800",
          marginTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
  name="Principal"
  component={CustomDrawer}
  options={{ title: "INICIO" }}
  listeners={({ navigation }) => ({
    tabPress: (e) => {
      const state = navigation.getState();

      const isFocused = navigation.isFocused();
      const currentRoute =
        state.routes.find((r) => r.name === "Principal")?.state?.routes?.[0]
          ?.name;

      if (isFocused && currentRoute === "Home") {
        navigation.navigate("Principal", { screen: "Home" });
      }
    },
  })}
/>
      <Tab.Screen
        name="Matricula"
        component={MatriculaScreen}
        options={{ title: "MATRICULA" }}
      />
      <Tab.Screen
        name="Programacion"
        component={ProgramacionScreen}
        options={{ title: "PROGRAMACION" }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ title: "NOTIFICACION" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 50,
    minHeight: 30,
    marginTop: 4,
  },
  activeTabBackground: {
    backgroundColor: "#3A3A3A",
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -10,
  },
});

export default BottonTab;
