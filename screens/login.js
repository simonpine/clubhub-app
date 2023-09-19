import { ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import logo from '../assets/Colibri.png'
import { useState } from "react";
import { getUser } from '../api'
import { stringMd5 as md5 } from 'react-native-quick-md5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from "../components/layout";


const Login = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const [isLoading, setIsLoading] = useState(false);


    const [buttonSt, setbuttonSt] = useState({
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100
    });

    const [buttonSt2, setbuttonSt2] = useState({
        fontFamily: 'Geologica-Regular',
        fontSize: 15,
        color: '#4F6273',
    });

    const [buttonSt3, setbuttonSt3] = useState({
        fontFamily: 'Geologica-Regular',
        fontSize: 15,
        color: '#4F6273',
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

                <View style={styles.all}>
                    <View style={styles.logoPlusTitle}>
                        <Image sharedTransitionTag="logo" style={styles.logo} source={logo} />
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
                            value={password}
                            secureTextEntry={true}
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
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 100
                            })}
                            onPressOut={() => setbuttonSt({
                                backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
                                alignSelf: 'flex-start',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 100
                            })}
                        ><Text style={userName === '' || password === '' ? styles.disabledText : styles.textInButton}>Log in</Text></Pressable>
                        <View style={styles.otherOptionsCont}>
                            <Pressable
                                onPress={() => navigation.navigate('Recovery')}
                                onPressIn={() => {
                                    setbuttonSt2({
                                        fontFamily: 'Geologica-Regular',
                                        fontSize: 15,
                                        color: '#6584a0',
                                    })
                                }}
                                onPressOut={() => {
                                    setbuttonSt2({
                                        fontFamily: 'Geologica-Regular',
                                        fontSize: 15,
                                        color: '#4F6273',
                                    })
                                }}
                            >
                                <Text style={buttonSt2}>Forgot password?</Text>
                            </Pressable>
                            <Text style={styles.or}>-or-</Text>
                            <Pressable
                                onPress={() => navigation.navigate('CreateAccount')}
                                onPressIn={() => {
                                    setbuttonSt3({
                                        fontFamily: 'Geologica-Regular',
                                        fontSize: 15,
                                        color: '#6584a0',
                                    })
                                }}
                                onPressOut={() => {
                                    setbuttonSt3({
                                        fontFamily: 'Geologica-Regular',
                                        fontSize: 15,
                                        color: '#4F6273',
                                    })
                                }}
                            >
                                <Text style={buttonSt3}>Not have an account?</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Layout>
        </>
    )
}
const styles = StyleSheet.create({
    or: {
        fontFamily: 'Geologica-Thin',
        fontSize: 15,
        color: '#4F6273',
    },
    otherOptionsCont: {
        width: '100%',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logoPlusTitle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 15,
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
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        opacity: 0.5
    },
    textInButton: {
        fontFamily: "Geologica-Medium",
        color: '#ffffff',
        fontSize: 17,
    },
    disabledText: {
        fontFamily: "Geologica-Medium",
        color: '#ffffff',
        fontSize: 17,
        opacity: 0.5
    },
    err: {
        fontFamily: "Geologica-Thin",
        color: 'rgba(241, 128, 128, 0.7882352941)',
        fontSize: 15,
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
    },
    all: {
        height: 'auto',
        justifyContent: 'center',
        width: '90%',
        left: "5%",
        marginTop: '25%'
    }
});

export default Login