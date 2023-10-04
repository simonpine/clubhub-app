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
        paddingVertical: 7.5,
        borderRadius: 100,
        opacity: 0.5,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center'
    },
    Notdisabled: {
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 100,
        // opacity: 0.5,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center'
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
        fontFamily: "Geologica-Thin",
        color: '#fff',
        fontSize: 20,
    },
    all: {
        paddingHorizontal: '5%',
        marginTop: 60,
        marginBottom: 120
    },
    all2: {
        paddingHorizontal: '5%',
        marginTop: 20,
        marginBottom: 120
    },
    clubListCont: {
        width: '90%',
        left: '5%',
        marginBottom: 190,
    },
    EventsCont: {
        width: '90%',
        left: '5%',
        marginBottom: 200,
        marginTop: 70
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
        fontFamily: 'Geologica-Thin',
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
        width: '100%',
        height: '100%',
        // left: '5%',
        // top: '5%'
    },
    buttonOfUser: {
        // backgroundColor: 'rgba(0, 0, 0, 0.6490196078)',
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: 'hidden',

    },
    buttonOfNav: {
        width: 30,
        height: 30,
        overflow: 'visible',
    },
    imgForNav: {
        width: '90%',
        height: '90%',
        left: '5%',
        top: '5%'
    },
    buttonsAllTimeCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.910196078)',
        width: '90%',
        left: '5%',
        position: 'absolute',
        bottom: 130,
        zIndex: 100,
        padding: 10,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonsAllTimeCont2: {
        backgroundColor: 'rgba(0, 0, 0, 0.910196078)',
        width: '90%',
        left: '5%',
        position: 'absolute',
        bottom: 130,
        zIndex: 100,
        padding: 5,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flyButtons: {
        backgroundColor: 'rgba(0, 0, 0, 0.490196078)',
        paddingHorizontal: 20,
        paddingVertical: 7.5,
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
        alignItems: 'center'

    },
    textInFlyButtons: {
        color: '#fff',
        fontFamily: 'Geologica-Medium',
        fontSize: 17
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
    userImageInSettingsCont: {

        width: 90,
        height: 90,
        backgroundColor: 'rgba(0, 0, 0, 0.490196078)',
        // overflow: 'hidden',
        borderRadius: 100,
        // alignSelf: 'center',
        marginBottom: 20
    },
    buttonToFlyBoxes: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(52, 75, 95, 0.421568627)',
        position: 'absolute',
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    boxToConfirm: {

        backgroundColor: 'rgba(0, 0, 0, 0.960196078)',
        padding: 15,
        borderRadius: 20
    },
    confirmText: {
        color: '#ffffff',
        fontFamily: 'Geologica-Medium',
        fontSize: 20,
        marginBottom: 20,

    },
    ConfirmButtons: {
        backgroundColor: 'rgba(65, 78, 90, 0.5568627451)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },
    confirmButtonsCont: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-between'
    },
    optionsCont: {
        width: '100%',
        height: 200,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.95196078)',
        bottom: 0,
        zIndex: 10,
        borderRadius: 20,
        justifyContent: 'space-between',
        paddingBottom: 70,
        paddingHorizontal: 20,
        paddingTop: 50

    },
    clubItercactions: {
        color: '#fff',
        fontFamily: 'Geologica-Medium',
        fontSize: 20
    },
    bgToClose: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10
    },
    textInMenu: {
        color: '#fff',
        fontFamily: 'Geologica-Regular',
        fontSize: 17
    },
    empty: {
        width: 200,
        height: 200
    },
    noH3: {
        color: '#fff',
        fontFamily: 'Geologica-Thin',
        fontSize: 20,
    },
    EmptyMsg: {
        width: '100%',
        marginTop: '50%',
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'center',
    },
    linksEmp: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // width: '100%',
        width: 270,
        marginTop: 20
    },
    EmptyMsgConr: {
        height: '100%',
        width: '100%'
    },
    inptuContJoin: {
        // backgroundColor: 'white',
        width: '90%',
        left: '5%',
        marginTop: 30
    },
    imageInClubCardJoin: {
        width: 50,
        height: '100%',
        borderRadius: 10
    },
    cardJoin: {
        backgroundColor: 'rgba(0, 0, 0, 0.490196078)',
        margin: '5%',
        borderRadius: 20,
        overflow: "hidden",
        padding: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    moreInfoButton: {
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 100,
        width: 120
    },
    descriptionInJoinCard: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Geologica-Thin',
        // width: '100%',
        position: 'relative',
        // height: 100,
        marginVertical: 10,
        marginBottom: 20
    },
    titleJoinCard: {
        color: '#fff',
        fontFamily: 'Geologica-Bold',
        fontSize: 20
    },
    textsContsJoin: {
        width: 270,
        marginLeft: 10,
    },
    imageOfClubConfimJoin: {
        width: 320,
        height: 150,
        borderRadius: 10,
        marginTop: 10
    },
    closeButton: {
        width: 35,
        height: 35,
    },
    textTilteConfirmJoin: {
        color: '#fff',
        fontFamily: 'Geologica-Bold',
        fontSize: 25,
        marginTop: 10
    },
    ownerTilteConfirmJoin: {
        color: 'white',
        fontFamily: 'Geologica-Regular',
        color: '#8195A6',
        fontSize: 20
    },
    descriptionConfirmJoin: {
        width: 320,
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Geologica-Thin',
        marginVertical: 20
    },
    joinButton: {
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 100,
        width: 75,
    },
    joinCont: {
        marginTop: 20
    },
    imageUploader: {
        borderColor: '#d6ad7b',
        width: '100%',
        height: 300,
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    upImga: {
        width: 100,
        height: 70
    },
    clubBanner: {
        width: '100%',
        height: 180,
        borderRadius: 20,
        overflow: 'hidden'
    },
    clubBannerImage: {
        width: '100%',
        height: '100%',
        // borderRadius: 20
        position: 'absolute',
    },
    textInClubBanner: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Geologica-Bold',
        margin: 10
    },
    messageFromOther: {
        backgroundColor: 'rgba(0, 0, 0, 0.490196078)',
        marginTop: 20,
        borderRadius: 15,
        padding: 10
    },
    dateMessage: {
        fontFamily: 'Geologica-Thin',
        fontSize: 12,
        color: '#d6ad7b',
        marginBottom: 10
    },
    textMessage: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Geologica-Regular',
    },
    imgUploadedByUser: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginTop: 10
    },
    returnCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.900196078)',
        padding: 15,
        // paddingVertical: 7.5,
        borderRadius: 100,
        // marginTop: 20
        position: 'absolute',
        top: 0,
        left: '5%',
        // width: 100,
        zIndex: 1000
    },
    imageForNav: {
        width: 25,
        height: 25
    },
    documentImg: {
        width: 40,
        height: 40,
    },
    documentContainer: {
        flexDirection: 'row',
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 7,
        backgroundColor: 'rgba(214, 173, 123, 0.1)',
        alignItems: 'center'
    },
    textOfDownload: {
        color: '#fff',
        fontFamily: 'Geologica-Medium',
        fontSize: 15,
        marginLeft: 10
    },
    buttonInFormSend: {
        width: '100%',
        height: '100%'
    },
    formForMessagesCOnt: {
        backgroundColor: 'rgba(0, 0, 0, 0.5490196078)',
        marginTop: 20,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 100
    },
    inputForMessages: {
        borderColor: '#fff',
        width: 240,
        borderBottomWidth: 1,
        color: '#fff',
        fontFamily: 'Geologica-Regular',
        fontSize: 15
    },
    PresableContEventMessage: {
        width: 35.9,
        height: 35.9
    },
    widthForBoxes: {
        marginTop: 20,
        width: 320
    },
    titleForCalendar: {
        color: '#fff',
        fontFamily: 'Geologica-Bold',
        fontSize: 25,
        marginTop: -10
    },
    descripForCalendar: {
        color: '#fff',
        fontFamily: 'Geologica-Thin',
        fontSize: 17,
    }
});