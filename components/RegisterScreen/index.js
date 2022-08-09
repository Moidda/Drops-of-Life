import React from "react";

import { 
    View, 
    Image, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ScrollView
} from "react-native";

import * as Constants from "../../constants";
import styles from "./styles";
import StyledButton from "../StyledButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectList from 'react-native-dropdown-select-list';
import { firebase } from '@react-native-firebase/database';


async function isValidRegister(email, contact, password, confpass) {
    if(!(password === confpass)) return false;
    var snapshot = await firebase
                    .app()
                    .database(Constants.REALTIME_DATABASE_URL)
                    .ref('/User')
                    .once('value');
    
    var isValid = true;
    const users = snapshot.val();
    for(const u in users) {
        if(email === users[u]['email'] || contact === users[u]['contact'])
            isValid = false;
    }
    
    return isValid;
}


const RegisterScreen = (props) => {
    
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [contactno, setContactno] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [bgGroup, setbgGroup] = React.useState("");
    const [password, setpass] = React.useState("");
    const [confpass, setconfpass] = React.useState("");


    const onPressLogIn = () => {
        props.navigation.navigate(Constants.RouteName.login);
    };

    const onPressRegister = () => {
        isValidRegister(email, contactno, password, confpass).then(isValid => {
            if(isValid) {
                const reference = firebase
                    .app()
                    .database(Constants.REALTIME_DATABASE_URL)
                    .ref('/User')
                    .push()
                    .set({
                        name: name,
                        email: email,
                        contact: contactno,
                        location: location,
                        bloodGroup: bgGroup,
                        password: password,
                    })
                    .then(() => console.log('Data set.'));
            }
            else {
                console.warn("Invalid register");
            }
        });
    }

    return (
 <View style={styles.container}> 
    <View style={styles.logoContainer}>
        <Image style={styles.image} source={require('../../assets/drops-of-life.png')}/>
        <Text style={styles.title}> Drops of Life</Text>
    </View>

    <ScrollView>
        <View style={styles.inputContainer}>
            <Icon 
                style={styles.inputImage}
                name="user"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                styles={styles.input}
                secureTextEntry={false}
                placeholder="Name"
                onChangeText={newName => setName(newName)}
            />
        </View>

        <View style={styles.inputContainer}>
            <Icon 
                style={styles.inputImage}
                name="envelope-o"
                size={28}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                styles={styles.input}
                placeholder="email"
                onChangeText={newMail => setEmail(newMail)}
            />
        </View>

        <View style={styles.inputContainer}>
            <Icon 
                style={styles.inputImage}
                name="phone"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                styles={styles.input}
                placeholder="contact no"
                onChangeText={newnum => setContactno(newnum)}
            />
        </View>

        <View style={styles.inputContainer}>
            <Icon 
                style={styles.inputImage}
                name="location-arrow"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                styles={styles.input}
                placeholder="location"
                onChangeText={newlocation => setLocation(newlocation)}
            />
        </View>

        <SelectList
            boxStyles={{marginBottom: "5%", borderColor: Constants.DEFAULT_RED, width: "50%"}}
            placeholder="Blood Group"
            setSelected={setbgGroup} 
            search={false}
            data={Constants.bloodGroupData} 
            onSelect={() => {console.warn("Blood Group: " + bgGroup)}} 
        />

        <View style={styles.inputContainer}>
            <Icon 
                style={styles.inputImage}
                name="lock"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                styles={styles.input}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={newpass => setpass(newpass)}
            />
        </View>

        <View style={styles.inputContainer}>
            <Icon 
                style={styles.inputImage}
                name="lock"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                styles={styles.input}
                placeholder="confirm password"
                secureTextEntry={true}
                onChangeText={confnewpass => setconfpass(confnewpass)}
            />
        </View>

        <StyledButton 
            color={Constants.DEFAULT_RED}
            textColor={"white"}
            text="Register"
            onPress={onPressRegister}
        />

        <View style={styles.registerNowContainer}>
            <Text style={{color:"black", fontSize:20}}>Already have an account? </Text>
            <TouchableOpacity onPress={onPressLogIn}>
                <Text style={{color:Constants.DEFAULT_RED, fontSize:20}}>Log In</Text>
            </TouchableOpacity>
        </View>

    </ScrollView>
    
</View>
    );
};

export default RegisterScreen;