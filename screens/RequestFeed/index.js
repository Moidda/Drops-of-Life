import { 
    View, 
    Image, 
    Text, 
    ScrollView, 
    FlatList
} from "react-native";
import React from "react";
import { firebase } from '@react-native-firebase/database';

import styles from "./styles";
import * as Constants from "../../constants";
import RequestCard from "../../components/RequestCard";


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
    const [requests, setRequests] = React.useState('');
    const [data, setData] = React.useState('');

    React.useEffect(() => {
        getRequests().then(requests => {
            setRequests(requests);
            for(var reqId in requests) {
                var req = requests[reqId];
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
        });
    }, []);

    return (
        <View>
            <FlatList 
                data={data}
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