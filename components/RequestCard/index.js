import { 
    View, 
    Image, 
    Text, 
    TouchableOpacity
} 
from "react-native";
import React from "react";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from "./styles";
import * as Constants from "../../constants";


const RequestCard = (props) => {

    const name             = props.name;
    const hospital         = props.hospital;
    const location         = props.location;
    const urgency          = props.urgency;
    const note             = props.note;
    const bloodGroup       = props.bloodGroup;
    const bloodAmount      = props.bloodAmount;
    const requesterContact = props.requesterContact;
    const onPress          = props.onPress;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={ onPress }>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>
                        {name}
                    </Text>
                </View>
                
                <View style={styles.innerContainer}>
                    <View style={styles.detailsContainer}>

                        <View style={styles.detailItemContainer}>
                            <MaterialCommunityIcons 
                                name="hospital-building"
                                size={25}
                                color={Constants.DEFAULT_RED}
                            />
                            <Text style={styles.itemText}>
                                {hospital}
                            </Text>
                        </View>

                        <View style={styles.detailItemContainer}>
                            <MaterialCommunityIcons 
                                name="hospital-building"
                                size={25}
                                color={Constants.DEFAULT_RED}
                            />
                            <Text style={styles.itemText}>
                                {location}
                            </Text>
                        </View>

                        <View style={styles.detailItemContainer}>
                            <MaterialCommunityIcons 
                                name="hospital-building"
                                size={25}
                                color={Constants.DEFAULT_RED}
                            />
                            <Text style={styles.itemText}>
                                {urgency}
                            </Text>
                        </View>

                        <View style={styles.detailItemContainer}>
                            <MaterialCommunityIcons 
                                name="hospital-building"
                                size={25}
                                color={Constants.DEFAULT_RED}
                            />
                            <Text style={styles.itemText}>
                                {note}
                            </Text>
                        </View>

                    </View>


                    <View style={styles.bloodGroupContainer}>
                        <Text style={styles.bloodGroupText}>
                            {bloodGroup}
                        </Text>
                        <Text style={styles.bloodAmountText}>
                            {bloodAmount} bag
                        </Text>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    );
};

export default RequestCard;