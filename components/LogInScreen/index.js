import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";

const LogInScreen = () => {
    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image style={styles.image} source={require('../../assets/drops-of-life.png')}/>
                <Text style={styles.title}> Drops of Life</Text>
            </View>

        </View>
    );
};

export default LogInScreen;