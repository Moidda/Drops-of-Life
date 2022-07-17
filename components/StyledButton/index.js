import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

const StyledButton = (props) => {

    const color = props.color;
    const textColor = props.textColor;
    const text = props.text;
    const onPress = props.onPress;

    return (
        <View style={styles.container}>
            <Pressable
                style={[
                    styles.button,
                    {backgroundColor: color}
                ]} 
                onPress={() => onPress()}
            >

            <Text style={[
                styles.text,
                {color: textColor}
            ]}
            >
            {text}
            </Text>

            </Pressable>
        </View>
    );
};


export default StyledButton;