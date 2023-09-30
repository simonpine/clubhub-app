import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    err: {
        fontFamily: "Geologica-Thin",
        color: 'rgba(241, 128, 128, 0.7882352941)',
        fontSize: 15,
        marginBottom: 10,
        marginTop: -20,
        height: 30,
    },
    isLoading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 1000,
        alignContent: 'center',
        justifyContent: 'center',
    },
    all2: {
        width: '90%',
        left: '5%',
        marginTop: '50%'
    },
    disabled: {
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        opacity: 0.5,
        marginBottom: 20
    },
    dropdown4RowTxtStyle: {
        color: '#fff',
        fontFamily: 'Geologica-Regular',
        fontSize: 15,

    },
    dropdown4DropdownStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    dropdown4BtnTxtStyle: {
        color: '#fff',
        fontFamily: 'Geologica-Regular',
        fontSize: 15,
        textAlign: 'center'
    },
    textTilte: {
        color: '#fff',
        fontFamily: 'Geologica-Bold',
        fontSize: 40,
        letterSpacing: 5,
        marginBottom: 20
    },
    textInButton: {
        fontFamily: "Geologica-Medium",
        color: '#ffffff',
        fontSize: 17,
    },
    disabledText: {
        fontFamily: "Geologica-Medium",
        color: '#ffffff',
        fontSize: 17,
        opacity: 0.5
    },
    input: {
        color: '#ffffff',
        borderWidth: 0,
        borderBottomWidth: 1,
        fontFamily: "Geologica-Regular",
        borderColor: '#d6ad7b',
        backgroundColor: 'rgba(52, 75, 95, 0.1921568627)',
        marginBottom: 30,
        padding: 10,
        width: '100%',
        fontSize: 15,
    },
    inputDescrip: {
        marginBottom: 5,
        fontFamily: "Geologica-Regular",
        color: '#fff',
        fontSize: 20,
    },
    all: {
        width: '90%',
        left: '5%',
        marginTop: 55
    },
    clubListCont: {
        width: '90%',
        left: '5%',
        marginBottom: 170
    },
    clubCardCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.6490196078)',
        padding: 10,
        marginBottom: 20,
        borderRadius: 20
    },
    pInCard: {
        // marginTop: 10,
        color: '#fff',
        fontFamily: 'Geologica-Light',
        fontSize: 15,
        height: 80,
    },
    imgInCardCont: {
        width: '100%',
        height: 140,
        // backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 10,
        overflow: 'hidden'
    },
    imgInCard: {
        width: '100%',
        height: '100%'
    },
    blubCardTitle: {
        color: '#ffffff',
        fontFamily: 'Geologica-Bold',
        fontSize: 20
    },
    imgForUser: {
        borderRadius: 100,
        width: '80%',
        height: '80%',
        left: '10%',
        top: '10%'
    },
    buttonOfUser: {
        // backgroundColor: 'rgba(0, 0, 0, 0.6490196078)',
        width: 45,
        height: 45,
        borderRadius: 100,
        overflow: 'hidden',

    },
    buttonsAllTimeCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.7490196078)',
        width: '90%',
        left: '5%',
        position: 'absolute',
        bottom: 90,
        zIndex: 100,
        padding: 5,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        // alignContent: 'space-between',
        justifyContent: 'space-between',
    },
    flyButtons: {
        backgroundColor: 'rgba(0, 0, 0, 0.490196078)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100
    },
    flyButtonsCont: {
        // backgroundColor: 'rgba(0, 0, 0, 0.7490196078)',
        width: '90%',
        left: '5%',
        position: 'absolute',
        top: 0,
        zIndex: 100,
        // padding: 10,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        // alignContent: 'space-between',
        justifyContent: 'space-between',
        
    },
    textInFlyButtons:{
        color: '#fff',
        fontFamily: 'Geologica-Medium',
        fontSize: 15
    }

});
