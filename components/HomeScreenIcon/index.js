import React from "react";
import { View, Image, Text, Pressable, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Constants from "../../constants";
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreenIcon = (props) => {

    const onPress = props.onPress;
    const text = props.text;
    const iconName = props.iconName;

    return (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <Icon name={iconName} size={50} color="white" />
        <Text style={{fontSize:15, color:"white"}}>{text}</Text>
    </TouchableOpacity>
    );

};

export default HomeScreenIcon;