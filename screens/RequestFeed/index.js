import { 
    View, 
    Image, 
    Text, 
    ScrollView, 
    FlatList,
    TouchableOpacity
} from "react-native";
import React from "react";
import { firebase } from '@react-native-firebase/database';

import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from "./styles";
import * as Constants from "../../constants";
import RequestCard from "../../components/RequestCard";
import { BaseRouter } from "@react-navigation/native";


const getRequests = async () => {
    var snapshot = await firebase
                    .app()
                    .database(Constants.REALTIME_DATABASE_URL)
                    .ref('/Request')
                    .once('value');

    const requests = snapshot.val();
    return requests;
};


const RequestFeed = (props) => {
    
    var tempData = [];
    const [ requests,   setRequests    ] = React.useState('');
    const [ data,       setData        ] = React.useState('');
    const [ filterData, setFilterData  ] = React.useState('');
    const [ urgency,    setUrgency     ] = React.useState('');


    React.useEffect(() => {
        getRequests().then(requests => {
            setRequests(requests);
            for(var reqId in requests) {
                var req = requests[reqId];
                // if(req['urgency'] === 'standBy')
                    tempData.push({
                        key                 : reqId,
                        name                : req['name'],
                        hospital            : req['hospital'],
                        location            : req['location'],
                        urgency             : req['urgency'],
                        note                : req['note'],
                        bloodGroup          : req['bloodGroup'],
                        bloodAmount         : req['bloodAmount'],
                        requesterContact    : req['requesterContact'],
                    });
            }
            setData(tempData);
            setFilterData(tempData);
        });
    }, []);

    const onPressUrgency = (filterUrgency) => {
        if(urgency === filterUrgency) {
            setUrgency('none');
            setFilterData(data);
        }
        else {
            setUrgency(filterUrgency);
            var tempData = [];
            data.forEach(element => {
                if(element.urgency === filterUrgency) {
                    tempData.push(element);
                }
            });
            setFilterData(tempData);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <AntIcon
                    name="bars"
                    size={20}
                    color={Constants.DEFAULT_RED}
                />
                <Text style={styles.filtertextStyle}>
                    Filter By
                </Text>
            </View>    

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
            
            <FlatList 
                data={filterData}
                renderItem={ ({item}) => (
                    <RequestCard 
                        name             = { item.name             }
                        hospital         = { item.hospital         }
                        location         = { item.location         }
                        urgency          = { item.urgency          }
                        note             = { item.note             }
                        bloodGroup       = { item.bloodGroup       }
                        bloodAmount      = { item.bloodAmount      }
                        requesterContact = { item.requesterContact }
                        onPress          = { () => {
                            console.warn('Call: ' + item.requesterContact);
                        }}
                    />
                )}
            />
        </View>
    );
};

export default RequestFeed;