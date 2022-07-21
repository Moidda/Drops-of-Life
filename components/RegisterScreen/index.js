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
import SelectList from 'react-native-dropdown-select-list'


const RegisterScreen = (props) => {
    
    const [name, setName] = React.useState("");
    const [selectedLanguage, setSelectedLanguage] = React.useState();

    const onPress = () => {
        console.warn("You pressed log in");    
    };

    const [selected, setSelected] = React.useState("");
    const data = [
        {key:'1', value:'A+'},
        {key:'2', value:'A-'},
        {key:'3', value:'B+'},
        {key:'4', value:'B-'},
        {key:'5', value:'AB+'},
        {key:'6', value:'AB-'},
        {key:'7', value:'O+'},
        {key:'8', value:'O-'},
    ];


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
            />
        </View>

        <SelectList
            boxStyles={{marginBottom: "5%", borderColor: Constants.DEFAULT_RED, width: "50%"}}
            placeholder="Blood Group"
            setSelected={setSelected} 
            search={false}
            data={data} 
            onSelect={() => {console.warn("Your blood type is " + selected);}} 
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
            />
        </View>

        <StyledButton 
            color={Constants.DEFAULT_RED}
            textColor={"white"}
            text="Register"
            onPress={() => {console.warn("You pressed register")}}
        />

        <View style={styles.registerNowContainer}>
            <Text style={{color:"black", fontSize:20}}>Already have an account? </Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={{color:Constants.DEFAULT_RED, fontSize:20}}>Log In</Text>
            </TouchableOpacity>
        </View>

    </ScrollView>
    
</View>
    );
};

export default RegisterScreen;