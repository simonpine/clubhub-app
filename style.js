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
        // marginBottom: 20,
        width: '100%',
        alignItems: 'center'
    },
    Notdisabled: {
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 100,
        // marginBottom: 20,
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
        marginBottom: 220,
        marginTop: 50
    },
    clubCardCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.6490196078)',
        padding: 10,
        marginBottom: 20,
        borderRadius: 20,
    },
    plusCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.6490196078)',
        padding: 10,
        marginBottom: 20,
        borderRadius: 20,
        // height: 100
        alignItems: 'center'
    },
    pInCard: {
        color: '#fff',
        fontFamily: 'Geologica-Thin',
        fontSize: 15,
        height: 80,
    },
    imgInCardCont: {
        width: '100%',
        height: 140,
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
    },
    buttonOfUser: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: 'hidden',

    },
    buttonOfNav: {
        width: 30,
        height: 30,
        overflow: 'visible',
        alignItems: 'center',
    },
    imgForNav: {
        width: '90%',
        height: '90%',
        left: '5%',
        top: '5%'

    },
    buttonsAllTimeCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.910196078)',
        position: 'absolute',
        paddingBottom: 30,
        borderTopWidth: 0,
        height: 100,
    },
    textForNavButtons: {
        color: '#fff',
        fontFamily: 'Geologica-Thin',
        fontSize: 10,
        width: 50,
        marginTop: 10,
        textAlign: 'center'
    },
    textForNavButtonsFocus: {
        color: '#d6ad7b',
        fontFamily: 'Geologica-Thin',
        fontSize: 10,
        width: 50,
        marginTop: 10,
        textAlign: 'center'
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
        width: '90%',
        left: '5%',
        position: 'absolute',
        top: 0,
        zIndex: 100,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
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
        borderRadius: 100,
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
        borderRadius: 20,
        // position: 'absolute',
        // top: '25%',
        // zIndex: 100,
        // left: '5%'
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
        width: 270,
        marginTop: 20
    },
    EmptyMsgConr: {
        height: '100%',
        width: '100%'
    },
    inptuContJoin: {
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
        position: 'relative',
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
        marginVertical: 20,
        maxHeight: 100
    },
    descriptionConfirmJoinText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Geologica-Thin',

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
        justifyContent: 'center',
        overflow: 'hidden'
    },
    upImga: {
        width: 100,
        height: 70,
        zIndex: 100
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
        fontFamily: 'Geologica-Light',
    },
    imgUploadedByUser: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginTop: 10,
    },
    imgUploadedByUser2: {
        width: 230,
        height: 200,
        borderRadius: 10,
        marginTop: 10,
    },
    returnCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.900196078)',
        // padding: 5,
        // borderRadius: 100,
        // position: 'absolute',
        // top: 50,
        // left: '5%',
        // zIndex: 100
        // padding: 15,
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 100,
        position: 'absolute',
        top: 50,
        right: '5%',
        zIndex: 100
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
        width: 320,
        maxHeight: 400
    },
    widthForBoxes2: {
        marginTop: 20,
        width: 320,
        maxHeight: 300
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
    },
    // 
    realOtherMessage: {
        backgroundColor: 'rgba(0, 0, 0, 0.490196078)',
        borderRadius: 15,
        borderTopStartRadius: 1,
        padding: 10,
        marginLeft: 10,
    },
    ownMessage: {
        backgroundColor: 'rgba(65, 78, 90, 0.5568627451)',
        borderRadius: 15,
        borderTopEndRadius: 1,
        padding: 10,
        marginRight: 10,
    },
    chatCont: {
        width: '90%',
        left: '5%',
        marginBottom: 260,
        marginTop: 70,
        flexDirection: 'column-reverse',
    },
    userImageInChat: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    allMesCont: {
        marginBottom: 20,
        flexDirection: 'row-reverse',
        alignSelf: 'flex-end',
        maxWidth: 260,
    },
    allMesCont2: {
        marginBottom: 20,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        maxWidth: 260,
    },
    formForMessagesContChat: {
        backgroundColor: 'rgba(0, 0, 0, 0.8990196078)',
        marginTop: 20,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        bottom: 200
    },
    tableHeader: {
        backgroundColor: 'rgba(214, 173, 123, 0.2882352941)',
        borderWidth: 0
    },
    table: {
        backgroundColor: 'rgba(0, 0, 0, 0.60196078)',
        borderRadius: 15,
        overflow: 'hidden',

    },
    HeaderTitlesGrades: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Geologica-Bold'
    },
    gradeInTable: {
        color: '#fff',
        fontFamily: 'Geologica-Thin',
        // marginLeft:
    },
    bannerInput: {
        borderColor: 'rgba(214, 173, 123, 0.6156862745)',
        width: '100%',
        height: 80,
        borderWidth: 1,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ScrollViewInSure: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        top: 0,
    },
    cadrQuestion: {
        backgroundColor: 'rgba(79, 98, 115, 0.431372549)',
        // marginBottom: 10,
        marginTop: 20,
        borderRadius: 10,
        padding: 10
    },
    trashDisa: {
        width: 30,
        height: 30,
        opacity: 0.5
    },
    trash: {
        width: 30,
        height: 30
    },
    QuestionAndDelete: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addButton: {
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 100,
        width: 138,
    },
    questionTitle: {
        color: '#d6ad7b',
        fontFamily: 'Geologica-Bold',
        fontSize: 20
    },
    radioText: {
        color: '#fff',
        fontFamily: 'Geologica-Light',
        fontSize: 17,
        marginLeft: 10
    },
    dot: {
        width: 15,
        height: 15,
        backgroundColor: '#d6ad7b',
        borderRadius: 100
    },
    dotDisa: {
        width: 15,
        height: 15,
        // backgroundColor: '#d6ad7b',
        borderRadius: 100,
        borderColor: '#d6ad7b',
        borderWidth: 1
    },
    dotAndTextCont: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        marginLeft: 0
    },
    deleteButton: {
        backgroundColor: 'rgba(255, 0, 0, 0.2941176471)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 100,
        alignItems: 'center',
    },
    titleForSurveyGraph: {
        color: '#fff',
        fontFamily: 'Geologica-Regular',
        fontSize: 25,
    },
    imgInClubSettings: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        position: 'absolute',
        opacity: 0.6
    },
    redButton: {
        backgroundColor: 'rgba(255, 0, 0, 0.541176471)',
        // padding: 15,
        paddingHorizontal: 20,
        paddingVertical: 7.5,
        borderRadius: 100,
        position: 'absolute',
        top: 50,
        left: '5%',
        zIndex: 100
    }
});