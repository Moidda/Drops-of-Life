import React, { isValidElement } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Constants from "../../constants";

import StyledButton from "../StyledButton";

import { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


const storeUserData = async (name, contact, email, location, bloodGroup) => {
    try {
        location = JSON.stringify(location);
        await AsyncStorage.setItem('@name',         name);
        await AsyncStorage.setItem('@contact',      contact);
        await AsyncStorage.setItem('@email',        email);
        await AsyncStorage.setItem('@location',     location);
        await AsyncStorage.setItem('@bloodGroup',   bloodGroup);
    } catch (e) {
        console.error(e);
    }
}

const isValidLogIn = async (email, password) => {
    console.log("Retrieving user data from firebase ...");
    var isValid = false;
    var snapshot = await firebase
                            .app()
                            .database(Constants.REALTIME_DATABASE_URL)
                            .ref('/User')
                            .once('value');

    const users = snapshot.val();
    for(const u in users) {
        const dbEmail = users[u]['email'];
        const dbPass = users[u]['password'];

        console.log("dbEmail:" + dbEmail + ", dbPass:" + dbPass);
        
        if(email === dbEmail && password === dbPass) {
            isValid = true;
            storeUserData(
                users[u]['name'], 
                users[u]['contact'], 
                users[u]['email'], 
                users[u]['location'], 
                users[u]['bloodGroup']
            );
        }
    }
    return isValid;
};


const LogInScreen = (prop) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onPressRegister = () => {
        prop.navigation.navigate(Constants.RouteName.register);
    }

    const onPressLogIn = () => {
        isValidLogIn(email, password).then(isValid => {
            if(isValid) {
                prop.navigation.navigate(Constants.RouteName.home);
            }
            else {
                console.warn("Wrong credentials!!");
                console.log("email: " + email);
                console.log("password: " + password);
            }
        })
        .catch(function(error) {
            console.log('Catch Error: isValidLogIn: ' + error.message);
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image style={styles.image} source={require('../../assets/drops-of-life.png')}/>
                <Text style={styles.title}> Drops of Life</Text>
            </View>

            <View style={styles.inputContainer}>
                <Icon 
                    style={{marginLeft:20, marginRight: 20}}
                    name="envelope-o"
                    size={30}
                    color={Constants.DEFAULT_RED}
                />
                <TextInput 
                    styles={styles.input}
                    secureTextEntry={false}
                    placeholder="e.g. JohnDoe@gmail.com"
                    onChangeText={ (inputEmail) => setEmail(inputEmail) }
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
                    onChangeText={ (inputPassword) => setPassword(inputPassword) }
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