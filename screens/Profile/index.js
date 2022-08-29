import React from "react";
import { View, Image, Text, Pressable, TextInput } from "react-native";

import { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";
import * as Constants from "../../constants";
import SelectList from 'react-native-dropdown-select-list'
import { jsonSchema } from "uuidv4";


const getUserData = async () => {
    try {
        const name = await AsyncStorage.getItem('@name');
        const email = await AsyncStorage.getItem('@email');
        const contact = await AsyncStorage.getItem('@contact');
        const locationJSON = await AsyncStorage.getItem('@location');
        const location = JSON.parse(locationJSON);
        const bloodGroup = await AsyncStorage.getItem('@bloodGroup');
        return [name, email, contact, location, bloodGroup];  
    } 
    catch(e) {
        console.error(e);
    }
}


const storeUserData = async (key, value) => {
    try {
        if(key === "name")          await AsyncStorage.setItem('@name', value);
        if(key === "bloodGroup")    await AsyncStorage.setItem('@bloodGroup', value);
        if(key === "location")      await AsyncStorage.setItem('@location', JSON.stringify(value));
        
    } catch (e) {
        console.error(e);
    }
}


const getUserFromDatabase = async (userContact) => {
    var snapshot = await firebase
                .app()
                .database(Constants.REALTIME_DATABASE_URL)
                .ref('/User')
                .once('value');

    // users is an object that contains the JSON representative of the User table
    // This object can be iterated over to get info about all users
    const users = snapshot.val();
    for(var userId in users) {
        if(users[userId]['contact'] === userContact){
            return [userId, users[userId]['password']];
        }
    }
    return null;
};

const updateUserInfo = async (userId, key, value) => {
    
    var reference = await firebase
                    .app()
                    .database(Constants.REALTIME_DATABASE_URL)
                    .ref('/User/' + userId);

    if(key === "name") {
        reference
            .update({name: value})
            .then(() => { console.warn("name updated"); });
    }
    if(key === "password") {
        reference
            .update({password: value})
            .then(() => { console.warn("password updated"); });
    }
    if(key === "bloodGroup") {
        reference
            .update({bloodGroup: value})
            .then(() => { console.warn("bloodGroup updated"); });
    }
    if(key === "location") {
        reference
            .update({location: value})
            .then(() => { console.warn("location updated"); });
    }
};


const Profile = (props) => {

    const [isChangeName, setIsChangeName] = React.useState(false);
    const [nameText, setNameText] = React.useState('');

    const [isChangePassword, setIsChangePassword] = React.useState(false);
    const [oldPasswordText, setOldPasswordText] = React.useState('');
    const [newPasswordText, setNewPasswordText] = React.useState('');
    const [confirmPasswordText, setConfirmPasswordText] = React.useState('');

    const [isChangeBloodGroup, setIsChangeBloodGroup] = React.useState(false);
    const [selectedBloodGroup, setSelectedBloodGroup] = React.useState("");

    const [isChangeLocation, setIsChangeLocation] = React.useState(false);
    const [selectedLocation, setSelectedLocation] = React.useState("");

    // user information from session
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userContact, setUserContact] = React.useState('');
    const [userLocation, setUserLocation] = React.useState('');
    const [userBloodGroup, setUserBloodGroup] = React.useState('');

    React.useEffect(() => {
        getUserData().then(ret => {
            const [name, email, contact, location, bloodGroup] = ret;
            setUserName(name);
            setUserEmail(email);
            setUserContact(contact);
            setUserLocation(location);
            setUserBloodGroup(bloodGroup);

            setNameText(name);
        });
    }, []);

    const onChangeNameText = (text) => {
        setNameText(text);
    };

    const onChangeOldPasswordText = (text) => {
        setOldPasswordText(text);
    }

    const onChangeNewPasswordText = (text) => {
        setNewPasswordText(text);
    }

    const onChangeConfirmPasswordText = (text) => {
        setConfirmPasswordText(text);
    }

    const onPressSaveName = () => {
        getUserFromDatabase(userContact)
        .then((userIdPass) => {
            const [userId, password] = userIdPass;
            updateUserInfo(userId, "name", nameText)
            .then(() => { 
                storeUserData("name", nameText).then(() => {console.warn("data set")});
            });
        })
        .catch((e) => {console.log(e);});
        setIsChangeName(false);
    };

    const onPressSavePassword = () => {
        getUserFromDatabase(userContact)
        .then((userIdPass) => {
            const [userId, password] = userIdPass;
            if(confirmPasswordText === newPasswordText && oldPasswordText === password)
                updateUserInfo(userId, "password", confirmPasswordText);
            else
                console.warn("Password mismatch");
        })
        .catch((e) => {console.log(e);});
        setIsChangePassword(false);
    };

    const onPressSaveBloodGroup = () => {
        getUserFromDatabase(userContact)
        .then((userIdPass) => {
            const [userId, password] = userIdPass;
            updateUserInfo(userId, "bloodGroup", selectedBloodGroup)
            .then(() => { 
                storeUserData("bloodGroup", selectedBloodGroup).then(() => {console.warn("data set")});
            });
        })
        .catch((e) => {console.log(e);});
        setIsChangeBloodGroup(false);
    };

    const onPressSaveLocation = () => {
        getUserFromDatabase(userContact)
        .then((userIdPass) => {
            const [userId, password] = userIdPass;
            updateUserInfo(userId, "location", selectedLocation)
            .then(() => { 
                storeUserData("location", selectedLocation).then(() => {console.warn("data set")});
            });
        })
        .catch((e) => {console.log(e);});
        setIsChangeLocation(false);
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={()=>{setIsChangeName(!isChangeName)}}
            >
                <View elevation={7} style={styles.fieldContainer}>
                        <Text style={styles.fieldText}>Change Name</Text>
                </View>
            </Pressable>
            {
                isChangeName ?
                <View style={styles.changeContainer}>
                    <TextInput 
                    style={styles.inputField}
                    onChangeText={text => onChangeNameText(text)}
                    value={nameText}
                    />
                    <Pressable onPress={onPressSaveName} style={styles.saveButton}>
                        <Text style={styles.buttonTextStyle}> Save </Text>
                    </Pressable>
                </View>
                :
                null
            }

            <Pressable
                onPress={()=>{setIsChangePassword(!isChangePassword)}}
            >
                <View elevation={7} style={styles.fieldContainer}>
                        <Text style={styles.fieldText}>Change Password</Text>
                </View>        
            </Pressable>

            {
                isChangePassword ?
                <View style={styles.changeContainer}>
                    <TextInput 
                    style={styles.inputField}
                    onChangeText={text => onChangeOldPasswordText(text)}
                    value={oldPasswordText}
                    placeholder= "Old Password"
                    secureTextEntry= {true}
                    />

                    <TextInput 
                    style={styles.inputField}
                    onChangeText={text => onChangeNewPasswordText(text)}
                    value={newPasswordText}
                    placeholder= "New Password"
                    secureTextEntry= {true}
                    />

                    <TextInput 
                    style={styles.inputField}
                    onChangeText={text => onChangeConfirmPasswordText(text)}
                    value={confirmPasswordText}
                    placeholder= "Confirm Password"
                    secureTextEntry= {true}
                    />
                    <Pressable onPress={onPressSavePassword} style={styles.saveButton}>
                        <Text style={styles.buttonTextStyle}> Save </Text>
                    </Pressable>
                </View>
                :
                null
            }


            <Pressable
                onPress={()=>{setIsChangeBloodGroup(!isChangeBloodGroup)}}
            >
                <View elevation={7} style={styles.fieldContainer}>
                        <Text style={styles.fieldText}>Change Blood Group</Text>
                </View>        
            </Pressable>

            {
                isChangeBloodGroup ?
                <View style={styles.changeContainer}>
                    <SelectList
                        boxStyles={{marginBottom: "5%", borderColor: Constants.DEFAULT_RED, width: "50%"}}
                        placeholder="Blood Group"
                        setSelected={setSelectedBloodGroup} 
                        search={false}
                        data={Constants.bloodGroupData} 
                        onSelect={() => {console.warn("Your blood type is " + selectedBloodGroup);}} 
                    />
                    <Pressable onPress={onPressSaveBloodGroup} style={styles.saveButton}>
                        <Text style={styles.buttonTextStyle}> Save </Text>
                    </Pressable>
                </View>
                :
                null
            }

            <Pressable
                onPress={()=>{setIsChangeLocation(!isChangeLocation)}}
            >
                <View elevation={7} style={styles.fieldContainer}>
                        <Text style={styles.fieldText}>Change Location</Text>
                </View>        
            </Pressable>

            {
                isChangeLocation ?
                <View style={styles.changeContainer}>
                    <SelectList
                        boxStyles={{marginBottom: "5%", borderColor: Constants.DEFAULT_RED, width: "50%"}}
                        placeholder="Location"
                        setSelected={setSelectedLocation} 
                        search={true}
                        data={Constants.LocationData} 
                        onSelect={() => {console.warn(JSON.stringify(selectedLocation))}} 
                    />
                    <Pressable onPress={onPressSaveLocation} style={styles.saveButton}>
                        <Text style={styles.buttonTextStyle}> Save </Text>
                    </Pressable>
                </View>
                :
                null
            }

        </View>
    );
};

export default Profile;