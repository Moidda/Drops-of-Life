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
        props.navigation.navigate(Constants.RouteName.requestFeed)
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainerRow}>
                <HomeScreenIcon 
                onPress={onPressRequest}
                text="Request"
                iconName="wpforms"
                />
                <HomeScreenIcon
                onPress={onPressDonate}
                text="Donate"
                iconName="medkit"
                />
                <HomeScreenIcon
                onPress={() => {console.warn("History")}}
                text="History"
                iconName="history"
                />
            </View>
            <View style={styles.iconContainerRow}>
                <HomeScreenIcon 
                onPress={() => {console.warn("Organization")}}
                text="Organization"
                iconName="hospital-o"
                />
                <HomeScreenIcon
                onPress={() => {console.warn("Long Term")}}
                text="Long Term"
                iconName="bed"
                />
                <HomeScreenIcon
                onPress={() => {console.warn("Ambulance")}}
                text="Ambulance"
                iconName="ambulance"
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