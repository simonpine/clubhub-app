import { ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import Layout from "../components/layout";
import logo from '../assets/Colibri.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../style";


const Home = ({ navigation }) => {

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

export default Home