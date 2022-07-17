import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StartingScreen from "./components/StartingScreen";
import LogInScreen from "./components/LogInScreen";

const App = () => {
    return (
        // <StartingScreen />
        <LogInScreen />
    );
};
    

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
    }
});

export default App;