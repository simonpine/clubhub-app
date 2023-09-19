import { ActivityIndicator, StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native"
import Layout from "../components/layout";
import { useState } from "react";
import { getUser, editUser } from "../api";
import { stringMd5 as md5 } from 'react-native-quick-md5';
import { styles } from "../style";

const Recovery = ({ navigation }) => {
    const [userNameRef, setUserNameRef] = useState('')
    const [passwordRef, setPasswordRef] = useState('')
    const [confirmPasswordRef, setConfirmPasswordRef] = useState('')
    const [answerRef, setAnswerRef] = useState('')

    const [err, setErr] = useState('')
    const [alradyUser, setAlreadyUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [buttonSt, setbuttonSt] = useState({
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        marginBottom: 20
    });

    const [userToChange, setUserToChange] = useState(null)

    async function getQuestion() {
        await setIsLoading(true)
        await setErr('')
        const [res] = await getUser(userNameRef)
        if (res === undefined) {
            await setErr('That username is not registered')
        }
        else {
            await setAlreadyUser(true)
            await setUserToChange(res)
        }
        await setIsLoading(false)
    }
    async function changePassword() {
        await setIsLoading(true)
        await setErr('')
        if (passwordRef !== confirmPasswordRef) {
            setErr('The password do not match')
        }
        else if (md5(answerRef) !== userToChange.answer) {
            setErr('The answer is incorrect')
        }
        else {
            await editUser(userToChange.userName, JSON.stringify(userToChange.clubs), md5(passwordRef), userToChange.userImg, userToChange.question, userToChange.answer, userToChange.description, userToChange.userName)
            await navigation.navigate('Login')
        }
        await setIsLoading(false)
    }
    return (
        <>
            {isLoading &&
                <View style={styles.isLoading}>
                    <ActivityIndicator size={60} color="#d6ad7b" />
                </View>
            }
            <Layout n={navigation} t={true}>
                {alradyUser & userToChange !== null ?
                    <View style={styles.all}>
                        <Text style={styles.textTilte}>Recover password</Text>
                        <Text style={styles.inputDescrip}>Answer:</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder="********"
                            onChangeText={setAnswerRef}
                            value={answerRef}
                        />
                        <Text style={styles.inputDescrip}>New password:</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder="********"
                            onChangeText={setPasswordRef}
                            value={passwordRef}
                        />
                        <Text style={styles.inputDescrip}>Confirm password:</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder="********"
                            onChangeText={setConfirmPasswordRef}
                            value={confirmPasswordRef}
                        />
                        <Text style={styles.err}>{err}</Text>

                        <Pressable
                            onPress={changePassword}
                            style={passwordRef.length === 0 || confirmPasswordRef.length === 0 || answerRef.length === 0 ? styles.disabled : buttonSt}
                            disabled={passwordRef.length === 0 || confirmPasswordRef.length === 0 || answerRef.length === 0}
                            onPressIn={() => setbuttonSt({
                                backgroundColor: 'rgba(79, 98, 115, 0.3)',
                                alignSelf: 'flex-start',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 100,
                                marginBottom: 20
                            })}
                            onPressOut={() => setbuttonSt({
                                backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
                                alignSelf: 'flex-start',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 100,
                                marginBottom: 20
                            })}
                        ><Text style={passwordRef.length === 0 || confirmPasswordRef.length === 0 || answerRef.length === 0 ? styles.disabledText : styles.textInButton}>Change password</Text></Pressable>

                    </View>

                    :
                    <View style={styles.all2}>
                        <Text style={styles.textTilte}>Recover password</Text>
                        <Text style={styles.inputDescrip}>Username:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="SimonPine"
                            onChangeText={setUserNameRef}
                            value={userNameRef}
                        />
                        <Text style={styles.err}>{err}</Text>
                        <Pressable
                            onPress={getQuestion}
                            style={userNameRef.length === 0 ? styles.disabled : buttonSt}
                            disabled={userNameRef.length === 0}
                            onPressIn={() => setbuttonSt({
                                backgroundColor: 'rgba(79, 98, 115, 0.3)',
                                alignSelf: 'flex-start',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 100,
                                marginBottom: 20
                            })}
                            onPressOut={() => setbuttonSt({
                                backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
                                alignSelf: 'flex-start',
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderRadius: 100,
                                marginBottom: 20
                            })}
                        ><Text style={userNameRef.length === 0 ? styles.disabledText : styles.textInButton}>Get question</Text></Pressable>

                    </View>
                }
            </Layout>
        </>
    )
}

export default Recovery