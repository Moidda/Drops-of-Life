import { 
    View, 
    Image, 
    Text, 
    ScrollView, 
    FlatList,
    TouchableOpacity,
    Modal,
    Pressable
} from "react-native";

import React from "react";
import { firebase } from '@react-native-firebase/database';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SelectList from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles";
import * as Constants from "../../constants";
import RequestCard from "../../components/RequestCard";
import Contact from "../../components/Contact";
import { BaseRouter } from "@react-navigation/native";


var bloodGroupData = JSON.parse(JSON.stringify(Constants.bloodGroupData))
bloodGroupData.unshift({key:'All', value: 'All'});

var locationData = JSON.parse(JSON.stringify(Constants.LocationData));
locationData.unshift(
    {
        key: { name: "near", latitude: 0, longitude: 0 },
        value: "Near me" 
    }
);
locationData.unshift(
    {
        key: { name: "All", latitude: 0, longitude: 0 },
        value: "All" 
    }
);


const getRequests = async () => {
    var snapshot = await firebase
                    .app()
                    .database(Constants.REALTIME_DATABASE_URL)
                    .ref('/Request')
                    .once('value');

    const requests = snapshot.val();
    return requests;
};


const getUserData = async (callBack) => {
    try {
        const name = await AsyncStorage.getItem('@name');
        const email = await AsyncStorage.getItem('@email');
        const contact = await AsyncStorage.getItem('@contact');
        const locationJSON = await AsyncStorage.getItem('@location');
        const location = JSON.parse(locationJSON);
        const bloodGroup = await AsyncStorage.getItem('@bloodGroup');
        callBack(name, email, contact, location, bloodGroup);  
    } 
    catch(e) {
        console.error(e);
    }
}


