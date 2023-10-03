import { ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import { BannersImg } from "../api";
import { styles } from "../style";
import AsyncStorage from '@react-native-async-storage/async-storage';

function ClubCard({ clubCard, navigation }) {


    return (
        <View style={styles.clubCardCont} key={clubCard.clubId}>
            <Pressable
                style={styles.imgInCardCont}
                onPress={() => {
                    AsyncStorage.setItem('ClubInUse', clubCard.clubId)
                    navigation.navigate('Events')
                    // console.log(BannersImg + clubCard.clubBanner)
                    // navigation.navigate('Login')
                }
                }>
                <Image style={styles.imgInCard} source={{
                    uri: BannersImg + clubCard.clubBanner
                }} />
            </Pressable>
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