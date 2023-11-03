import { ActivityIndicator, View, Image, Text, Pressable, ScrollView, RefreshControl, TextInput } from "react-native"
import { changeExists } from "../api";
import Layout from "../components/layout";
import { styles } from "../style";
import { ContextUser } from '../context/userContext'
import { ContextClub } from "../context/clubContext";
import { useState } from "react";
import { BannersImg, editClub } from "../api"
import upload from '../assets/upload.png'
import Checkbox from 'expo-checkbox';
// import {subm}

const ClubSettings = ({ navigation }) => {

    const [exist, setExist] = useState(false)

    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)

    const [checked2, setChecked2] = useState(false)
    const handleClick2 = () => setChecked2(!checked2)

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

                                    if (nameRef === '' & selectedImage === null & descriptioRef !== '') {

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
                                     else if (descriptioRef === '' & selectedImage === null & nameRef !== '') {


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
                                    else if (descriptioRef === '' & nameRef === '' & selectedImage !== null) {

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
                                    else if (descriptioRef === '' & nameRef !== '' & selectedImage !== null) {

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
                                    else if (nameRef === '' & descriptioRef !== '' & selectedImage !== null) {
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
                                    else if (selectedImage === null & nameRef !== '' & descriptioRef !== '') {

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
                                    else if(selectedImage !== null & nameRef !== '' & descriptioRef !== '') {

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
                                    
                                    if(exist){
                                        if(checked !== club.existChat){
                                            await changeExists(JSON.stringify({
                                                which: 'chat',
                                                clubId: club.id,
                                                newData: checked
                                            }))
                                        }
                                        if(checked2 !== club.existGrades){
                                            await changeExists(JSON.stringify({
                                                which: 'grades',
                                                clubId: club.id,
                                                newData: checked2
                                            }))
                                        }
                                    }

                                    await deaf()
                                    await setExist(false)
                                    await setNameRef('')
                                    await setDescriptioRef('')
                                    await setSelectedImage(null)
                                    await setFileName('Change banner')
                                    await setloading(false)
                                    await setloading2(false)
                                    await setSure(false)
                                }

                                function changedTheExist(which) {
                                    setExist(true)
                                    if (which === 1) {
                                        setChecked(!club.existChat)
                                        setChecked2(!!club.existGrades)
                                    }
                                    else {
                                        setChecked2(!club.existGrades)
                                        setChecked(!!club.existChat)
                                    }
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
                                            <ScrollView automaticallyAdjustKeyboardInsets={true} refreshControl={<RefreshControl tintColor='#d6ad7b' refreshing={refreshing} onRefresh={onRefresh} />}>
                                                <View style={styles.all} >
                                                    <Text style={styles.inputDescrip}>Change banner:</Text>
                                                    <View style={styles.imageUploader}>
                                                        <Image style={styles.upImga} source={upload} />
                                                        <Image style={styles.imgInClubSettings} source={{ uri: BannersImg + club.clubBanner }} />
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

                                                    {exist ?
                                                        <View>
                                                            <View style={styles.contOfBoxAndText}>
                                                                <Text style={styles.textNextToBox}>Have chat</Text>
                                                                <Checkbox style={styles.checkbox} value={checked === true} onValueChange={handleClick} />
                                                            </View>
                                                            <View style={styles.contOfBoxAndText}>
                                                                <Text style={styles.textNextToBox}>Have grades</Text>
                                                                <Checkbox style={styles.checkbox} value={checked2 === true} onValueChange={handleClick2} />
                                                            </View>
                                                        </View>
                                                        :
                                                        <View>
                                                            <View style={styles.contOfBoxAndText}>
                                                                <Text style={styles.textNextToBox}>Have chat</Text>
                                                                <Checkbox style={styles.checkbox} value={club.existChat === 1} onValueChange={()=> changedTheExist(1)} />
                                                            </View>
                                                            <View style={styles.contOfBoxAndText}>
                                                                <Text style={styles.textNextToBox}>Have grades</Text>
                                                                <Checkbox style={styles.checkbox} value={club.existGrades === 1} onValueChange={()=> changedTheExist()} />
                                                            </View>
                                                        </View>
                                                    }

                                                    <Pressable onPress={() => setSure(true)} disabled={nameRef === '' & descriptioRef === '' & exist === false} style={nameRef === '' & descriptioRef === '' & exist === false ? styles.disabled : styles.Notdisabled}>
                                                        <Text style={styles.textInButton}>Save changes</Text>
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