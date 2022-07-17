import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    imageContainer: {
        position: 'absolute',
        top: 100
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#cf5102'
    },
    buttonContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 50
    }
});


export default styles;