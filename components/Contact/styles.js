import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 200,
        margin: "6%",
        paddingBottom: "2%",
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "50%",
        marginLeft: 33,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Constants.DEFAULT_RED
    },

    Textstyle: {
        fontSize: 24,
        fontFamily: 'sans-serif-medium',
        marginBottom: 5
    },


    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },

    button: {
        borderRadius: 20,
        width: 150,
        padding: 10,
        elevation: 2,
        marginTop: 25,
        margin: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Constants.DEFAULT_RED
      },  


    ButtonText: {
        fontSize: 20,
        fontFamily: 'sans-serif'
    }, 

});


export default styles;