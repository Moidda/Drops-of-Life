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

    return (
        <View style={styles.container}>
            <Text style={styles.Textstyle}>
                Contact 
            </Text>
            <Text style={[styles.Textstyle, {color: "#33bbff"}]}>
                {contactno}
            </Text>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, {backgroundColor: "#00cc99"}]}
                    onPress={() => { 
                        console.warn("Number copied to clipboard.")
                    }}
                    >
                        <Text style={[styles.ButtonText, {color: "#ffffff"}]}>
                            Call 
                        </Text>
                </Pressable>

                <Pressable
                    style={ [styles.button] }
                    onPress={ onPressCancel }
                    >
                        <Text style={[styles.ButtonText, {color: "#ffffff"}]}>
                            Cancel
                        </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Contact;