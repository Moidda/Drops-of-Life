import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    callOrgModal: {
        width: 200,
        height: 150,
        backgroundColor: Constants.DEFAULT_RED,
        borderWidth: 1,
        borderColor: Constants.LIGHT_GREY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: "60%"
    },
    searchInput: {
        height: 40,
        width: 370,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: Constants.DEFAULT_RED,
        borderRadius: 10
    },
    organizationContainer: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        width: 370,
        padding: 20,
        margin: 10,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Constants.DEFAULT_RED
    },
    organizationDetailsContainer: {
        width: "80%",
        marginRight: "10%"
    },
    detailsRowContainer: {
        flexDirection: 'row',
        margin: 5
    },
    detailText: {
        fontSize: 18,
        fontFamily: 'sans-serif-medium',
        color: Constants.DEFAULT_RED,
        marginLeft: 5,
    }
});


export default styles;