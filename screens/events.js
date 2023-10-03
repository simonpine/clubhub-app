import { ActivityIndicator, StyleSheet, View, Image, Text, Pressable, ScrollView, RefreshControl } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import ClubCard from "../components/clubCard";
import { ContextUser, CustomProvider } from '../context/userContext'
import { CustomProviderClub, ContextClub } from "../context/clubContext";
import { useState, useEffect } from "react";
import { usersImg, BannersImg } from "../api";
import userImg from '../assets/user.png'
import plusImg from '../assets/plus.png'
import empty from '../assets/empty.png'

const Events = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <CustomProvider>
            <ContextUser.Consumer>
                {({ user }) => {
                    return (
                        <CustomProviderClub>
                            <ContextClub.Consumer>
                                {({ club, deaf, events }) => {
                                    const onRefresh = () => {
                                        setRefreshing(true);
                                        setTimeout(() => {
                                            deaf()
                                            setRefreshing(false);
                                        }, 2000);
                                    }
                                    return user !== null && club !== null ? (
                                        <Layout>
                                            <ScrollView
                                                refreshControl={
                                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                                }
                                            >
                                                <View style={styles.all}>
                                                    {/* <Text>Hola</Text> */}
                                                    {/* <Image style={styles.clubBanner} source={{uri: BannersImg + club.clubBanner}} /> */}
                                                    <View style={styles.clubBanner}>
                                                        <Image style={styles.clubBannerImage} source={{ uri: BannersImg + club.clubBanner }} />
                                                        <Text style={styles.textInClubBanner}>{club.title}</Text>
                                                    </View>
                                                    {events.length !== 0 &&
                                                        events.map(evt => {
                                                            return(
                                                                <Text>{evt.message}</Text>
                                                            )
                                                        })
                                                    }
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
                            </ContextClub.Consumer>
                        </CustomProviderClub>
                    )
                }}
            </ContextUser.Consumer>
        </CustomProvider>
    )
}
export default Events