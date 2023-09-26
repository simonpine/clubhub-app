import { ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import Layout from "../components/layout";
import logo from '../assets/Colibri.png'


const HomeView = ({ navigation }) => {
    return (
        <Layout>
            <Pressable
                // onPress={() => navigation.navigate('Login')}
                >
                <Image
                    style={styles.logo}
                    source={logo}
                    sharedTransitionTag="logo"
                />
                <Text >
                    welcome
                </Text>
            </Pressable>
        </Layout>
    )
}

export default HomeView