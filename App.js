import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from "react-native";

import StartingScreen from "./components/StartingScreen";
import LogInScreen from "./components/LogInScreen";
import RegisterScreen from "./components/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import HomeScreenIcon from "./components/HomeScreenIcon";


const Stack = createNativeStackNavigator();

const App = () => {
    return (

        // <StartingScreen />
        // <LogInScreen />
        // <RegisterScreen />
        <HomeScreen />

        // <NavigationContainer>
        //     <Stack.Navigator>
                
        //         <Stack.Screen 
        //             name="LogInScreen"
        //             component={ LogInScreen } 
        //             options={{ headerShown: false }}
        //         />

        //         <Stack.Screen
        //             name="StartingScreen"
        //             component={ StartingScreen }
        //             options={{ headerShown: false }}
        //         />

        //     </Stack.Navigator>
        // </NavigationContainer>
    );
};
    
export default App;