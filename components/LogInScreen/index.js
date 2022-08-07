import React, { isValidElement } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Constants from "../../constants";

import StyledButton from "../StyledButton";

import { firebase } from '@react-native-firebase/database';


const isValidLogIn = async (name, password) => {
    var isValid = false;
    var snapshot = await firebase
                            .app()
                            .database(Constants.REALTIME_DATABASE_URL)
                            .ref('/User')
                            .once('value');

    const users = snapshot.val();
    for(const u in users) {
        console.log(users[u]['bloodGroup']);
        console.log(users[u]['contact']);
        console.log(users[u]['email']);
        console.log(users[u]['location']);
        console.log(users[u]['name']);
        console.log(users[u]['password']);
        
        console.log('');
    
        const dbName = users[u]['name'];
        const dbPass = users[u]['password']; 

        if(name === dbName && password === dbPass)
            isValid = true;
    }
    return isValid;
};


const LogInScreen = (prop) => {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onPressRegister = () => {
        prop.navigation.navigate(Constants.RouteName.register);
    }

    const onPressLogIn = () => {
        isValidLogIn(name, password).then(isValid => {
            if(isValid) {
                prop.navigation.navigate(Constants.RouteName.home);
            }
            else {
                console.warn("Wrong credentials!!");
                console.warn("name: " + name);
                console.warn("password: " + password);
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
                <Image 
                    style={styles.inputImage}
                    source={require('../../assets/user.png')}
                />
                
                <TextInput 
                    styles={styles.input}
                    secureTextEntry={false}
                    placeholder="e.g. John Doe"
                    onChangeText={ (inputName) => setName(inputName) }
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