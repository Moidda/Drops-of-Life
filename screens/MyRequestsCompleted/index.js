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
            if(sortedArr[j+1].date > sortedArr[j].date) {
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


const MyRequestsCompleted = (props) => {
    
    const [ requests,   setRequests    ] = React.useState('');
    const [ data,       setData        ] = React.useState('');
    // filter states
    const [ filterData,       setFilterData       ] = React.useState('');
    // user states from session
    const [ userName, setUserName ] = React.useState('');
    const [ userEmail, setUserEmail ] = React.useState('');
    const [ userContact, setUserContact ] = React.useState('');
    const [ userLocation, setUserLocation ] = React.useState('');
    const [ userBloodGroup, setUserBloodGroup ] = React.useState('');


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
                    if(req['state'] !== Constants.RequestState.donated) 
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


    return (
        <View style={styles.container}>
            <FlatList 
                data={filterData}
                renderItem={ ({item}) => (
                    <RequestCard 
                        name             = { parseDate(item.date)  }
                        hospital         = { item.hospital         }
                        location         = { item.location.name    }
                        urgency          = { item.urgency          }
                        note             = { item.note             }
                        bloodGroup       = { item.bloodGroup       }
                        bloodAmount      = { item.bloodAmount      }
                        requesterContact = { item.requesterContact }
                        onPress          = { () => {}              }
                    />
                )}
            />
        </View>
    );
};

export default MyRequestsCompleted;