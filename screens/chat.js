import { ActivityIndicator, View, Image, Text, Pressable, ScrollView, RefreshControl, TextInput } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import { ContextUser } from '../context/userContext'
import { ContextClub } from "../context/clubContext";
import { useState } from "react";
import { chatsFlies, usersImg, getUser } from "../api";
import file from '../assets/document.png'
import closeImage from '../assets/close.png'

import send from '../assets/send.png'
import upload from '../assets/upload.png'
import userPhoto from '../assets/user.png'

const Chat = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [message, setMessage] = useState('')
    const [err, setErr] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    const [userInfo, setUserInfo] = useState(null);
    const [sure, setSure] = useState(false)
    async function getUserInfo(userName) {
        const result = await getUser(userName)
        await setUserInfo(result[0])
        await setSure(true)
    }
    return (
        <ContextUser.Consumer>
            {({ user }) => {
                return (
                    <ContextClub.Consumer>
                        {({ club, deaf, chat, sumbmitChat }) => {
                            const onRefresh = () => {
                                setRefreshing(true);
                                setTimeout(() => {
                                    deaf()
                                    setRefreshing(false);
                                }, 2000);
                            }


                            async function hundleSubmit(evt) {
                                evt.preventDefault()
                                setErr('')
                                const date = new Date().valueOf();
                                const formData = new FormData()
                                let today = new Date();
                                const dd = String(today.getDate()).padStart(2, '0');
                                const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                                const yyyy = today.getFullYear();

                                today = mm + '/' + dd + '/' + yyyy
                                const forMoment = {
                                    id: date,
                                    from: user.userName,
                                    idClub: club.id,
                                    fileName: null,
                                    message: null,
                                    typeMess: null,
                                    date: today,
                                    logo: user.userImg,
                                }

                                formData.append('id', date)
                                formData.append('logo', user.userImg)
                                formData.append('date', today)
                                formData.append('from', user.userName)
                                formData.append('idClub', club.id)

                                if ((message !== '' & message.replaceAll(' ', '').length > 0) & selectedImage !== null) {

                                    const UploadFile = renameFile(selectedImage, date + club.id)

                                    forMoment.fileName = UploadFile.name
                                    forMoment.message = message
                                    formData.append('file', UploadFile)
                                    formData.append('message', message)

                                    formData.append('fileName', UploadFile.name)

                                    if (selectedImage.type.split('/')[0] === 'image') {
                                        formData.append('typeMess', 'text+img')
                                        forMoment.typeMess = 'text+img'
                                    }
                                    else {
                                        formData.append('typeMess', 'text+file')
                                        forMoment.typeMess = 'text+file'
                                    }
                                }
                                else if (message !== '' & message.replaceAll(' ', '').length > 0) {
                                    forMoment.message = message
                                    formData.append('fileName', null)
                                    formData.append('message', message)
                                    formData.append('typeMess', 'text')
                                    forMoment.typeMess = 'text'
                                }
                                else {
                                    const UploadFile = renameFile(selectedImage, date + club.id)

                                    forMoment.fileName = UploadFile.name
                                    formData.append('file', UploadFile)
                                    formData.append('fileName', UploadFile.name)
                                    formData.append('message', null)

                                    if (selectedImage.type.split('/')[0] === 'image') {
                                        formData.append('typeMess', 'img')
                                        forMoment.typeMess = 'img'
                                    }
                                    else {
                                        formData.append('typeMess', 'file')
                                        forMoment.typeMess = 'file'
                                    }
                                }
                                sumbmitChat(formData, forMoment)
                                setSelectedImage(null)
                                setMessage('')

                            }



                            return user !== null && club !== null ? (
                                <>
                                    {sure &&
                                        <Pressable onPress={() => setSure(false)} style={styles.buttonToFlyBoxes}>
                                            <Pressable style={styles.boxToConfirm}>
                                                <Pressable onPress={() => {
                                                    setSure(false)
                                                }}>
                                                    <Image style={styles.closeButton} source={closeImage} />
                                                </Pressable>
                                                <View style={styles.widthForBoxes}>
                                                    {userInfo.userImg !== 'null' & userInfo.userImg !== null ? <Image style={styles.imageOfClubConfimJoin} source={{ uri: usersImg + userInfo.userImg }} /> : <></>}
                                                    <Text style={styles.textTilteConfirmJoin}>{userInfo.userName}</Text>
                                                    <Text style={styles.descriptionConfirmJoin}>{userInfo.description}</Text>
                                                </View>
                                            </Pressable>
                                        </Pressable>
                                    }
                                    <Layout>
                                        <View style={styles.formForMessagesContChat}>
                                            <Pressable style={styles.PresableContEventMessage}>
                                                <Image style={styles.buttonInFormSend} source={upload} />
                                            </Pressable>
                                            <TextInput value={message} onChangeText={setMessage} style={styles.inputForMessages} />
                                            <Pressable style={styles.PresableContEventMessage} onPress={hundleSubmit}>
                                                <Image style={styles.buttonInFormSend} source={send} />
                                            </Pressable>
                                        </View>
                                        <ScrollView
                                            automaticallyAdjustKeyboardInsets={true}
                                            refreshControl={
                                                <RefreshControl tintColor='#d6ad7b' refreshing={refreshing} onRefresh={onRefresh} />
                                            }
                                        >
                                            <View style={styles.chatCont}>
                                                {chat.length !== 0 &&
                                                    chat.map(evt => {
                                                        return (
                                                            <View key={evt.id} style={evt.from === user.userName ? styles.allMesCont : styles.allMesCont2}>
                                                                <Pressable onPress={() => getUserInfo(evt.from)}>
                                                                    {evt.logo !== 'null' ?
                                                                        <Image style={styles.userImageInChat} source={{ uri: usersImg + evt.logo }} />
                                                                        :
                                                                        <Image style={styles.userImageInChat} source={userPhoto} />
                                                                        // <Text>Hola</Text>
                                                                    }
                                                                </Pressable>
                                                                {(evt.typeMess !== 'file' & evt.typeMess !== 'text+file') ?
                                                                    <View style={evt.from !== user.userName ? styles.realOtherMessage : styles.ownMessage}>
                                                                        <Text style={styles.dateMessage}>{evt.from === user.userName ? <>You</> : <>{evt.from}</>} {evt.date}</Text>
                                                                        {evt.message !== 'null' && <Text style={styles.textMessage}>{evt.message}</Text>}
                                                                        {evt.fileName !== null & evt.fileName !== 'null' ? <Image style={styles.imgUploadedByUser2} source={{ uri: chatsFlies + evt.fileName }} /> : <></>}
                                                                    </View>
                                                                    :
                                                                    <View style={evt.from !== user.userName ? styles.realOtherMessage : styles.ownMessage}>
                                                                        <Text style={styles.dateMessage}>{evt.from === user.userName ? <>You</> : <>{evt.from}</>} {evt.date}</Text>
                                                                        {evt.message !== 'null' && <Text style={styles.textMessage}>{evt.message}</Text>}
                                                                        <View style={styles.documentContainer}>
                                                                            <Image style={styles.documentImg} source={file} />
                                                                            <Text style={styles.textOfDownload}>Download</Text>
                                                                        </View>
                                                                    </View>
                                                                    // <></>
                                                                }
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </ScrollView>
                                    </Layout>
                                </>
                            )
                                :
                                (
                                    <>
                                        <View style={styles.isLoading}>
                                            <ActivityIndicator size={60} color="#d6ad7b" />
                                        </View>
                                        <Layout>
                                        </Layout>
                                    </>
                                )
                        }}
                    </ContextClub.Consumer>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default Chat