import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "../screen/HomeScreens/HomeScreen";
import ProfileScreen from "../screen/ProfileScreens/ProfileScreen";
import CustomDrawerContent from "./CustomDrawerContent";


const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Principal', 
                headerStyle: {
                    backgroundColor: '#rgb(9, 65, 85)', 
                    height: 60,},
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Mi Perfil' 
                ,headerStyle: {
                    backgroundColor: '#rgb(9, 65, 85)', 
                    height: 60,},
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                }}
                
            />
        </Drawer.Navigator>
    )
}
export default CustomDrawer; 