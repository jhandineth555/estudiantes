import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Badge } from "react-native-elements";
import CuScreen from "../screen/CuScreens/CuScreen";
import MatriculaScreen from "../screen/MatriculaScreens/MatriculaScreen";
import ProgramacionScreen from "../screen/ProgramacionScreens/ProgramacionScreen";
import NotificationScreen from "../screen/NotificationScreens/NotificationScreen";
import CustomDrawer from "./CustomDrawer";

const Tab = createBottomTabNavigator();

const BottonTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    const icons = {
                        Principal: "home",
                        Matricula: "book",
                        Programacion: "table",
                        Cu: "address-book",
                        Notification: "bell",
                    };

                    return (
                        <View>
                            <Icon
                                name={icons[route.name]}
                                size={focused ? 30 : 25}
                                color={focused ? "#FFD700" : color}
                            />
                            {route.name === "Notification" && (
                                <Badge
                                    status="error"
                                    value="4"
                                    containerStyle={{ position: "absolute", top: -5, right: -10 }}
                                />
                            )}
                        </View>
                    );
                },
                tabBarActiveTintColor: "#FFD700",
                tabBarInactiveTintColor: "#C1C1C4",
                tabBarStyle: {
                    backgroundColor: "#333",
                    height: 65,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: "absolute",
                    paddingBottom: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "#FFFFFF",
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Principal" component={CustomDrawer} options={{ title: "Inicio" }} />
            <Tab.Screen name="Cu" component={CuScreen} options={{ title: "Carnet Univ." }} />
            <Tab.Screen name="Matricula" component={MatriculaScreen} options={{ title: "Matrículas" }} />
            <Tab.Screen name="Programacion" component={ProgramacionScreen} options={{ title: "Programación" }} />
            <Tab.Screen name="Notification" component={NotificationScreen} options={{ title: "Notificaciones" }} />
        </Tab.Navigator>
    );
};

export default BottonTab;