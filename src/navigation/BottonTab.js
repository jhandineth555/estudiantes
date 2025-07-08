import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { Badge } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Orientation from "react-native-orientation-locker";

import MatriculaScreen from "../screen/MatriculaScreens/MatriculaScreen";
import ProgramacionScreen from "../screen/ProgramacionScreens/ProgramacionScreen";
import NotificationScreen from "../screen/NotificationScreens/NotificationScreen";
import CustomDrawer from "./CustomDrawer";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const BottonTab = () => {
  const insets = useSafeAreaInsets();
  const iconSize = width * 0.055;

  useEffect(() => {
    Orientation.lockToPortrait(); // 🔒 Bloquea en vertical
    return () => {
      Orientation.unlockAllOrientations(); // 🔓 Libera al salir
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const iconMap = {
            Principal: "home",
            Matricula: "credit-card",
            Programacion: "table",
            Notification: "bell",
          };

          const iconName = iconMap[route.name];
          const iconColor = focused ? "#FFFFFF" : "#A0A0A0";

          return (
            <View
              style={[
                styles.iconWrapper,
                focused && styles.iconFocusedBackground,
              ]}
            >
              <Icon name={iconName} size={iconSize} color={iconColor} />
              {route.name === "Notification" && (
                <Badge
                  value="4"
                  status="error"
                  badgeStyle={styles.badgeStyle}
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
          elevation: 8,
          height:
            (Platform.OS === "ios" ? height * 0.08 : height * 0.09) +
            insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 5,
          overflow: "hidden",
        },
        tabBarLabelStyle: {
          fontSize: width * 0.025,
          fontWeight: "600",
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
            const currentRoute =
              state.routes.find((r) => r.name === "Principal")?.state?.routes?.[0]
                ?.name;

            if (navigation.isFocused() && currentRoute === "Home") {
              navigation.navigate("Principal", { screen: "Home" });
            }
          },
        })}
      />
      <Tab.Screen
        name="Matricula"
        component={MatriculaScreen}
        options={{ title: "MATRÍCULA" }}
      />
      <Tab.Screen
        name="Programacion"
        component={ProgramacionScreen}
        options={{ title: "PROGRAMACIÓN" }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ title: "NOTIFICACIÓN" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconFocusedBackground: {
    backgroundColor: "#3A3A3A",
  },
  badgeContainer: {
    position: "absolute",
    top: 2,
    right: -4,
  },
  badgeStyle: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
  },
});

export default BottonTab;
