import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },  
    
    radioButtonContainer: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        width: "90%",
        borderWidth: 1,
        borderColor: Constants.DEFAULT_RED,
        borderRadius: 30,
        marginBottom: 10,
        marginLeft: 10,
        resizeMode: 'contain',
        paddingBottom: 10,
        paddingTop: 10
    },

    radioButtonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 5
    },

    radioButton: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Constants.DEFAULT_RED,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    radioButtonSelected: {
        width: 10,
        height: 10,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: Constants.DEFAULT_RED,
    },

    urgencyTextStyle: {
        marginLeft: 5
    },

    filtertextStyle: {
        color: Constants.DEFAULT_RED,
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 5
      },

    filterContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        flexDirection: "row"
    }  
});


export default styles;