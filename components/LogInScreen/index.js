import React from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Constants from "../../constants";
import StyledButton from "../StyledButton"


const LogInScreen = (prop) => {
    const [name, setName] = React.useState("");

    const onPressRegister = () => {
        prop.navigation.navigate(Constants.RouteName.register);
    }

    const onPressLogIn = () => {
        console.warn("User is now logged in!");
        prop.navigation.navigate(Constants.RouteName.home);
    }

    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image style={styles.image} source={require('../../assets/drops-of-life.png')}/>
                <Text style={styles.title}> Drops of Life</Text>
            </View>

            <View style={styles.inputContainer}>
                <Image 
                    style={styles.inputImage}
                    source={require('../../assets/user.png')}
                />
                
                <TextInput 
                    styles={styles.input}
                    secureTextEntry={false}
                    placeholder="e.g. John Doe"
                />
            </View>

            <View style={styles.inputContainer}>
                <Image 
                    style={styles.inputImage}
                    source={require('../../assets/lock.png')}
                />
                
                <TextInput 
                    styles={styles.input}
                    secureTextEntry={true}
                    placeholder="***"
                />
            </View>

            <StyledButton 
                color={Constants.DEFAULT_RED}
                textColor={"white"}
                text="LOG IN"
                onPress={onPressLogIn}
            />

            <View style={styles.registerNowContainer}>
                <Text style={{color:"black", fontSize:20}}>Don't have an account? </Text>
                <TouchableOpacity onPress={onPressRegister}>
                    <Text style={{color:Constants.DEFAULT_RED, fontSize:20}}>Register Now</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default LogInScreen;