import { ActivityIndicator, View, Image, Text, Pressable, ScrollView, TextInput } from "react-native"
import Layout from "../components/layout";
import { ContextUser, CustomProvider } from '../context/userContext'
import { styles } from "../style";
import { useState } from "react";
import { newClub } from "../api";
import upload from '../assets/upload.png'

const CreateClub = ({ navigation }) => {

    const [loading, setloading] = useState(false)

    const [err, setErr] = useState('')
    const [descriptioRef, setDescriptioRef] = useState('')
    const [nameRef, setNameRef] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    async function submitClub(user) {
        await setloading(true)
        setErr('')
        if (nameRef.replaceAll(' ', '').length === 0 || descriptioRef.replaceAll(' ', '').length === 0) {
            setErr('The name/description cannot be empty')
        }
        else {
            const idForUpload = await Math.random().toString(36).substr(2, 32)

            const UploadFile = renameFile(selectedImage, idForUpload)
            await formData.append('image', UploadFile)
            await formData.append('id', idForUpload)
            await formData.append('title', nameRef)
            await formData.append('description', descriptioRef)
            await formData.append('chat', JSON.stringify([]))
            await formData.append('events', JSON.stringify([]))
            await formData.append('calendarEvents', JSON.stringify([]))
            await formData.append('grades', JSON.stringify({
                students: [],
                grades: ['grade 0'],
            }))
            await formData.append('members', JSON.stringify([]))
            await formData.append('clubLeader', 'No leader')
            await formData.append('surveys', JSON.stringify([]))
            await formData.append('clubsOfOwner', JSON.stringify([...user.clubs, { own: true, clubId: idForUpload, clubTitle: nameRef, clubBanner: UploadFile.name, clubDescription: descriptioRef }]))
            await formData.append('clubOwner', user.userName)

            await newClub(formData)
            await user.clubs.push({ own: true, clubId: idForUpload, clubTitle: nameRef, clubBanner: UploadFile.name, clubDescription: descriptioRef })
            await navigate('/home')
        }


        await setloading(false)

    }
    const formData = new FormData()

    return (
        <CustomProvider>
            <ContextUser.Consumer>
                {({ user }) => {
                    return user ? (
                        <Layout >
                            <View style={styles.flyButtonsCont}>
                                <Text style={styles.textInButton}></Text>
                                <Pressable style={styles.flyButtons} onPress={() => navigation.goBack()}>
                                    <Text style={styles.textInFlyButtons}>Return</Text>
                                </Pressable>
                            </View>
                            <ScrollView automaticallyAdjustKeyboardInsets={true} style={styles.joinCont}>

                                <View style={styles.all} >
                                    <Text style={styles.textTilte}>Create a club</Text>
                                    <Text style={styles.inputDescrip}>Club banner:</Text>
                                    <View style={styles.imageUploader}>
                                        <Image style={styles.upImga} source={upload} />
                                    </View>
                                    <Text style={styles.inputDescrip}>Club name:</Text>
                                    <TextInput
                                        placeholderTextColor='#C7C7CD'
                                        style={styles.input}
                                        placeholder="Cinema club"
                                    />
                                    <Text style={styles.inputDescrip}>Description:</Text>
                                    <TextInput
                                        placeholderTextColor='#C7C7CD'
                                        style={styles.input}
                                        placeholder="A cinema club is a gathering of film enthusiasts who come together to watch and discuss movies. It provides a space for like-minded individuals to share their love for cinema, explore different genres, and engage in meaningful conversations about films."
                                    />
                                    <Pressable style={styles.disabled}>
                                        <Text style={styles.textInButton}>Create</Text>
                                    </Pressable>
                                </View>
                            </ScrollView>
                        </Layout>
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
    )
}
export default CreateClub