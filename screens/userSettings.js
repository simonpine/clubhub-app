import { ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";

const UserSettings = ({ navigation }) => {
    return (
        <Layout>
            <View>
                <Pressable onPress={()=> navigation.goBack()}>
                    <Text>Return</Text>
                </Pressable>
            </View>
        </Layout>
    )
}

export default UserSettings