import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.LIGHT_GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        width: "90%",
        height: 60,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Constants.DEFAULT_RED,
        borderRadius: 30,
        marginBottom: 15,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    inputImage: {
        marginLeft: "5%",
        marginRight: "3%",
        resizeMode: 'contain'
    },
    input: {
        width: "100%",
        resizeMode: 'contain'
    },

    dropDownContainer: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        width: "90%",
        // height: "20%",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Constants.DEFAULT_RED,
        borderRadius: 30,
        marginBottom: 15,
        marginLeft: 10,
        resizeMode: 'stretch'
    },
    dropDown: {
        borderWidth: 0,
        borderColor: Constants.DEFAULT_RED, 
        width: "60%",
        height: 50,
        backgroundColor: "#ffffff"
    }
});


export default styles;