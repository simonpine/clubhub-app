import { ActivityIndicator, View, Text, ScrollView, RefreshControl, Pressable, Image } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import { ContextUser } from '../context/userContext'
import { ContextClub } from "../context/clubContext";
import { useState } from "react";
import { usersImg, getUser } from "../api";
import more from '../assets/more.png'
import closeImage from '../assets/close.png'


const Leaderboard = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);

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
                        {({ club, deaf }) => {
                            const onRefresh = () => {
                                setRefreshing(true);
                                setTimeout(() => {
                                    deaf()
                                    setRefreshing(false);
                                }, 2000);
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
                                        <ScrollView
                                            automaticallyAdjustKeyboardInsets={true}
                                            refreshControl={
                                                <RefreshControl tintColor='#d6ad7b' refreshing={refreshing} onRefresh={onRefresh} />
                                            }
                                        >
                                            <View style={styles.EventsCont}>
                                                {club.members.map((item, index) => {
                                                    let idk = {
                                                        color: '#ffff',
                                                        fontFamily: 'Geologica-Bold',
                                                        fontSize: 20
                                                    }
                                                    if (index === 0) {
                                                        idk = {
                                                            color: '#F0C33C',
                                                            fontFamily: 'Geologica-Bold',
                                                            fontSize: 20
                                                        }
                                                    }
                                                    else if(index === 1){
                                                        idk = {
                                                            color: '#BDBDBD',
                                                            fontFamily: 'Geologica-Bold',
                                                            fontSize: 20
                                                        }
                                                    }
                                                    else if(index === 2){
                                                        idk = {
                                                            color: '#9A673D',
                                                            fontFamily: 'Geologica-Bold',
                                                            fontSize: 20
                                                        }
                                                    }
                                                    return (
                                                        <View style={styles.itemInLeaderboard} key={item}>
                                                            <View style={styles.numPlusName}>
                                                                <Text style={idk} >{index + 1} </Text>
                                                                <Text style={styles.nameInList}>{item}</Text>
                                                            </View>
                                                            <Pressable onPress={() => getUserInfo(item)}>
                                                                <Image style={styles.more} source={more} />
                                                            </Pressable>
                                                        </View>
                                                    )
                                                })}
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
export default Leaderboard