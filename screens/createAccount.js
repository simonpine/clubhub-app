import { ActivityIndicator, StyleSheet, View, Text, TextInput, Pressable } from "react-native"
import Layout from "../components/layout";
import SelectDropdown from 'react-native-select-dropdown'
import { useState } from "react";
import { getUserName, putUser } from "../api";
import { stringMd5 as md5 } from 'react-native-quick-md5';


const questions = ["What was the name of your first teacher?", "What is the name of your favorite childhood friend?", "In which city were you born?", "What is the name of your maternal grandmother?",
    'What was the model of your first car?', "What is the name of the street you grew up on?", "What was the name of the first book you read as a child?", "What is your favorite movie?",
    "In which city did you have your first job?", "What was the name of your childhood hero?", "What was the name of your first pet?"
]


const CreateAccount = ({ navigation }) => {
    const [userNameRef, setUserNameRef] = useState('')
    const [passwordRef, setPasswordRef] = useState('')
    const [confirmPasswordRef, setConfirmPasswordRef] = useState('')

    const [quiestionRef, setQuestionRef] = useState('')
    const [answerRef, setAnswerRef] = useState('')
    const [confirmAnswerRef, setConfirmAnswerRef] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const [err, setErr] = useState('')


    const [buttonSt, setbuttonSt] = useState({
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        marginBottom: 20
    });

    async function createA() {
        await setIsLoading(true)

        const [userName] = await getUserName(userNameRef)

        if (userName !== undefined) {
            setErr('The username is already taken')
        }
        else if (userNameRef.length > 45) {
            setErr('The username cannot have more than 45 characters')
        }
        else if (passwordRef !== confirmPasswordRef || answerRef !== confirmAnswerRef) {
            setErr('The password/answer do not match')
        }
        else {
            await putUser(userNameRef, md5(passwordRef), quiestionRef, md5(answerRef))
            // await navigate(-1)

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
            <Layout t={true} n={navigation}>
                <View style={styles.all}>
                    <Text style={styles.textTilte}>Create account</Text>
                    <Text style={styles.inputDescrip}>Username:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="SimonPine"
                        onChangeText={setUserNameRef}
                        value={userNameRef}
                    />
                    <Text style={styles.inputDescrip}>Password:</Text>
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
                    <Text style={styles.inputDescrip}>Recovery question:</Text>
                    <SelectDropdown
                        dropdownStyle={styles.dropdown4DropdownStyle}
                        buttonTextStyle={styles.dropdown4BtnTxtStyle}
                        buttonStyle={styles.input}
                        data={questions}
                        rowTextStyle={styles.dropdown4RowTxtStyle}
                        defaultButtonText={"Select a question:"}
                        onSelect={(selectedItem) => {
                            setQuestionRef(selectedItem)
                        }}
                    />
                    <Text style={styles.inputDescrip}>Answer:</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="********"
                        onChangeText={setAnswerRef}
                        value={answerRef}
                    />
                    <Text style={styles.inputDescrip}>Confirm answer:</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="********"
                        onChangeText={setConfirmAnswerRef}
                        value={confirmAnswerRef}
                    />

                        <Text style={styles.err}>{err}</Text>

                    <Pressable
                        onPress={createA}
                        style={userNameRef.length === 0 || passwordRef.length === 0 || confirmPasswordRef.length === 0 || quiestionRef === 'Select a quiestion:' || answerRef.length === 0 || confirmAnswerRef.length === 0 ? styles.disabled : buttonSt}
                        disabled={userNameRef.length === 0 || passwordRef.length === 0 || confirmPasswordRef.length === 0 || quiestionRef === 'Select a quiestion:' || answerRef.length === 0 || confirmAnswerRef.length === 0}
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
                    ><Text style={userNameRef.length === 0 || passwordRef.length === 0 || confirmPasswordRef.length === 0 || quiestionRef === '' || answerRef.length === 0 || confirmAnswerRef.length === 0 ? styles.disabledText : styles.textInButton}>Create</Text></Pressable>
                </View>

            </Layout>
        </>
    )
}

const styles = StyleSheet.create({
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
    disabled: {
        backgroundColor: 'rgba(214, 173, 123, 0.3882352941)',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        opacity: 0.5,
        marginBottom: 20
    },
    dropdown4RowTxtStyle: {
        color: '#fff',
        fontFamily: 'Geologica-Regular',
        fontSize: 15,

    },
    dropdown4DropdownStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    dropdown4BtnTxtStyle: {
        color: '#fff',
        fontFamily: 'Geologica-Regular',
        fontSize: 15,
        textAlign: 'center'
    },
    textTilte: {
        color: '#fff',
        fontFamily: 'Geologica-Bold',
        fontSize: 40,
        letterSpacing: 5,
        marginBottom: 20
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
    inputDescrip: {
        marginBottom: 5,
        fontFamily: "Geologica-Regular",
        color: '#fff',
        fontSize: 20,
    },
    all: {
        width: '90%',
        left: '5%',
        marginTop: 55
    }
});

export default CreateAccount