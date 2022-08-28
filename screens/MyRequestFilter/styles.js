import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 60,
        margin: 10,
        backgroundColor: Constants.DEFAULT_RED,
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 1.0
    },

    text: {
        color: "#fff",
        fontSize: 20,
        fontFamily: 'sans-serif-medium'
    }
});


export default styles;