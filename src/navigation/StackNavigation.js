import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screen/SplashScreens/WelcomeScreen';
import LoginScreen from '../screen/LoginScreens/LoginScreen';
import SaveAuth from '../screen/LoginScreens/SaveAuth';
import BottonTab from './BottonTab';
import CursosVeranoScreen from '../screen/ProgramacionScreens/CursosVeranoScreen';
import MesaExamenScreen from '../screen/ProgramacionScreens/MesaExamenScreen';
import ProgramacionLaboratorioScreen from '../screen/ProgramacionScreens/ProgramacionLaboratorioScreen';
import VerNotasScreen from '../screen/ProgramacionScreens/VerNotasScreen';
import VerProgramacionScreen from '../screen/ProgramacionScreens/VerProgramacioScreen';
import TipoProgramacionScreen from '../screen/ProgramacionScreens/TipoProgramacionScreen';
import KardexScreen from '../screen/KardexScreen/KardexScreen';
import MisNotasPeriodo from '../screen/ProgramacionScreens/MisNotasPeriodo';
import TablasNotas from '../screen/ProgramacionScreens/TablaNotas/TablaNotas';
import Mostrar_KardexScreen from '../screen/KardexScreen/Mostrar_KardexScreen';
import MostrarKardexPensumScreen from '../screen/KardexScreen/MostrarKardexPensumScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Welcome'
                component={WelcomeScreen}
            />
            <Stack.Screen
                name='AuthSave'
                component={SaveAuth}
            />
            <Stack.Screen
                name='Login'
                component={LoginScreen}
            />
            <Stack.Screen
                name='Tab'
                component={BottonTab}
            />
            <Stack.Screen
                name='TipoProgramacion'
                component={TipoProgramacionScreen} 
                options={{ headerShown: true,
                title: 'MIS PROGRAMACIONES',
                headerStyle: {
                        backgroundColor: '#rgb(9, 65, 85)',  
                        height: 70,},
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                }} 
            /> 
            <Stack.Screen
                name='Verano'
                component={CursosVeranoScreen}
                options={{ headerShown: true,
                    title: 'CURSOS DE VERANO',
                    }} 
            />
            <Stack.Screen
                name='MesaExamen'
                component={MesaExamenScreen}
                options={{ headerShown: true,
                    title: 'PROGRAMACION MESA DE EXAMEN',
                    }} 
            />
            <Stack.Screen
                name='Laboratorio'
                component={ProgramacionLaboratorioScreen}
                options={{ headerShown: true,
                    title: 'PROGRAMACION LABORATORIO',
                    }} 
            />
            <Stack.Screen
                name='VerNotas'
                component={VerNotasScreen}
                options={{ headerShown: true,
                    title: 'MIS NOTAS',
                    headerStyle: {
                        backgroundColor: '#rgb(21, 97, 124)',  
                        height: 60,},
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                    }} 
            />
            <Stack.Screen
                name='VerProgramacion'
                component={VerProgramacionScreen}
                options={{ headerShown: true,
                    title: 'VER MI PROGRAMACION',
                    }} 
            />
            <Stack.Screen
                name='kardex'
                component={KardexScreen} 
                options={{ headerShown: true,
                title: ' ',
                headerStyle: {
                        backgroundColor: '#rgb(9, 65, 85)',  
                        height: 70,},
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                }} 
            /> 
            <Stack.Screen
                name='vernotas'
                component={VerNotasScreen} 
                options={{ headerShown: true,
                title: ' ',
                headerStyle: {
                        backgroundColor: '#rgb(9, 65, 85)',  
                        height: 70,},
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                }} 
            /> 
            <Stack.Screen
                name='notas'
                component={MisNotasPeriodo} 
                options={{ headerShown: true,
                title: ' ',
                headerStyle: {
                        backgroundColor: '#rgb(9, 65, 85)',  
                        height: 70,},
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                }} 
            />
            <Stack.Screen 
            name='imprimirkardexacademico'
            component={Mostrar_KardexScreen}
            />
            
            <Stack.Screen 
            name='imprimirkardexpensum'
            component={MostrarKardexPensumScreen}
            />
           
            <Stack.Screen
                name='tablanotas'
                component={TablasNotas} 
                options={{ headerShown: true,
                title: ' ',
                headerStyle: {
                        backgroundColor: '#rgb(9, 65, 85)',  
                        height: 70,},
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                }} 
            />
        </Stack.Navigator>
    );
};
export default StackNavigation;