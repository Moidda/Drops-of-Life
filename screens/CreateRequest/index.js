import { 
    View, 
    Image, 
    Text, 
    ScrollView,
    TextInput,
    TouchableOpacity
} from "react-native";

import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectList from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from "@react-native-firebase/database";

import styles from "./styles";
import * as Constants from "../../constants";
import StyledButton from "../../components/StyledButton";


const getUserData = async (callBack) => {
    try {
        const name = await AsyncStorage.getItem('@name');
        const email = await AsyncStorage.getItem('@email');
        const contact = await AsyncStorage.getItem('@contact');
        const location = await AsyncStorage.getItem('@location');
        const bloodGroup = await AsyncStorage.getItem('@bloodGroup');
        callBack(name, email, contact, location, bloodGroup);  
    } 
    catch(e) {
        console.error(e);
    }
}

const CreateRequest = (props) => {

    // request data from request form
    const [ name,        setName        ] = React.useState('');
    const [ location,    setLocation    ] = React.useState('');
    const [ hospital,    setHospital    ] = React.useState('');
    const [ bloodGroup,  setBloodGroup  ] = React.useState('');
    const [ bloodAmount, setBloodAmount ] = React.useState('');
    const [ urgency,     setUrgency     ] = React.useState('');
    const [ note,        setNote        ] = React.useState('');
    // user data from session
    const [ userName,       setUserName       ] = React.useState('');
    const [ userContact,    setUserContact    ] = React.useState('');
    const [ userEmail,      setUserEmail      ] = React.useState('');
    const [ userLocation,   setUserLocation   ] = React.useState('');
    const [ userBloodGroup, setUserBloodGroup ] = React.useState(''); 

    const onPressCreateRequest = () => {
        if(name.length == 0) setName(userName);
        if(location.length == 0) setLocation(userLocation);

        console.log("name: " + name);
        console.log("location: " + location);
        console.log("hospital: " + hospital);
        console.log("bloodGroup: " + bloodGroup);
        console.log("bloodAmount: " + bloodAmount);
        console.log("urgency: " + urgency);
        console.log("note: " + note);

        const reference = firebase
                        .app()
                        .database(Constants.REALTIME_DATABASE_URL)
                        .ref('/Request')
                        .push()
                        .set({
                            bloodAmount: bloodAmount,
                            bloodGroup: bloodGroup,
                            hospital: hospital,
                            location: location,
                            name: name,
                            note: note,
                            requesterContact: userContact,
                            requesterEmail: userEmail,
                            urgency: urgency
                        })
                        .then(()=>{console.log('Data set')});

        props.navigation.navigate(Constants.RouteName.home);
    };
    
  
    getUserData((name, email, contact, location, bloodGroup) => {
        setUserName(name);
        setUserEmail(email);
        setUserContact(contact);
        setUserLocation(location);
        setUserBloodGroup(bloodGroup);
    });

    // rendering the screen
    return (
<View style={styles.container}>
    <ScrollView>
        <View style={[styles.inputContainer, {marginTop: 15}]}>
            <Icon 
                style={styles.inputImage}
                name="user"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                style={styles.input}
                secureTextEntry={false}
                placeholder="Name"
                onChangeText={inputName => setName(inputName)}
                defaultValue={userName}
            />
        </View>

        <View style={styles.inputContainer}>
            <Icon 
                style={styles.inputImage}
                name="location-arrow"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                style={styles.input}
                secureTextEntry={false}
                placeholder="Location"
                onChangeText={inputLocation => setLocation(inputLocation)}
                defaultValue={userLocation}
            />
        </View>

        <View style={styles.inputContainer}>
            <Icon 
                style={styles.inputImage}
                name="hospital-o"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                style={styles.input}
                secureTextEntry={false}
                placeholder="Hospital"
                onChangeText={inputHospital => setHospital(inputHospital)}
            />
        </View>

        <View style={styles.dropDownContainer}>
            <Icon 
                style={[styles.inputImage, {marginLeft: 25}]}
                name="tint"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <SelectList
                boxStyles={styles.dropDown}
                placeholder="Blood Group"
                setSelected={setBloodGroup} 
                search={false}
                data={Constants.bloodGroupData} 
                onSelect={() => {console.warn("Your blood type is " + bloodGroup);}} 
            />
        </View>

        <View style={styles.dropDownContainer}>
            <MaterialIcon 
                style={styles.inputImage}
                name="iv-bag"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <SelectList
                boxStyles={styles.dropDown}
                placeholder="Amount of blood"
                setSelected={setBloodAmount} 
                search={false}
                data={Constants.bloodAmountData} 
                onSelect={() => {console.warn("You need " + bloodAmount);}} 
            />
        </View>

        <View style={styles.radioButtonContainer}>
            <View style={styles.radioButtonHeader}>
                <Icon 
                    style={[styles.inputImage, {marginLeft: 30}]}
                    name="exclamation"
                    size={30}
                    color={Constants.DEFAULT_RED}
                />

                <Text style={{width:"90%"}}>
                    Urgency
                </Text>
            </View>

            <View style={styles.radioButtonHeader}>
                <TouchableOpacity onPress={ () => { setUrgency("immediate"); } }>
                    <View style={styles.radioButton}>
                    {
                        urgency === "immediate"?
                        <View style={styles.radioButtonSelected} />
                        : null
                    }
                    </View>
                </TouchableOpacity>    

                <Text style={{width:"90%", marginLeft: 5}} >
                    Immediate
                </Text>
            </View>

            <View style={styles.radioButtonHeader}>
                <TouchableOpacity onPress={ () => { setUrgency("standBy"); } }>
                    <View style={styles.radioButton}>
                    {
                        urgency === "standBy"?
                        <View style={styles.radioButtonSelected}/> 
                        : null
                    }
                    </View>
                </TouchableOpacity>    

                <Text style={{width:"90%", marginLeft: 5}} >
                    StandBy
                </Text>
            </View>

            <View style={styles.radioButtonHeader}>
                <TouchableOpacity onPress={ () => { setUrgency("longTerm"); } }>
                    <View style={styles.radioButton}>
                    {
                        urgency === "longTerm"?
                        <View style={styles.radioButtonSelected} />
                        : null
                    }
                    </View>
                </TouchableOpacity>    
                
                <Text style={{width:"90%", marginLeft: 5}} >
                    Long Term
                </Text>
            </View>
            
        </View>

        <View style={styles.inputContainer}>
            <Icon 
                style={styles.inputImage}
                name="file-text-o"
                size={30}
                color={Constants.DEFAULT_RED}
            />
            <TextInput 
                style={styles.input}
                secureTextEntry={false}
                placeholder="note"
                onChangeText={inputNote => setNote(inputNote)}
            />
        </View>
        
        <Text>User Data from session:</Text>
        <Text>name: {userName}</Text>
        <Text>email: {userEmail}</Text>
        <Text>contact: {userContact}</Text>
        <Text>location: {userLocation}</Text>
        <Text>bloodGroup: {userBloodGroup}</Text>

        <StyledButton 
            color={Constants.DEFAULT_RED}
            textColor="#ffffff"
            text="Create Request"
            onPress={onPressCreateRequest}
        />
    </ScrollView>
</View>
    );
};

export default CreateRequest;






{/* <View style={styles.dropDownContainer}>
    <Icon 
        style={[styles.inputImage, {marginLeft: 30}]}
        name="exclamation"
        size={30}
        color={Constants.DEFAULT_RED}
    />
    <SelectList
        boxStyles={styles.dropDown}
        placeholder="Urgency"
        setSelected={setUrgency} 
        search={false}
        data={Constants.urgency.urgencyData} 
        onSelect={() => {console.warn("Urgency: " + urgency);}} 
    />
</View> */}