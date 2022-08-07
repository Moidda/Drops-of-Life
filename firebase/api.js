import { firebase } from '@react-native-firebase/database';
import * as Constants from '../constants';


export const getUser = async (usersList) => {
    var snapshot = await firebase
                            .app()
                            .database(Constants.REALTIME_DATABASE_URL)
                            .ref('/User')
                            .once();
    
    const users = snapshot.val();
    for(const u in users) 
        usersList.push(u);       
};
