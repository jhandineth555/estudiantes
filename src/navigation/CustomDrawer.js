import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "../screen/HomeScreens/HomeScreen";
import ProfileScreen from "../screen/ProfileScreens/ProfileScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import CuScreen from "../screen/CuScreens/CuScreen";
import UpdateData from "../screen/ProfileScreens/UpdateData";


const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{ 
                title: 'PRINCIPAL',
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
                options={{
                    title: 'MI PERFIL', 
                    headerStyle: {
                    backgroundColor: '#rgb(9, 65, 85)', 
                    height: 60,},
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                }}    
            />
            <Drawer.Screen
                name='Update'
                component={UpdateData}
                options={{ headerShown: true, 
                    title: 'Actualizar Datos' ,
                    headerStyle: {
                        backgroundColor: '#rgb(9, 65, 85)',  
                        height: 60,},
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                }}    
            />
            <Drawer.Screen
                name="Cu"
                component={CuScreen}
                options={{ 
                    title: 'CARNET UNIVERSITARIO',
                    headerStyle: {
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