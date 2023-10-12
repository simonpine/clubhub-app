import {  View, Image, Text, Pressable } from "react-native"
import { BannersImg } from "../api";
import { styles } from "../style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContextClub } from "../context/clubContext";

function ClubCard({ clubCard, navigation }) {



    return (
        <View style={styles.clubCardCont} key={clubCard.clubId}>
            <ContextClub.Consumer>
                {({ deaf }) => {
                    async function nave() {
                        await AsyncStorage.setItem('ClubInUse', clubCard.clubId)
                        await deaf()
                        await navigation.navigate('ClubsContNav')
                        // console.log(BannersImg + clubCard.clubBanner)
                        // navigation.navigate('Login')
                    }
                    return (
                        <Pressable
                            style={styles.imgInCardCont}
                            onPress={nave}>
                            <Image style={styles.imgInCard} source={{
                                uri: BannersImg + clubCard.clubBanner
                            }} />
                        </Pressable>
                    )
                }}
            </ContextClub.Consumer>
            <View className="textInCard">
                <View>
                    <Text style={styles.blubCardTitle}>{clubCard.clubTitle}</Text>
                    {clubCard.own ? <Text style={{
                        color: '#00ff6a',
                        fontFamily: 'Geologica-Regular',
                        fontSize: 15,
                        marginVertical: 5
                    }}>Owner</Text> : <Text style={{
                        color: '#5da2fc',
                        fontFamily: 'Geologica-Regular',
                        fontSize: 15,
                        marginVertical: 5
                    }}>Member</Text>}

                </View>
                <Text style={styles.pInCard}>{clubCard.clubDescription}</Text>
            </View>
        </View>
    )
}
export default ClubCard;