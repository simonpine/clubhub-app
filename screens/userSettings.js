import { ActivityIndicator, View, Image, Text, TextInput, Pressable, ScrollView } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import { useState, useCallback } from "react";
import { stringMd5 as md5 } from 'react-native-quick-md5';
import { getUser, editUser } from '../api'
import { ContextUser, CustomProvider } from '../context/userContext'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usersImg } from "../api";
import userImg from '../assets/user.png'

const UserSettings = ({ navigation }) => {


    const [buttonSt, setbuttonSt] = useState({
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        width: '100%',
        alignItems: 'center'
    });

    const [loading, setloading] = useState(false)

    const [err, setErr] = useState('')
    const [passwordRef, setPasswordRef] = useState('')
    const [confirmPasswordRef, setConfirmPasswordRef] = useState('')
    const [nameRef, setNameRef] = useState('')
    const [descriptionRef, setDescriptionRef] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [sure, setSure] = useState(false)

    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }

    async function changeData(evt) {
        await setloading(true)
        await setErr('')

        if (passwordRef !== confirmPasswordRef) {
            await setErr('The password do not match')
        }
        else if (nameRef.length > 45) {
            await setErr('The username cannot have more than 45 characters')
        }
        else if (nameRef.length !== 0) {
            const [res] = await getUser(nameRef)
            if (res === undefined) {
                await setSure(true)
            }
            else {
                await setErr('that username is already taken')
            }
        }
        else {
            await setSure(true)
        }
        await setloading(false)

    }


    return (
        <>
            {loading &&
                <View style={styles.isLoading}>
                    <ActivityIndicator size={60} color="#d6ad7b" />
                </View>
            }
            <CustomProvider>
                <ContextUser.Consumer>
                    {({ user }) => {

                        async function setTheData(evt) {
                            await setloading(true)
                            if (descriptionRef !== '') {
                                await editUser(user.userName, JSON.stringify(user.clubs), user.pasword, user.userImg, user.question, user.answer, descriptionRef, user.userName)
                                user.description = await descriptionRef
                            }

                            if (nameRef !== '' || selectedImage !== null || passwordRef !== '') {
                                if (nameRef === '' & selectedImage === null & passwordRef !== '') {
                                    await editUser(user.userName, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.description, user.userName)
                                    user.pasword = await md5(passwordRef)
                                }
                                else if (passwordRef === '' & selectedImage === null & nameRef !== '') {
                                    await editUser(nameRef, JSON.stringify(user.clubs), user.pasword, user.userImg, user.question, user.answer, user.description, user.userName)
                                    await AsyncStorage.setItem('SavedUser', nameRef)
                                    user.userName = await nameRef
                                }
                                else if (passwordRef === '' & nameRef === '' & selectedImage !== null) {
                                    const UploadFile = await renameFile(selectedImage, user.userName)
                                    await formData.append('image', UploadFile)
                                    await formData.append('name', user.userName)
                                    await formData.append('old', user.userImg)
                                    user.userImg = await (UploadFile.name)
                                    await uploadFile(formData)

                                }
                                else if (passwordRef === '' & nameRef !== '' & selectedImage !== null) {
                                    const UploadFile = await renameFile(selectedImage, nameRef)
                                    await formData.append('image', UploadFile)
                                    await formData.append('name', nameRef)
                                    await formData.append('old', user.userImg)

                                    await editUser(nameRef, JSON.stringify(user.clubs), user.pasword, user.userImg, user.question, user.answer, user.description, user.userName)
                                    await AsyncStorage.setItem('SavedUser', nameRef)
                                    await uploadFile(formData)

                                    user.userName = await nameRef
                                    user.userImg = await (UploadFile.name)

                                }
                                else if (nameRef === '' & passwordRef !== '' & selectedImage !== null) {
                                    const UploadFile = await renameFile(selectedImage, user.userName)
                                    await formData.append('image', UploadFile)
                                    await formData.append('name', user.userName)
                                    await formData.append('old', user.userImg)

                                    await editUser(user.userName, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.description, user.userName)
                                    await uploadFile(formData)

                                    user.pasword = await md5(passwordRef)
                                    user.userImg = await (UploadFile.name)
                                }
                                else if (selectedImage === null & nameRef !== '' & passwordRef !== '') {
                                    await editUser(nameRef, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.description, user.userName)
                                    await AsyncStorage.setItem('SavedUser', nameRef)

                                    user.pasword = await md5(passwordRef)
                                    user.userName = await nameRef
                                }
                                else {
                                    const UploadFile = await renameFile(selectedImage, nameRef)
                                    await formData.append('image', UploadFile)
                                    await formData.append('name', nameRef)
                                    await formData.append('old', user.userImg)

                                    await editUser(nameRef, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.description, user.userName)
                                    await AsyncStorage.setItem('SavedUser', nameRef)
                                    await uploadFile(formData)

                                    user.userImg = await (UploadFile.name)
                                    user.pasword = await md5(passwordRef)
                                    user.userName = await nameRef
                                }
                            }

                            await console.log('funciono')
                            await setNameRef('')
                            await setDescriptionRef('')
                            await setConfirmPasswordRef('')
                            await setPasswordRef('')
                            await setSelectedImage(null)
                            await setloading(false)
                            await setSure(false)
                        }


                        return user !== null ? (
                            <>
                                {sure &&
                                    <Pressable onPress={() => setSure(false)} style={styles.buttonToFlyBoxes}>
                                        <View style={styles.boxToConfirm}>
                                            <Text style={styles.confirmText}>Are you sure of the changes?</Text>
                                            <View style={styles.confirmButtonsCont}>
                                                <Pressable onPress={setTheData} style={styles.ConfirmButtons}>
                                                    <Text style={styles.textInButton}>Yes, save</Text>
                                                </Pressable>
                                                <Pressable onPress={() => setSure(false)} style={styles.ConfirmButtons}>
                                                    <Text style={{
                                                        fontFamily: "Geologica-Medium",
                                                        color: 'rgba(241, 128, 128, 0.7882352941)',
                                                        fontSize: 17,
                                                    }}>No, cancel</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Pressable>
                                }
                                <Layout>
                                    <View style={styles.flyButtonsCont}>
                                        <Pressable style={styles.flyButtons} onPress={() => {
                                            AsyncStorage.removeItem('SavedUser')
                                            navigation.navigate('Login')
                                            // setUser(null)
                                        }}>
                                            <Text style={styles.textInFlyButtons}>Log out</Text>
                                        </Pressable>
                                        <Pressable style={styles.flyButtons} onPress={() => navigation.goBack()}>
                                            <Text style={styles.textInFlyButtons}>Return</Text>
                                        </Pressable>

                                    </View>
                                    <ScrollView automaticallyAdjustKeyboardInsets={true}>
                                        <View style={styles.all}>
                                            <Text style={styles.textTilte}>Settings</Text>
                                            <Text style={styles.inputDescrip}>User icon: </Text>
                                            <View style={styles.userImageInSettingsCont}>
                                                {user.userImg !== null ?
                                                    <Image style={styles.imgForUser} source={{
                                                        uri: usersImg + user.userImg
                                                    }} />
                                                    :
                                                    <Image style={styles.imgForUser} source={userImg} />
                                                }
                                            </View>

                                            <Text style={styles.inputDescrip}>Change username:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={user.userName}
                                                onChangeText={setNameRef}
                                                secureTextEntry={false}
                                                placeholderTextColor='#C7C7CD'
                                            />

                                            <Text style={styles.inputDescrip}>Change description:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={user.description}
                                                onChangeText={setDescriptionRef}
                                                secureTextEntry={false}
                                                placeholderTextColor='#C7C7CD'
                                            />

                                            <Text style={styles.inputDescrip}>Change password:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='*******'
                                                onChangeText={setPasswordRef}
                                                secureTextEntry={true}
                                                placeholderTextColor='#C7C7CD'
                                            />

                                            <Text style={styles.inputDescrip}>Confirm password:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder='*******'
                                                onChangeText={setConfirmPasswordRef}
                                                secureTextEntry={true}
                                                placeholderTextColor='#C7C7CD'
                                            />

                                            <Text style={styles.err}>{err}</Text>

                                            <Pressable
                                                onPress={changeData}
                                                style={(confirmPasswordRef.length === 0 || passwordRef.length === 0) & (nameRef.length === 0) & selectedImage === null & descriptionRef.length === 0 ? styles.disabled : buttonSt}
                                                disabled={(confirmPasswordRef.length === 0 || passwordRef.length === 0) & (nameRef.length === 0) & selectedImage === null & descriptionRef.length === 0}
                                                onPressIn={() => setbuttonSt({
                                                    backgroundColor: 'rgba(79, 98, 115, 0.3)',
                                                    alignSelf: 'flex-start',
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 5,
                                                    borderRadius: 100,
                                                    width: '100%',
                                                    alignItems: 'center'
                                                })}
                                                onPressOut={() => setbuttonSt({
                                                    backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
                                                    alignSelf: 'flex-start',
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 5,
                                                    borderRadius: 100,
                                                    width: '100%',
                                                    alignItems: 'center'
                                                })}
                                            >
                                                <Text style={(confirmPasswordRef.length === 0 || passwordRef.length === 0) & (nameRef.length === 0) & selectedImage === null & descriptionRef.length === 0 ? styles.disabledText : styles.textInButton}>Save changes</Text>
                                            </Pressable>
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
                </ContextUser.Consumer>
            </CustomProvider>
        </>
    )
}

export default UserSettings