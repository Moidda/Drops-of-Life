import { 
    View, 
    Image, 
    Text, 
    SnapshotViewIOSComponent, 
    TouchableOpacity, 
    Pressable
} from "react-native";
import React from "react";

import { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";
import * as Constants from "../../constants";
import HomeScreenIcon from "../../components/HomeScreenIcon";
import Icon from 'react-native-vector-icons/FontAwesome';


const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch(e) {
        console.error(e);
    }
};


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


const HomeScreen = (props) => {

    const [ userName, setUserName ] = React.useState('');
    const [ userEmail, setUserEmail ] = React.useState('');
    const [ userContact, setUserContact ] = React.useState('');
    const [ userLocation, setUserLocation ] = React.useState('');
    const [ userBloodGroup, setUserBloodGroup ] = React.useState('');


    React.useEffect(() => {
        const reloadData = props.navigation.addListener('focus', () => {
            getUserData().then((ret) => {
                console.log("on home screen");
                const [name, email, contact, location, bloodGroup] = ret;
                setUserName(name);
                setUserContact(contact);
                setUserLocation(location);
                setUserBloodGroup(bloodGroup)
                setUserEmail(email);
                setUserEmail(ret[1]);
            });
        });
      
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return reloadData;
    }, [props.navigation]);

    
    const logOut = () => {
        clearAll().then(() => {
            props.navigation.navigate(Constants.RouteName.login);
        });
    };

    const onPressRequest = () => {
        props.navigation.navigate(Constants.RouteName.createRequest);
    };

    const onPressDonate = () => {
        props.navigation.navigate(Constants.RouteName.requestFeed);
    };

    const onPressMyRequests = () => {
        props.navigation.navigate(Constants.RouteName.myRequestsFilter);
    };

    const onPressOrganization = () => {
        props.navigation.navigate(Constants.RouteName.organization);
    };

    const onPressAmbulance = () => {
        props.navigation.navigate(Constants.RouteName.ambulance);
    };

    const onPressProfile = () => {
        props.navigation.navigate(Constants.RouteName.profile);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.profileInfoContainer} onPress={()=>{console.warn("profile")}}>
                <View style={styles.nameLocationContainer}>
                    <View style={styles.nameLocationRowContainer}>
                        <Icon name="user" size={20} color={"#fff"}/>
                        <Text style={styles.nameLocationText}>
                            {userName}
                        </Text>
                    </View>
                    
                    <View style={styles.nameLocationRowContainer}>
                        <Icon name="home" size={25} color={"#fff"}/>
                        <Text style={styles.nameLocationText}>
                            {userLocation.name}
                        </Text>
                    </View>
                </View>

                <Text style={styles.bloodGroupText}>
                    {userBloodGroup}
                </Text>
            </Pressable>

            <View style={styles.iconContainerRow}>
                <HomeScreenIcon 
                onPress={onPressRequest}
                text="Create Request"
                iconName="wpforms"
                iconSize={40}
                />
                <HomeScreenIcon
                onPress={onPressDonate}
                text="Donate"
                iconName="medkit"
                iconSize={50}
                />
                <HomeScreenIcon
                onPress={onPressMyRequests}
                text="My Requests"
                iconName="history"
                iconSize = {50}
                />
            </View>
            <View style={styles.iconContainerRow}>
                <HomeScreenIcon
                onPress={onPressProfile}
                text="Profile"
                iconName="user"
                iconSize = {50}
                />
                <HomeScreenIcon 
                onPress={onPressOrganization}
                text="Organization"
                iconName="hospital-o"
                iconSize = {50}
                />
                <HomeScreenIcon
                onPress={onPressAmbulance}
                text="Ambulance"
                iconName="ambulance"
                iconSize = {50}
                />
            </View>
            <TouchableOpacity
            onPress={logOut}
            >
                <View style={styles.logOutContainer} >
                    <Icon name="power-off" size={30} color={Constants.DEFAULT_RED} />
                    <Text style={styles.logOutText}> Logout </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;