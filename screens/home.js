import { ActivityIndicator, StyleSheet, View, Image, Text, Pressable, ScrollView, RefreshControl } from "react-native"
import Layout from "../components/layout";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../style";
import ClubCard from "../components/clubCard";
import { ContextUser, CustomProvider } from '../context/userContext'
import { useState, useCallback } from "react";
import { usersImg } from "../api";
import userImg from '../assets/user.png'
import plusImg from '../assets/plus.png'

const Home = ({ navigation }) => {
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
                                        {/* <Text>Holas</Text> */}
                                        <Pressable style={styles.buttonOfUser} onPress={() => { }} >

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
                                        // <View className="EmptyMsg">
                                        //     <View className="allEmptCont">
                                        //         <img className="empty" src={empty} alt="empty" />
                                        //         <Text className="noH3">You are not in any club</Text>
                                        //         <View className="linksEmp">
                                        //             <Link style={{ margin: '0px' }} to={{
                                        //                 pathname: "/joinClub",
                                        //             }} className="getInCreate">Join club</Link>
                                        //             <Link to={{
                                        //                 pathname: "/createClub",
                                        //             }} className="getInCreate">Create club</Link>
                                        //         </View>
                                        //     </View>
                                        // </View>

                                        <Text>hola</Text>
                                    }
                                </Layout>
                            </>
                        )
                            :
                            (
                                <Layout>
                                    <View style={styles.isLoading}>
                                        <ActivityIndicator size={60} color="#d6ad7b" />
                                    </View>
                                </Layout>
                            )
                    }}
                </ContextUser.Consumer>

            </CustomProvider>


        </ >
    )
}

export default Home