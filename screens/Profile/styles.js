import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    fieldContainer: {
        backgroundColor: "#fff",
        width: 370,       
        padding: 20,
        margin: 10,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Constants.DEFAULT_RED
    },

    fieldText: {
        fontSize: 18,
        fontFamily: 'sans-serif-medium',
        color: Constants.DEFAULT_RED,
        marginLeft: 5,
    },

    inputField: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: Constants.DEFAULT_RED,
        borderRadius: 10
    },

    saveButton: {
        borderRadius: 20,
        width: 100,
        padding: 10,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Constants.DEFAULT_GREEN
    },

    changeContainer: {
        backgroundColor: "#fff",
        width: 370,       
        padding: 20,
        margin: 10,
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Constants.DEFAULT_GREEN   
    },

    buttonTextStyle: {
        fontSize: 17,
        fontFamily: "sans-serif",
        color: "#ffffff"
    }
});


export default styles;