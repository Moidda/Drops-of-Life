import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 20
    },
    logoContainer: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        width: 180,
        marginBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    title: {
        fontWeight: 'bold',
        color: Constants.DEFAULT_RED,
        fontSize: 20
    },

    inputContainer: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        width: "95%",
        height: 60,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Constants.DEFAULT_RED,
        borderRadius: 30,
        marginBottom: 15
    },
    inputImage: {
        height: "70%",
        margin: "2%",
        borderRadius: 20,
        overflow: 'hidden'
    },
    input: {
        width: "100%"
    },

    registerNowContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: "10%"
    },
});


export default styles;