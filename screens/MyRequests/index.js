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
import { parse } from "@babel/core";


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


const sortByTime = (arr) => {
    var sortedArr = JSON.parse(JSON.stringify(arr));
    for(var i = 0; i < sortedArr.length; i++) {
        for(var j = 0; j+1 < sortedArr.length; j++) {
            if(sortedArr[j+1].date < sortedArr[j].date) {
                var temp = sortedArr[j];
                sortedArr[j] = sortedArr[j+1];
                sortedArr[j+1] = temp;
            }
        }
    }
    return sortedArr;
};

const parseDate = (bullshitdate) => {
    // 2022-08-28T11:47:19.662Z
    var yearMonthDate = JSON.stringify(bullshitdate).substring(1, 11);
    return yearMonthDate;
};


const getRequests = async () => {
    var snapshot = await firebase
                    .app()
                    .database(Constants.REALTIME_DATABASE_URL)
                    .ref('/Request')
                    .once('value');

    const requests = snapshot.val();
    return requests;
};

const updateRequestState = async (requestIdToUpdate) => {
    var snapshot = await firebase
                    .app()
                    .database(Constants.REALTIME_DATABASE_URL)
                    .ref('/Request/' + requestIdToUpdate)
                    .update({
                        state: Constants.RequestState.donated
                    })
                    .then(() => { console.warn("State updated"); });
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
        return contact;
    } 
    catch(e) {
        console.error(e);
    }
}


const MyRequests = (props) => {
    
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

    const [ requestIdToUpdate, setRequestIdToUpdate ] = React.useState('');


    // this function is executed only once when the screen is loaded for the first time
    React.useEffect(() => {
        // get user data from the current session
        getUserData((name, email, contact, location, bloodGroup) => {
            setUserName(name);
            setUserEmail(email);
            setUserContact(contact);
            setUserLocation(location);
            setUserBloodGroup(bloodGroup);
        })
        .then((userContact) => {
            getRequests().then(requests => {
                setRequests(requests);
                var tempData = [];
                for(var reqId in requests) {
                    var req = requests[reqId];
                    if(req['state'] === Constants.RequestState.donated) 
                        continue;
    
                    if(req['requesterContact'] !== userContact) 
                        continue;
                        
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
                // sorting each of the data
                // immediate -> stand by -> longterm
                // each urgency should be sorted by oldest request first
                var immediateData = [], standByData = [], longTermData = [];
                tempData.forEach(element => {
                    if(element.urgency === Constants.urgency.immediate) immediateData.push(element);
                    if(element.urgency === Constants.urgency.standBy)   standByData.push(element);
                    if(element.urgency === Constants.urgency.longTerm)  longTermData.push(element);
                });
                immediateData = sortByTime(immediateData);
                standByData = sortByTime(standByData);            
                longTermData = sortByTime(longTermData);
                var sortedData = immediateData.concat(standByData).concat(longTermData);
                setData(sortedData);
                setFilterData(sortedData);
            });
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


    const onPressDonorFound = () => {
        console.warn("inside onPressDonorFound");
        updateRequestState(requestIdToUpdate).then(() => {
            console.warn("updateRequestState has been executed");
            setModalVisible(false);
        });
    };


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
            >   
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Contact 
                    leftButtonText="YES"
                    onPressLeftButton={onPressDonorFound}
                    contactno={modalContact} 
                    rightButtonText="NO"
                    onPressCancel={ () => { setModalVisible(false) }}
                    titleText="Donor Found ?"
                    isDonorFound={true}
                    />
                </View>
            </Modal>
           
            
            <FlatList 
                data={filterData}
                renderItem={ ({item}) => (
                    <RequestCard 
                        name             = { parseDate(item.date)   }
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
                            setRequestIdToUpdate(item.key);
                        }}
                    />
                )}
            />
        </View>
    );
};

export default MyRequests;