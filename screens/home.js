import { ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable, ScrollView, RefreshControl } from "react-native"
import Layout from "../components/layout";
import logo from '../assets/Colibri.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../style";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClubCard from "../components/clubCard";
import { ContextUser, CustomProvider } from '../context/userContext'
const Stack = createNativeStackNavigator();
import HomeView from "./homeView";
import { useState, useCallback } from "react";

const Home = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);



    return (
        <>
            <CustomProvider>
                {/* <Pressable
                  // onPress={() => navigation.navigate('Login')}
                  style={styles.fullScreenButton}>
                  <Image
                      style={styles.logo}
                      source={logo}
                      sharedTransitionTag="logo"
                  />
                  <Text style={styles.text}>
                      welcome
                  </Text>
              </Pressable> */}

                <ContextUser.Consumer>
                    {({ user, userClubs, deafUs }) => {
                        const onRefresh = () => {
                            setRefreshing(true);
                            setTimeout(() => {
                                deafUs()
                                setRefreshing(false);
                            }, 2000);
                        }
                        return user !== null && (
                            <Layout>
                                {userClubs.length > 0 ?
                                    <ScrollView
                                        contentContainerStyle={styles.scrollView}
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

                                    < Text > hola</Text>
                                }
                            </Layout>
                        )
                    }}
                </ContextUser.Consumer>

            </CustomProvider>


        </ >
    )
}

export default Home