import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ScrollView } from "react-native";

import * as Constants from "./constants";

import StartingScreen from "./components/StartingScreen";
import LogInScreen from "./components/LogInScreen";
import RegisterScreen from "./components/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import HomeScreenIcon from "./components/HomeScreenIcon";
import CreateRequest from "./screens/CreateRequest";
import RequestCard from "./components/RequestCard";
import RequestFeed from "./screens/RequestFeed";
import MyRequests from "./screens/MyRequests";
import MyRequestFilter from "./screens/MyRequestFilter";
import MyRequestsCompleted from "./screens/MyRequestsCompleted";
import Organization from "./screens/Organization";
import Ambulance from "./screens/Ambulance";
import Profile from "./screens/Profile";


const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={Constants.RouteName.starting}
                    component={ StartingScreen }
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name={Constants.RouteName.login}
                    component={ LogInScreen } 
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={Constants.RouteName.register}
                    component={ RegisterScreen }
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name={Constants.RouteName.home}
                    component={ HomeScreen }
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name={Constants.RouteName.createRequest}
                    component={ CreateRequest }
                    options={ {
                        headerStyle: {
                            backgroundColor: Constants.DEFAULT_RED,
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: 'center'
                    } }
                />

                <Stack.Screen 
                    name={Constants.RouteName.requestFeed}
                    component={ RequestFeed }
                    options={ {
                        headerStyle: {
                            backgroundColor: Constants.DEFAULT_RED,
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: 'center'
                    } }
                />

                <Stack.Screen 
                    name={Constants.RouteName.myRequests}
                    component={ MyRequests }
                    options={ {
                        headerStyle: {
                            backgroundColor: Constants.DEFAULT_RED,
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: 'center'
                    } }
                />

                <Stack.Screen 
                    name={Constants.RouteName.myRequestsFilter}
                    component={ MyRequestFilter }
                    options={ {
                        headerStyle: {
                            backgroundColor: Constants.DEFAULT_RED,
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: 'center'
                    } }
                />

                <Stack.Screen 
                    name={Constants.RouteName.myRequestsCompleted}
                    component={ MyRequestsCompleted }
                    options={ {
                        headerStyle: {
                            backgroundColor: Constants.DEFAULT_RED,
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: 'center'
                    } }
                />
                
                <Stack.Screen 
                    name={Constants.RouteName.organization}
                    component={ Organization }
                    options={ {
                        headerStyle: {
                            backgroundColor: Constants.DEFAULT_RED,
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: 'center'
                    } }
                />

                <Stack.Screen 
                    name={Constants.RouteName.ambulance}
                    component={ Ambulance }
                    options={ {
                        headerStyle: {
                            backgroundColor: Constants.DEFAULT_RED,
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: 'center'
                    } }
                />

                <Stack.Screen 
                    name={Constants.RouteName.profile}
                    component={ Profile }
                    options={ {
                        headerStyle: {
                            backgroundColor: Constants.DEFAULT_RED,
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: 'center'
                    } }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
    
export default App;