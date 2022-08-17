import { StyleSheet } from "react-native";
import * as Constants from "../../constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
    },

    radioButtonContainer: {
        flexDirection: 'column',
        backgroundColor: "#fff",
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Constants.DEFAULT_RED,
        borderRadius: 30,
        marginBottom: 15,
        marginLeft: 10,
        resizeMode: 'contain',
        paddingBottom: 10,
        paddingTop: 10
    },

    radioButtonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
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


    // modal styles from react-native doc
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "ffcccc",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        width: 150,
        padding: 10,
        elevation: 2,
        marginTop: "10%"
      },
      buttonOpen: {
        backgroundColor: Constants.DEFAULT_RED,
      },
      buttonClose: {
        backgroundColor: Constants.DEFAULT_RED,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },

      SuccesstextStyle: {
        paddingBottom: 20,
        color: Constants.DEFAULT_RED,
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: 'serif',
        textAlign: "center"
      },
});


export default styles;