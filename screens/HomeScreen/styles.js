import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        // justifyContent: 'center'
    },
    profileInfoContainer: {
        flexDirection: 'row',
        width: "95%",
        height: "15%",
        backgroundColor: Constants.DEFAULT_RED,
        marginTop: 20,
        marginBottom: 100,
        borderRadius: 20,
    },
    nameLocationContainer: {
        padding: 10,
        justifyContent: 'center'
    },
    nameLocationRowContainer: {
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: 5
    },
    nameLocationText: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'sans-serif-medium',
        color: "#fff",
        margin: 5,
        marginLeft: 10,
    },
    bloodGroupText: {
        alignSelf: 'center',
        marginLeft: 100,
        color: "#fff",
        fontSize: 25,
        fontWeight: 'bold'
    },
    iconContainerRow: {
        flexDirection: 'row',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    logOutContainer: {
        marginTop: 100,
        flexDirection: 'row', 
        alignItems: 'center'
    },
    logOutText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        color: Constants.DEFAULT_RED
    }
});


export default styles;