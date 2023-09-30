import { ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import { useState } from "react";
import { stringMd5 as md5 } from 'react-native-quick-md5';
import { getUser } from '../api'
import { ContextUser, CustomProvider } from '../context/userContext'
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserSettings = ({ navigation }) => {
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)

    const [err, setErr] = useState('')
    const [passwordRef, setPasswordRef] = useState('')
    const [confirmPasswordRef, setConfirmPasswordRef] = useState('')
    const [nameRef, setNameRef] = useState('')
    const [descriptionRef, setDescriptionRef] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }

    async function changeData(evt) {
        evt.preventDefault();
        await setloading(true)
        setErr('')

        if (passwordRef !== confirmPasswordRef) {
            await setErr('The password do not match')
        }
        else if (nameRef.length > 45) {
            setErr('The username cannot have more than 45 characters')
        }
        else if (nameRef.length !== 0) {
            const [res] = await getUser(nameRef)
            if (res === undefined) {
                setSure(true)
            }
            else {
                setErr('that username is already taken')
            }
        }
        else {
            setSure(true)
        }
        await setloading(false)

    }


    return (
        <CustomProvider>
            <ContextUser.Consumer>
                {({ user }) => {

                    async function setTheData(evt) {
                        await evt.preventDefault();
                        await setloading2(true)
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
                                await localStorage.setItem('user', JSON.stringify(nameRef))
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
                                await localStorage.setItem('user', JSON.stringify(nameRef))
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
                                await localStorage.setItem('user', JSON.stringify(nameRef))

                                user.pasword = await md5(passwordRef)
                                user.userName = await nameRef
                            }
                            else {
                                const UploadFile = await renameFile(selectedImage, nameRef)
                                await formData.append('image', UploadFile)
                                await formData.append('name', nameRef)
                                await formData.append('old', user.userImg)

                                await editUser(nameRef, JSON.stringify(user.clubs), md5(passwordRef), user.userImg, user.question, user.answer, user.description, user.userName)
                                await localStorage.setItem('user', JSON.stringify(nameRef))
                                await uploadFile(formData)

                                user.userImg = await (UploadFile.name)
                                user.pasword = await md5(passwordRef)
                                user.userName = await nameRef
                            }
                        }


                        await setNameRef('')
                        await setDescriptionRef('')
                        await setConfirmPasswordRef('')
                        await setPasswordRef('')
                        await setSelectedImage(null)
                        await navigate('/home')

                    }


                    return (
                        <Layout>
                            <View style={styles.flyButtonsCont}>
                                <Pressable style={styles.flyButtons} onPress={() => {
                                    AsyncStorage.removeItem('SavedUser')
                                    navigation.navigate('Login')

                                }}>
                                    <Text style={styles.textInFlyButtons}>Log out</Text>
                                </Pressable>
                                <Pressable style={styles.flyButtons} onPress={() => navigation.goBack()}>
                                    <Text style={styles.textInFlyButtons}>Return</Text>
                                </Pressable>

                            </View>
                            <View>
                                
                            </View>
                        </Layout>
                    )
                }}
            </ContextUser.Consumer>
        </CustomProvider>
    )
}

export default UserSettings