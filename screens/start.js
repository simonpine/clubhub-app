import { StyleSheet, Image, Text, Pressable } from "react-native"
import Layout from "../components/layout";
import logo from '../assets/Colibri.png'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Start = ({ navigation }) => {
    async function load() {
        const value = await AsyncStorage.getItem('SavedUser')
        if (value !== null) {
            navigation.navigate('Home')
            console.log(value)
        }
        else {
            navigation.navigate('Login')
        }
    }
    setTimeout(() => {
        load()
    }
        , 500)

    return (
        <Layout>
            <Pressable
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
            </Pressable>
        </Layout>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 130,
        height: 130
    },
    fullScreenButton: {
        // backgroundColor: 'white',
        width: '100%',
        height: 700,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Geologica-Bold',
        color: '#fff',
        fontSize: 20,
        marginTop: 20,
        letterSpacing: 3,
        marginRight: 10
    }
});

export default Start