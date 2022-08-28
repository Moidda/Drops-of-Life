import React from "react";
import { 
    View, 
    Image, 
    Text, 
    FlatList, 
    Pressable,
    TextInput,
    Modal,  
} from "react-native";

import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from "./styles";
import * as Constants from "../../constants";


const data = Constants.AmbulanceData;
var filteredData = JSON.parse(JSON.stringify(data));


const Ambulance = (props) => {

    const [searchText, setSearchText] = React.useState('');
    const [callOrgModalVisible, setCallOrgModalVisible] = React.useState(false);
    const [callOrgModalContact, setCallOrgModalContact] = React.useState('');

    const onPressOrg = (org) => {
        setCallOrgModalVisible(true);
        setCallOrgModalContact(org.contact);
    };

    const onChangeText = (text) => {
        setSearchText(text);
        filteredData = [];
        data.forEach(element => {
            const name = element.name.toLowerCase();
            const location = element.location.toLowerCase();
            const contact = element.contact.toLowerCase();
            if(name.includes(text.toLowerCase()) || location.includes(text.toLowerCase()) || contact.includes(text.toLowerCase()))
                filteredData.push(element);
        });
    };

    return (
        <View style={styles.container}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={callOrgModalVisible}
            >
                <Pressable onPress={()=>setCallOrgModalVisible(false)} style={styles.callOrgModal}>
                    <Text style={[styles.detailText, {color: "#fff"}]} >Call {callOrgModalContact} </Text>
                </Pressable>
            </Modal>

            <TextInput 
            style={styles.searchInput}
            value={searchText}
            placeholder="search (name, location or contact)"
            onChangeText={text => onChangeText(text)}
            inlineImageLeft="search_icon.png"
            />

            <FlatList 
            data={filteredData}
            renderItem={({item}) => (
                <View elevation={7} style={styles.organizationContainer}>
                    <Pressable onPress={()=>onPressOrg(item)} style={styles.organizationDetailsContainer}>
                        <View style={styles.detailsRowContainer}>
                            <IconFontAwesome name="hospital-o" size={30} color={Constants.DEFAULT_RED}/>
                            <Text style={styles.detailText}>{item.name}</Text>
                        </View>

                        <View style={styles.detailsRowContainer}>
                            <IconFontAwesome name="location-arrow" size={30} color={Constants.DEFAULT_RED}/>
                            <Text style={styles.detailText}>{item.location}</Text>
                        </View>
                        
                        <View style={styles.detailsRowContainer}>
                            <IconFeather name="phone" size={30} color={Constants.DEFAULT_RED}/>
                            <Text style={styles.detailText}>{item.contact}</Text>
                        </View>
                    </Pressable>
                    <IconFeather name="phone-call" size={30} color={Constants.DEFAULT_RED}/>
                </View>
            )}
            />
        </View>
    );
};

export default Ambulance;