import React from "react";
import { View, Image, Text, Pressable, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Constants from "../../constants";
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreenIcon = (props) => {

    const onPress = props.onPress;
    const text = props.text;

    return (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <Icon name="wpforms" size={50} color={Constants.DEFAULT_RED} />
        <Text style={{fontSize: 15, color: Constants.DEFAULT_RED}}>{text}</Text>
    </TouchableOpacity>
    );

};

export default HomeScreenIcon;