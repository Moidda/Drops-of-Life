import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        margin: "6%",
        paddingBottom: "2%",
        backgroundColor: Constants.LIGHT_GREY,
    },

    nameContainer: {
        backgroundColor: Constants.DEFAULT_RED,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "2%"
    },

    nameText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },

    innerContainer: {
        flexDirection: 'row',
    },

    detailsContainer: {
        paddingLeft: "3%",
    },

    detailItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },

    itemText: {
        marginLeft: 2,
        fontSize: 15
    },

    bloodGroupContainer: {
        alignSelf: 'center',
        marginLeft: '83%',
        position: 'absolute',
        justifyContent: 'center'
    },

    bloodGroupText: {
        color: Constants.DEFAULT_RED,
        fontWeight: '700',
        fontSize: 23,
    },

    bloodAmountText: {
        color: Constants.DEFAULT_RED,
        fontWeight: '700',
        fontSize: 18
    }
});


export default styles;