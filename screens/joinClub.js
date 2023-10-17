import { ActivityIndicator, View, Image, Text, Pressable, ScrollView, TextInput } from "react-native"
import Layout from "../components/layout";
import { ContextUser, CustomProvider } from '../context/userContext'
import { styles } from "../style";
import { useState, useEffect } from "react";
import { getClubs, getClubId, BannersImg, joinToClub } from "../api";
import closeImage from '../assets/close.png'

const JoinClub = ({ navigation }) => {
    const [loading, setloading] = useState(false)

    const [err, setErr] = useState('')
    const [codeRef, setCodeRef] = useState('')
    const [clubList, setClubList] = useState([])
    const [show, setShow] = useState({})
    const [moreInfoClub, setMoreInfoClub] = useState({})
    const [sure, setSure] = useState(false)

    useEffect(() => {
        async function clubListFunction() {
            const res = await getClubs()
            setClubList(res)
        }
        clubListFunction()
    }, [])

    return (
        <>
            {loading &&
                <View style={styles.isLoading}>
                    <ActivityIndicator size={60} color="#d6ad7b" />
                </View>
            }
                <ContextUser.Consumer>
                    {({ user, userClubs, deafUs }) => {
                        async function retur() {
                            await deafUs()
                            await navigation.navigate('Home')
                        }

                        async function searchClub(evt) {
                            await setloading(true)
                            // await evt.preventDefault()
                            await setShow({})

                            await setErr('')

                            if (userClubs.some(a => a.clubId === codeRef)) {
                                await setCodeRef('')
                                await setloading(false)
                                return await setErr("You are already a member of that club")
                            }

                            const res = await getClubId(codeRef)

                            if (res.length === 0) {
                                await setErr(`The code '${codeRef}' does not exist`)
                            }
                            else {
                                await setShow(res[0])
                            }
                            await setCodeRef('')
                            await setloading(false)
                        }

                        async function join(club) {
                            setSure(true)
                            setMoreInfoClub(club)
                        }
                        async function serverChange(club) {
                            const userClubsObj = await {
                                clubId: club.id,
                                own: false,
                                clubTitle: club.title,
                                clubBanner: club.clubBanner,
                                clubDescription: club.description,
                            }
                            await setShow({})
                            await joinToClub({
                                newMembers: [...club.members, user.userName],
                                clubId: club.id,
                                clubsOfMember: ([...userClubs, userClubsObj]),
                                newMember: user.userName,
                            })
                            await deafUs()
                            await setSure(false)
                        }

                        return user !== null ? (
                            <>
                                {sure &&
                                    <Pressable onPress={() => setSure(false)} style={styles.buttonToFlyBoxes}>
                                        <Pressable style={styles.boxToConfirm}>
                                            <Pressable onPress={() => {
                                                setSure(false)
                                                setMoreInfoClub({})
                                            }}>
                                                <Image style={styles.closeButton} source={closeImage} />
                                            </Pressable>
                                            <View>
                                                <Image style={styles.imageOfClubConfimJoin} source={{ uri: BannersImg + moreInfoClub.clubBanner }} />
                                            </View>
                                            <Text style={styles.textTilteConfirmJoin}>{moreInfoClub.title}</Text>
                                            <Text style={styles.ownerTilteConfirmJoin}>{moreInfoClub.clubOwner}</Text>
                                           <ScrollView style={styles.descriptionConfirmJoin}>
                                            <Pressable>
                                                 <Text style={styles.descriptionConfirmJoinText}>{moreInfoClub.description}</Text>
                                            </Pressable>
                                           </ScrollView>
                                            <Pressable onPress={() => serverChange(moreInfoClub)} style={styles.joinButton}>
                                                <Text style={styles.textInButton}>Join</Text>
                                            </Pressable>
                                        </Pressable>
                                    </Pressable>
                                }
                                <Layout>
                                    <View style={styles.flyButtonsCont}>
                                        <Text style={styles.textInButton}></Text>
                                        <Pressable style={styles.flyButtons} onPress={retur}>
                                            <Text style={styles.textInFlyButtons}>Return</Text>
                                        </Pressable>
                                    </View>
                                    <ScrollView style={styles.joinCont} >
                                        <View style={styles.inptuContJoin}>
                                            <Text style={styles.textTilte}>Join a club</Text>
                                            <Text style={styles.inputDescrip}>Search by code:</Text>
                                            <TextInput value={codeRef} onChangeText={setCodeRef} placeholder="stglrcb9ob" placeholderTextColor='#C7C7CD' style={styles.input}></TextInput>
                                            <Text style={styles.err}>{err}</Text>
                                            <Pressable disabled={codeRef.length === 0} onPress={searchClub} style={codeRef.length === 0 ? styles.disabled : styles.Notdisabled}>
                                                <Text style={styles.textInButton}>Search</Text>
                                            </Pressable>
                                        </View>
                                        {clubList.map(item => {
                                            return !userClubs.some(a => a.clubId === item.id) && (
                                                // <ClubCardJoin key={item.id} jo={join} item={item} /
                                                <View key={item.id} style={styles.cardJoin}>
                                                    <Image style={styles.imageInClubCardJoin} source={{ uri: BannersImg + item.clubBanner }} />
                                                    <View style={styles.textsContsJoin}>
                                                        <Text style={styles.titleJoinCard}>{item.title}</Text>
                                                        <Text style={styles.descriptionInJoinCard}>{item.description.slice(0, 100)} ...</Text>
                                                        <Pressable onPress={() => join(item)} style={styles.moreInfoButton}>
                                                            <Text style={styles.textInButton}>More info</Text>
                                                        </Pressable>
                                                    </View>
                                                </View>

                                            )
                                        })}
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
        </>
    )
}
export default JoinClub;