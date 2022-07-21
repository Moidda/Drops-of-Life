import React from "react";
import { View, Text, Image, Pressable } from "react-native";

import styles from "./styles";
import StyledButton from "../StyledButton";
import * as Constants from "../../constants";

const StartingScreen = (props) => {
    // console.log(Constants.DEFAULT_RED);
    return (
        <View style={styles.container}>
            
            <Image 
            style={styles.imageContainer}
            source={require('../../assets/drops-of-life.png')} 
            />

            <Text style={styles.title}>
                Drops of Life
            </Text>

            <View style={styles.buttonContainer}>
                <StyledButton 
                    color={Constants.DEFAULT_RED}
                    textColor='white' 
                    text='Log In'
                    onPress={() => {
                        console.warn("Pressed log in");
                    }}
                />

                <StyledButton 
                    color={Constants.LIGHT_GREY} 
                    textColor={Constants.DEFAULT_RED} 
                    text='Register'
                    onPress={() => {
                        console.warn("Pressed Register");
                    }}
                />
            </View>
        </View>
    );
};


export default StartingScreen;