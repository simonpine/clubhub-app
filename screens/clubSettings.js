import { ActivityIndicator, View, Image, Text, Pressable, ScrollView, RefreshControl, TextInput } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import { ContextUser } from '../context/userContext'
import { ContextClub } from "../context/clubContext";
import { useState } from "react";
import { BannersImg, editClub } from "../api"
import upload from '../assets/upload.png'
// import {subm}

const ClubSettings = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);

    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)
    const [sure, setSure] = useState(false)

    const formData = new FormData()

    const [descriptioRef, setDescriptioRef] = useState('')
    const [nameRef, setNameRef] = useState('')
    const [fileName, setFileName] = useState('Change banner')
    const [selectedImage, setSelectedImage] = useState(null);
    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    return (
        <>
            {loading &&
                <View style={styles.isLoading}>
                    <ActivityIndicator size={60} color="#d6ad7b" />
                </View>
            }
            <ContextUser.Consumer>
                {({ user }) => {
                    return (
                        <ContextClub.Consumer>
                            {({ club, deaf }) => {
                                const onRefresh = () => {
                                    setRefreshing(true);
                                    setTimeout(() => {
                                        deaf()
                                        setRefreshing(false);
                                    }, 2000);
                                }

                                async function changeClub(evt) {
                                    // await evt.preventDefault();
                                    await setloading2(true)
                                    await setloading(true)

                                    if (nameRef === '' & selectedImage === null) {

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: club.clubBanner,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: club.clubBanner,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: club.title,
                                            description: descriptioRef,
                                            gardes: club.grades,
                                            clubBanner: club.clubBanner,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)



                                        await editClub(formData, club.id)

                                        club.description = descriptioRef
                                        user.clubs = newClubsArray
                                    }
                                    else if (descriptioRef === '' & selectedImage === null) {


                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: club.clubBanner,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: club.clubBanner,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: nameRef,
                                            description: club.description,
                                            gardes: club.grades,
                                            clubBanner: club.clubBanner,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)



                                        await editClub(formData, club.id)
                                        club.title = nameRef
                                        user.clubs = newClubsArray
                                    }
                                    else if (descriptioRef === '' & nameRef === '') {

                                        const UploadFile = await renameFile(selectedImage, club.id)
                                        await formData.append('image', UploadFile)

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: UploadFile.name,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: UploadFile.name,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: club.title,
                                            description: club.description,
                                            gardes: club.grades,
                                            clubBanner: UploadFile.name,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)

                                        await editClub(formData, club.id)

                                        club.clubBanner = UploadFile.name
                                        user.clubs = newClubsArray

                                    }
                                    else if (descriptioRef === '') {

                                        const UploadFile = await renameFile(selectedImage, club.id)
                                        await formData.append('image', UploadFile)

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: UploadFile.name,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: club.description,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: UploadFile.name,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: nameRef,
                                            description: club.description,
                                            gardes: club.grades,
                                            clubBanner: UploadFile.name,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)

                                        await editClub(formData, club.id)

                                        club.clubBanner = UploadFile.name
                                        club.title = nameRef
                                        user.clubs = newClubsArray

                                    }
                                    else if (nameRef === '') {
                                        const UploadFile = await renameFile(selectedImage, club.id)
                                        await formData.append('image', UploadFile)

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: UploadFile.name,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: club.title,
                                            clubBanner: UploadFile.name,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: club.title,
                                            description: descriptioRef,
                                            gardes: club.grades,
                                            clubBanner: UploadFile.name,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)

                                        await editClub(formData, club.id)

                                        club.clubBanner = UploadFile.name
                                        club.description = descriptioRef
                                        user.clubs = newClubsArray

                                    }
                                    else if (selectedImage === null) {

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: club.clubBanner,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: club.clubBanner,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: nameRef,
                                            description: descriptioRef,
                                            gardes: club.grades,
                                            clubBanner: club.clubBanner,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)



                                        await editClub(formData, club.id)
                                        club.title = nameRef
                                        user.clubs = newClubsArray
                                        club.description = descriptioRef
                                    }
                                    else {
                                        const UploadFile = await renameFile(selectedImage, club.id)
                                        await formData.append('image', UploadFile)

                                        const newClubsArray = await user.clubs.filter(item => item.clubId !== club.id)
                                        await newClubsArray.push({
                                            own: true,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: UploadFile.name,
                                        })

                                        await formData.append('clubResume', JSON.stringify({
                                            own: false,
                                            clubDescription: descriptioRef,
                                            clubId: club.id,
                                            clubTitle: nameRef,
                                            clubBanner: UploadFile.name,
                                        }))
                                        await formData.append('changedClub', JSON.stringify({
                                            id: club.id,
                                            title: nameRef,
                                            description: descriptioRef,
                                            gardes: club.grades,
                                            clubBanner: UploadFile.name,
                                            members: JSON.stringify(club.members),
                                            clubOwner: club.clubOwner
                                        }))
                                        await formData.append('members', JSON.stringify(club.members))
                                        await formData.append('ownerClubs', JSON.stringify(newClubsArray))
                                        await formData.append('ownerName', user.userName)

                                        await editClub(formData, club.id)

                                        club.clubBanner = UploadFile.name
                                        club.description = descriptioRef
                                        club.title = nameRef
                                        user.clubs = newClubsArray
                                    }


                                    await setNameRef('')
                                    await setDescriptioRef('')
                                    await setSelectedImage(null)
                                    await setFileName('Change banner')
                                    await setloading(false)
                                    await setloading2(false)
                                    await setSure(false)
                                }

                                return user !== null && club !== null ? (
                                    <>
                                        {sure &&
                                            <Pressable onPress={() => setSure(false)} style={styles.buttonToFlyBoxes}>
                                                <Pressable style={styles.boxToConfirm}>
                                                    <Text style={styles.confirmText}>Are you sure of the changes?</Text>
                                                    <View style={styles.confirmButtonsCont}>
                                                        <Pressable onPress={changeClub} style={styles.ConfirmButtons}>
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
                                                </Pressable>
                                            </Pressable>
                                        }
                                        <Layout>
                                            <ScrollView automaticallyAdjustKeyboardInsets={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                                                <View style={styles.all} >
                                                    <Text style={styles.inputDescrip}>Change banner:</Text>
                                                    <View style={styles.imageUploader}>
                                                        <Image style={styles.upImga} source={upload} />
                                                        <Image style={styles.imgInClubSettings} source={{uri: BannersImg + club.clubBanner}} />
                                                    </View>
                                                    <Text style={styles.inputDescrip}>Change club name:</Text>
                                                    <TextInput
                                                        placeholderTextColor='#C7C7CD'
                                                        style={styles.input}
                                                        placeholder={club.title}
                                                        onChangeText={setNameRef}
                                                    />
                                                    <Text style={styles.inputDescrip}>Change description:</Text>
                                                    <TextInput
                                                        placeholderTextColor='#C7C7CD'
                                                        style={styles.input}
                                                        placeholder={club.description}
                                                        onChangeText={setDescriptioRef}
                                                    />
                                                    <Pressable onPress={() => setSure(true)} disabled={nameRef === '' & descriptioRef === ''} style={nameRef === '' & descriptioRef === '' ? styles.disabled : styles.Notdisabled}>
                                                        <Text style={styles.textInButton}>Create</Text>
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
                        </ContextClub.Consumer>
                    )
                }}
            </ContextUser.Consumer>
        </>
    )
}
export default ClubSettings