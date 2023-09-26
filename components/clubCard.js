import { ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import { BannersImg } from "../api";
import { styles } from "../style";

function ClubCard({ clubCard, navigation }) {


    return (
        <View style={styles.clubCardCont} key={clubCard.clubId}>
            <Pressable
                style={styles.imgInCardCont}
                onPress={() =>
                    // clubCard.navigation.navigate('Login')
                    console.log(BannersImg + clubCard.clubBanner)
                }
            >
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
                        fontSize: 17
                    }}>Owner</Text> : <Text style={{
                        color: '#5da2fc',
                        fontFamily: 'Geologica-Regular',
                        fontSize: 17
                    }}>Member</Text>}

                </View>
                <Text style={styles.pInCard}>{clubCard.clubDescription}</Text>
            </View>
        </View>
    )
}
export default ClubCard;