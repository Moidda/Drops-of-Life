import { 
    View, 
    Image, 
    Text, 
    SnapshotViewIOSComponent, 
    TouchableOpacity 
} from "react-native";
import React from "react";

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


const HomeScreen = (props) => {
    const logOut = () => {
        clearAll();
        props.navigation.navigate(Constants.RouteName.login);
    };

    const onPressRequest = () => {
        props.navigation.navigate(Constants.RouteName.createRequest);
    };

    const onPressDonate = () => {
        props.navigation.navigate(Constants.RouteName.requestFeed);
    };

    const onPressMyRequests = () => {
        props.navigation.navigate(Constants.RouteName.myRequests);
    };

    return (
        <View style={styles.container}>
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
                onPress={() => {console.warn("Organization")}}
                text="Organization"
                iconName="hospital-o"
                iconSize = {50}
                />
                <HomeScreenIcon
                onPress={() => {console.warn("Long Term")}}
                text="Long Term"
                iconName="bed"
                iconSize = {50}
                />
                <HomeScreenIcon
                onPress={() => {console.warn("Ambulance")}}
                text="Ambulance"
                iconName="ambulance"
                iconSize = {50}
                />
            </View>
            <TouchableOpacity
            onPress={logOut}
            >
                <Icon name="power-off" size={30} color={Constants.DEFAULT_RED} />
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;