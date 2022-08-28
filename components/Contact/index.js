import React from "react";
import { 
    View, 
    Image, 
    Text, 
    Pressable
} 
from "react-native";

import styles from "./styles";
import * as Constants from "../../constants";
import StyledButton from "../StyledButton";

const Contact = (props) => {

    const contactno = props.contactno;
    const onPressCancel = props.onPressCancel;
    const leftButtonText = props.leftButtonText;
    const rightButtonText = props.rightButtonText;
    const onPressLeftButton = props.onPressLeftButton;
    const titleText = props.titleText;
    const isDonorFound = props.isDonorFound;

    return (
        <View style={styles.container}>
            <Text style={styles.Textstyle}>
                {titleText}
            </Text>
            {
                isDonorFound ?
                null
                :
                <Text style={[styles.Textstyle, {color: "#33bbff"}]}>
                    {contactno}
                </Text>
            }

            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, {backgroundColor: "#00cc99"}]}
                    onPress={ onPressLeftButton }
                    >
                        <Text style={[styles.ButtonText, {color: "#ffffff"}]}>
                            {leftButtonText} 
                        </Text>
                </Pressable>

                <Pressable
                    style={ [styles.button] }
                    onPress={ onPressCancel }
                    >
                        <Text style={[styles.ButtonText, {color: "#ffffff"}]}>
                            {rightButtonText}
                        </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Contact;