const RequestFeed = (props) => {
    
    const [ requests,   setRequests    ] = React.useState('');
    const [ data,       setData        ] = React.useState('');

    const [ modalVisible, setModalVisible ] = React.useState(false);
    const [ modalContact, setModalContact ] = React.useState('');

    // filter states
    const [ filterData,       setFilterData       ] = React.useState('');
    const [ isFilterOn,       setIsFilterOn       ] = React.useState(false);
    const [ filterBloodGroup, setFilterBloodGroup ] = React.useState('');
    const [ filterLocation,   setFilterLocation   ] = React.useState('');
    const [ urgency,          setUrgency          ] = React.useState('none');

    // user states from session
    const [ userName, setUserName ] = React.useState('');
    const [ userEmail, setUserEmail ] = React.useState('');
    const [ userContact, setUserContact ] = React.useState('');
    const [ userLocation, setUserLocation ] = React.useState('');
    const [ userBloodGroup, setUserBloodGroup ] = React.useState('');


    // fill up data with all the requests from database 
    // and user data from session only once when the screen loads
    React.useEffect(() => {
        getRequests().then(requests => {
            setRequests(requests);
            var tempData = [];
            for(var reqId in requests) {
                var req = requests[reqId];
                    tempData.push({
                        key                 : reqId,
                        bloodAmount         : req['bloodAmount'],
                        bloodGroup          : req['bloodGroup'],
                        date                : req['date'],
                        hospital            : req['hospital'],
                        location            : req['location'],
                        name                : req['name'],
                        note                : req['note'],
                        requesterContact    : req['requesterContact'],
                        requesterEmail      : req['requesterEmail'],
                        requesterLocation   : req['requesterLocation'],
                        state               : req['state'],
                        urgency             : req['urgency'],
                    });
            }
            setData(tempData);
            setFilterData(tempData);
        });

        // set user data from session
        getUserData((name, email, contact, location, bloodGroup) => {
            setUserName(name);
            setUserEmail(email);
            setUserContact(contact);
            setUserLocation(location);
            setUserBloodGroup(bloodGroup);
        });
    }, []);


    const onFilter = (filterUrgency) => {
        var tempData = [];
        data.forEach(element => {
            // assume this element isSelected if filters are applied. Then check if assumption is false
            var isSelected = true;
            // some bloodGroup filter is applied and that filter is not 'All' and this element's bloodGroup doesn't match filter
            if(filterBloodGroup && filterBloodGroup !== 'All' && filterBloodGroup !== element.bloodGroup) 
                isSelected = false;

            // some location filter is applied and that filter is 'near me'
            if(filterLocation && filterLocation.name === 'near') {
                const lat1 = userLocation.latitude;
                const lon1 = userLocation.longitude;
                const lat2 = element.location.latitude;
                const lon2 = element.location.longitude;
                const R        = 6371e3; // metres
                const phi1     = lat1 * Math.PI/180; // φ, λ in radians
                const phi2     = lat2 * Math.PI/180;
                const delPhi   = (lat2-lat1) * Math.PI/180;
                const delLamda = (lon2-lon1) * Math.PI/180;
                const a        = Math.sin(delPhi/2)   * Math.sin(delPhi/2) +
                                 Math.cos(phi1)       * Math.cos(phi2) *
                                 Math.sin(delLamda/2) * Math.sin(delLamda/2);
                
                                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                const d = R * c; // distance in meters
                
                if(d > Constants.nearMeDistance) 
                    isSelected = false;
            }
            // some filter is appiled on location and that location is not 'All' and this element's location does not match filter
            else if(filterLocation && filterLocation.name !== 'All' && filterLocation.name !== element.location.name) 
                isSelected = false;
            
            // some filter is applied on urgency and that urgency is not 'none' and this element's urgency does not match filter
            if(filterUrgency && filterUrgency !== 'none' && filterUrgency !== element.urgency) 
                isSelected = false;
            
            if(isSelected) 
                tempData.push(element);
        });
        setFilterData(tempData);
    };


    const onPressUrgency = (filterUrgency) => {
        if(urgency === filterUrgency) {
            setUrgency('none');
            onFilter('none');
        }
        else {
            setUrgency(filterUrgency);
            onFilter(filterUrgency);
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{ setIsFilterOn(!isFilterOn) }}>
                <View style={styles.filterContainer}>
                    <AntIcon
                        name="bars"
                        size={20}
                        color={Constants.DEFAULT_RED}
                    />
                    <Text style={styles.filtertextStyle}>
                        Filter By
                    </Text>
                    {
                        isFilterOn ?
                        <AntIcon 
                            name="caretup" 
                            size={20} 
                            color={Constants.DEFAULT_RED}
                            style={{marginLeft: '4%', marginRight: '60%'}}
                        />
                        :
                        <AntIcon 
                            name="caretdown" 
                            size={20} 
                            color={Constants.DEFAULT_RED}
                            style={{marginLeft: '4%', marginRight: '60%'}}
                        />
                    }
                </View>
            </TouchableOpacity>

            {
                isFilterOn ?
                <View style={styles.filterByContainer}>
                    <View style={styles.radioButtonContainer}>
                        <View style={styles.radioButtonHeader}>
                            <TouchableOpacity onPress={ (urgency) => onPressUrgency(Constants.urgency.immediate) }>
                                <View style={styles.radioButton}>
                                {
                                    urgency === "immediate"?
                                    <View style={styles.radioButtonSelected} />
                                    : null
                                }
                                </View>
                            </TouchableOpacity>    

                            <Text style={styles.urgencyTextStyle} >
                                Immediate
                            </Text>
                        </View>

                        <View style={styles.radioButtonHeader}>
                            <TouchableOpacity onPress={ (urgency) => onPressUrgency(Constants.urgency.standBy) }>
                                <View style={styles.radioButton}>
                                {
                                    urgency === "standBy"?
                                    <View style={styles.radioButtonSelected}/> 
                                    : null
                                }
                                </View>
                            </TouchableOpacity>    

                            <Text style={styles.urgencyTextStyle} >
                                StandBy
                            </Text>
                        </View>

                        <View style={styles.radioButtonHeader}>
                            <TouchableOpacity onPress={ (urgency) => onPressUrgency(Constants.urgency.longTerm) }>
                                <View style={styles.radioButton}>
                                {
                                    urgency === "longTerm"?
                                    <View style={styles.radioButtonSelected} />
                                    : null
                                }
                                </View>
                            </TouchableOpacity>    
                            
                            <Text style={styles.urgencyTextStyle}>
                                Long Term
                            </Text>
                        </View>    
                    </View>
                    
                    <View style={{flexDirection:'row'}}>
                        <SelectList 
                        boxStyles={styles.filterByBloodGroup}
                        placeholder="Blood Group"
                        setSelected={setFilterBloodGroup}
                        search={false}
                        data={bloodGroupData}
                        onSelect={ (bloodGroup) => {onFilter(urgency);} }
                        />

                        <SelectList 
                        boxStyles={styles.filterByLocation}
                        placeholder="Location"
                        setSelected={setFilterLocation}
                        search={true}
                        data={locationData}
                        onSelect={ (location) => {onFilter(urgency);} }
                        />
                    </View>
                </View>
                :
                null
            }

            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
            >   
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Contact 
                    contactno={modalContact} 
                    onPressCancel={ () => { setModalVisible(false) }}
                    />
                </View>
            </Modal>
           
            
            <FlatList 
                data={filterData}
                renderItem={ ({item}) => (
                    <RequestCard 
                        name             = { item.name             }
                        hospital         = { item.hospital         }
                        location         = { item.location.name    }
                        urgency          = { item.urgency          }
                        note             = { item.note             }
                        bloodGroup       = { item.bloodGroup       }
                        bloodAmount      = { item.bloodAmount      }
                        requesterContact = { item.requesterContact }
                        onPress          = { () => {
                            setModalVisible(true); 
                            setModalContact(item.requesterContact);
                        }}
                    />
                )}
            />
        </View>
    );
};

export default RequestFeed;