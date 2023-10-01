import { ActivityIndicator, StyleSheet, View, Image, Text, Pressable, ScrollView, RefreshControl, Animated } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import ClubCard from "../components/clubCard";
import { ContextUser, CustomProvider } from '../context/userContext'
import { useState, useRef } from "react";
import { usersImg } from "../api";
import userImg from '../assets/user.png'
import plusImg from '../assets/plus.png'
import empty from '../assets/empty.png'


const Home = ({ navigation }) => {
    const [plusing, setPlusing] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    return (
        <>
            <CustomProvider>
                <ContextUser.Consumer>
                    {({ user, userClubs, deafUs }) => {
                        const onRefresh = () => {
                            setRefreshing(true);
                            setTimeout(() => {
                                deafUs()
                                setRefreshing(false);
                            }, 2000);
                        }
                        return user !== null ? (
                            <>
                                {plusing &&
                                    <>
                                        <Pressable style={styles.bgToClose} onPress={() => setPlusing(false)}>

                                        </Pressable>
                                        <View style={styles.optionsCont}>
                                            <Pressable>
                                                <Text style={styles.clubItercactions}>Join club</Text>
                                            </Pressable>
                                            <Pressable>
                                                <Text style={styles.clubItercactions}>Create club</Text>
                                            </Pressable>
                                        </View>
                                    </>
                                }

                                <Layout>
                                    <View style={styles.buttonsAllTimeCont}>
                                        <Pressable style={styles.buttonOfUser} onPress={() => navigation.navigate('UserSettings')} >
                                            {user.userImg !== null ?
                                                <Image style={styles.imgForUser} source={{
                                                    uri: usersImg + user.userImg
                                                }} />
                                                :
                                                <Image style={styles.imgForUser} source={userImg} />
                                            }
                                        </Pressable>
                                        <Text style={styles.textInMenu}>ClubHub</Text>
                                        <Pressable style={styles.buttonOfUser} onPress={() => { setPlusing(true) }} >

                                            <Image style={styles.imgForUser} source={plusImg} />

                                        </Pressable>
                                    </View>
                                    {userClubs.length > 0 ?
                                        <ScrollView
                                            refreshControl={
                                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                            }>
                                            <View style={styles.clubListCont}>
                                                {userClubs.map((clubCard) => {
                                                    return (
                                                        <ClubCard key={clubCard.clubId} user={user} clubCard={clubCard} navigation={navigation} />
                                                    )
                                                })}
                                            </View>
                                        </ScrollView>
                                        :
                                        <View style={styles.EmptyMsg}>
                                            <Image style={styles.empty} source={empty} alt="empty" />
                                            <Text style={styles.noH3}>You are not in any club</Text>
                                            <View style={styles.linksEmp}>
                                                <Pressable style={styles.flyButtons}>
                                                    <Text style={styles.textInFlyButtons}>Join club</Text>
                                                </Pressable>
                                                <Pressable style={styles.flyButtons}>
                                                    <Text style={styles.textInFlyButtons}>Create club</Text>
                                                </Pressable>
                                            </View>
                                        </View>

                                        // <Text>hola</Text>
                                    }
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


        </ >
    )
}

export default Home