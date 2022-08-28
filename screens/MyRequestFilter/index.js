import React from "react";
import { View, Image, Text, TouchableOpacity, Pressable } from "react-native";
import styles from "./styles";
import * as Constants from "../../constants";

const MyRequestFilter = (props) => {
    return (
        <View style={styles.container}>
            
            <Pressable onPress={() => {props.navigation.navigate(Constants.RouteName.myRequests);}}>
                <View elevation={5} style={styles.buttonContainer}>
                    <Text style={styles.text}>
                        Pending
                    </Text>
                </View>
            </Pressable>

            <Pressable onPress={() => {props.navigation.navigate(Constants.RouteName.myRequestsCompleted);}} >
                <View elevation={5} style={[styles.buttonContainer, {backgroundColor: "#49d408"}]}>
                    <Text style={styles.text}>
                        Completed
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default MyRequestFilter;