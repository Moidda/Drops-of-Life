import { 
    View, 
    Image, 
    Text, 
    ScrollView,
    TextInput,
    TouchableOpacity,
    Pressable,
    Alert,
    Modal
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
import { ReactNativeFirebase } from "@react-native-firebase/app";


const getUserData = async (callBack) => {
    try {
        const name = await AsyncStorage.getItem('@name');
        const email = await AsyncStorage.getItem('@email');
        const contact = await AsyncStorage.getItem('@contact');
        const locationJSON = await AsyncStorage.getItem('@location');
        const bloodGroup = await AsyncStorage.getItem('@bloodGroup');
        const location = JSON.parse(locationJSON);
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
    
    const [ modalVisible,   setModalVisible   ] = React.useState(false); 


    const onPressCreateRequest = () => {
        if(name.length === 0) {
            console.warn("Please provide a name");
            return;
        }
        if(!location) {
            console.warn("Please provide a location");
            return;
        }
        if(hospital.length === 0) {
            console.warn("Please provide a hospital name");
            return;
        }
        if(bloodGroup.length === 0) {
            console.warn("Please provide a blood group");
            return;
        }
        if(!bloodAmount) {
            console.warn("Please provide a blood amount");
            return;
        }
        if(urgency.length === 0) {
            console.warn("Please provide an urgency");
            return;
        }

        var today = new Date();

        console.log("");
        console.log("bloodAmount: " + bloodAmount);
        console.log("bloodGroup: " + bloodGroup);
        console.log("today: " + today);
        console.log("hospital: " + hospital);
        console.log("location: " + JSON.stringify(location));
        console.log("name: " + name);
        console.log("note: " + note);
        console.log("requesterContact: " + userContact);
        console.log("requesterEmail: " + userEmail);
        console.log("reqeusterLocation: " + JSON.stringify(userLocation));
        console.log("state: " + Constants.RequestState.pending);
        console.log("urgency: " + urgency);

        const reference = firebase
                        .app()
                        .database(Constants.REALTIME_DATABASE_URL)
                        .ref('/Request')
                        .push()
                        .set({
                            bloodAmount: bloodAmount,
                            bloodGroup: bloodGroup,
                            date: JSON.stringify(today),
                            hospital: hospital,
                            location: location,
                            name: name,
                            note: note,
                            requesterContact: userContact,
                            requesterEmail: userEmail,
                            requesterLocation: userLocation,
                            state: Constants.RequestState.pending,
                            urgency: urgency
                        })
                        .then(()=>{console.log('Data set')});

        setModalVisible(true);    
    };
    
  
    React.useEffect(() => {
        getUserData((name, email, contact, location, bloodGroup) => {
            // set user data from session
            setUserName(name);
            setUserEmail(email);
            setUserContact(contact);
            setUserLocation(location);
            setUserBloodGroup(bloodGroup);
            // prefill form information with user data
            setName(name);
        });
    }, []);

    // rendering the screen
    return (
        <View style={styles.container}>
            <Modal
            animationType="slide"
            visible={modalVisible}
            >
                <View style={styles.container}>
                    <Text style={styles.SuccesstextStyle}>
                        Request Successful!
                    </Text>
                    <Image
                    source={require('../../assets/req-success.png')}
                    />
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => { 
                        setModalVisible(!modalVisible);
                        props.navigation.navigate(Constants.RouteName.home);
                    }}
                    >
                        <Text style={styles.textStyle}>
                            Go Back
                        </Text>
                    </Pressable>
                </View>
            </Modal>
        
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

            <View style={styles.dropDownContainer}>
                <Icon 
                    style={styles.inputImage}
                    name="location-arrow"
                    size={30}
                    color={Constants.DEFAULT_RED}
                />
                <SelectList
                    boxStyles={styles.dropDown}
                    placeholder="Location"
                    setSelected={setLocation} 
                    search={true}
                    data={Constants.LocationData} 
                    onSelect={()=>{}}
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
                    onSelect={()=>{}}
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
                    onSelect={()=>{}}
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
                    <TouchableOpacity onPress={ () => { setUrgency(Constants.urgency.immediate); } }>
                        <View style={styles.radioButton}>
                        {
                            urgency === Constants.urgency.immediate?
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
                    <TouchableOpacity onPress={ () => { setUrgency(Constants.urgency.standBy); } }>
                        <View style={styles.radioButton}>
                        {
                            urgency === Constants.urgency.standBy?
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
                    <TouchableOpacity onPress={ () => { setUrgency(Constants.urgency.longTerm); } }>
                        <View style={styles.radioButton}>
                        {
                            urgency === Constants.urgency.longTerm?
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
            <Text>location: {JSON.stringify(userLocation)}</Text>
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