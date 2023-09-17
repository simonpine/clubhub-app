import {ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import logo from '../assets/Colibri.png'
import { useState } from "react";
import { getUser } from '../api'
import { stringMd5 as md5 } from 'react-native-quick-md5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from "../components/layout";

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const [isLoading, setIsLoading] = useState(false);


    const [buttonSt, setbuttonSt] = useState({
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 100
    });

    async function LogInFunction(evt) {
        await setErr('')
        await setIsLoading(true)
        const res = await getUser(userName)
        if (res.length === 0 || res[0].pasword !== md5(password)) {
            await setErr('Invalid username/password')
        }
        else {
            await AsyncStorage.setItem('SavedUser', res[0].userName)
            // await setErr(res[0].userName)
        }
        await setIsLoading(false)
        await setPassword('')
        await setUserName('')
    }

    return (
        <>
            {isLoading &&
                <View style={styles.isLoading}>
                    <ActivityIndicator size={60} color="#d6ad7b" />
                </View>
            }
            <Layout>

                <View style={styles.logoPlusTitle}>
                    <Image style={styles.logo} source={logo} />
                    <View>
                        <Text style={styles.title}>ClubHub</Text>
                        <Text style={styles.descrip}>The way to enjoy</Text>
                    </View>
                </View>

                <View style={styles.inputCont}>
                    <Text style={styles.inputDescrip}>Username:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="SimonPine"
                        onChangeText={setUserName}
                        value={userName}
                    />
                    <Text style={styles.inputDescrip}>Pasword:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        value={password}
                        placeholder="********"
                    />
                    <Text style={styles.err}>{err}</Text>
                    <Pressable
                        onPress={LogInFunction}
                        style={userName === '' || password === '' ? styles.disabled : buttonSt}
                        disabled={userName === '' || password === ''}
                        onPressIn={() => setbuttonSt({
                            backgroundColor: 'rgba(79, 98, 115, 0.3)',
                            alignSelf: 'flex-start',
                            paddingHorizontal: 25,
                            paddingVertical: 5,
                            borderRadius: 100
                        })}
                        onPressOut={() => setbuttonSt({
                            backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
                            alignSelf: 'flex-start',
                            paddingHorizontal: 25,
                            paddingVertical: 5,
                            borderRadius: 100
                        })}
                    ><Text style={userName === '' || password === '' ? styles.disabledText : styles.textInButton}>Log in</Text></Pressable>

                </View>
            </Layout>
        </>
    )
}
const styles = StyleSheet.create({
    logoPlusTitle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    inputCont: {
        width: '100%',
        alignItems: 'left',
        marginTop: 40,
    },
    input: {
        color: '#ffffff',
        borderWidth: 0,
        borderBottomWidth: 1,
        fontFamily: "Geologica-Regular",
        borderColor: '#d6ad7b',
        backgroundColor: 'rgba(52, 75, 95, 0.1921568627)',
        marginBottom: 30,
        padding: 10,
        width: '100%',
        fontSize: 17,
    },
    logo: {
        marginRight: 25,
        width: 120,
        height: 120,
    },
    bg: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    inputDescrip: {
        marginBottom: 5,
        fontFamily: "Geologica-Regular",
        color: '#fff',
        fontSize: 20,
    },
    title: {
        fontFamily: "Geologica-Bold",
        color: '#fff',
        fontSize: 35,
        marginRight: 5,
    },
    descrip: {
        fontFamily: "Geologica-Thin",
        color: '#fff',
        fontSize: 15,
    },
    disabled: {
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 100,
        opacity: 0.5
    },
    textInButton: {
        fontFamily: "Geologica-Bold",
        color: '#ffffff',
        fontSize: 17,

    },
    disabledText: {
        fontFamily: "Geologica-Bold",
        color: '#ffffff',
        fontSize: 17,
        opacity: 0.5
    },
    err: {
        fontFamily: "Geologica-Thin",
        color: 'rgba(241, 128, 128, 0.7882352941)',
        fontSize: 17,
        marginBottom: 10,
        marginTop: -20,
        height: 30,
    },
    isLoading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 1000,
        alignContent: 'center',
        justifyContent: 'center',
      }
});

export default Login