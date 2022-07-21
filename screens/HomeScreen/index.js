import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import * as Constants from "../../constants";

import HomeScreenIcon from "../../components/HomeScreenIcon";


const HomeScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainerRow}>
                <HomeScreenIcon 
                onPress={() => {console.warn("Request")}}
                text="Request"
                iconName="wpforms"
                />
                <HomeScreenIcon
                onPress={() => {console.warn("Donate")}}
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
        </View>
    );
};

export default HomeScreen;