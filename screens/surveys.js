import { ActivityIndicator, View, Image, Text, Pressable, ScrollView, RefreshControl, TextInput } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import { ContextUser } from '../context/userContext'
import { ContextClub } from "../context/clubContext";
import { useState } from "react";
import { addRes, addSurveyToServer, surveysBanner, deleteSurvey } from "../api"

import ClubNav from "../components/clubNav";
import file from '../assets/document.png'
import closeImage from '../assets/close.png'

import send from '../assets/send.png'
import upload from '../assets/upload.png'
import userPhoto from '../assets/user.png'

const Surveys = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [message, setMessage] = useState('')
    const [err, setErr] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [sure, setSure] = useState(false)




    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    const formData = new FormData()
    const [res, setRes] = useState([])
    const [currentAnswering, setCurrentAnswering] = useState(null)
    const [currentSurvey, setCurrentSurvey] = useState([
        {
            question: '',
            options: [{
                id: Math.floor(Math.random() * 100000),
                answer: ''
            },
            {
                id: Math.floor(Math.random() * 100000),
                answer: ''
            }],
            id: Math.floor(Math.random() * 100000),
        }
    ])
    function addQuestion() {
        setCurrentSurvey([...currentSurvey, {
            question: '',
            options: [{
                id: Math.floor(Math.random() * 100000),
                answer: ''
            },
            {
                id: Math.floor(Math.random() * 100000),
                answer: ''
            }],
            id: Math.floor(Math.random() * 100000),
        }])
    }
    function deleteQuestion(id) {
        const copy = [...currentSurvey]
        setCurrentSurvey(copy.filter(item => item.id !== id))
    }
    function addAnswer(id) {
        const copy = [...currentSurvey]

        copy.forEach(item => {
            if (item.id === id) {
                return item.options.push({
                    id: Math.floor(Math.random() * 100000),
                    answer: ''
                })
            }
        })
        setCurrentSurvey(copy)
    }
    function deleteAnswer(idQuestion, idAnswer) {
        const copy = [...currentSurvey]
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].id === idQuestion) {
                for (let j = 0; j < copy[i].options.length; j++) {
                    if (copy[i].options[j].id === idAnswer) {
                        copy[i].options.splice(j, 1)
                    }
                }
            }
        }
        setCurrentSurvey(copy)
    }
    function changeQuestion(idQuestion, newInfo) {
        const copy = [...currentSurvey]
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].id === idQuestion) {
                copy[i].question = newInfo
            }
        }
        setCurrentSurvey(copy)
    }
    function changeAnswer(idQuestion, idAnswer, newInfo) {
        const copy = [...currentSurvey]
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].id === idQuestion) {
                for (let j = 0; j < copy[i].options.length; j++) {
                    if (copy[i].options[j].id === idAnswer) {
                        copy[i].options[j].answer = newInfo
                    }
                }
            }
        }
        setCurrentSurvey(copy)
    }

    function changeAnswerRes(idQuestion, idAnswer) {
        const copy = []
        if (res.length === 0) {
            for (let i = 0; i < currentAnswering.answers.length; i++) {
                const oneObj = {
                    id: currentAnswering.answers[i].id,
                    question: currentAnswering.answers[i].question,
                    options: [],
                }
                for (let j = 0; j < currentAnswering.answers[i].options.length; j++) {
                    const twoObj = {
                        id: currentAnswering.answers[i].options[j].id,
                        answer: currentAnswering.answers[i].options[j].answer,
                        votes: currentAnswering.answers[i].options[j].votes,
                    }
                    if (idAnswer === currentAnswering.answers[i].options[j].id) twoObj.votes += 1
                    oneObj.options.push(twoObj)
                }
                copy.push(oneObj)
            }
        }
        else {
            for (let i = 0; i < res.length; i++) {
                const oneObj = {
                    id: res[i].id,
                    question: res[i].question,
                    options: [],
                }
                for (let j = 0; j < res[i].options.length; j++) {

                    let twoObj
                    if (idQuestion === res[i].id) {
                        twoObj = {
                            id: currentAnswering.answers[i].options[j].id,
                            answer: currentAnswering.answers[i].options[j].answer,
                            votes: currentAnswering.answers[i].options[j].votes,
                        }

                        if (idAnswer === res[i].options[j].id) twoObj.votes += 1
                    }
                    else {
                        twoObj = {
                            id: res[i].options[j].id,
                            answer: res[i].options[j].answer,
                            votes: res[i].options[j].votes,
                        }
                    }
                    oneObj.options.push(twoObj)

                }
                copy.push(oneObj)
            }
        }
        setRes(copy)
    }

    return (
        <ContextUser.Consumer>
            {({ user }) => {
                return (
                    <ContextClub.Consumer>
                        {({ club, deaf, chat, sumbmitChat }) => {
                            const onRefresh = () => {
                                setRefreshing(true);
                                setTimeout(() => {
                                    deaf()
                                    setRefreshing(false);
                                }, 2000);
                            }
                            async function submitSurvey(evt) {
                                await evt.preventDefault()
                                const idForUpload = await Math.random().toString(36).substr(2, 32)
                                const UploadFile = await renameFile(selectedImage, `${club.id}-survey-${idForUpload}`)

                                await formData.append('image', UploadFile)
                                await formData.append('clubId', club.id)

                                const answers = await []

                                const copy = [...currentSurvey]
                                for (let i = 0; i < copy.length; i++) {
                                    const oneObj = {
                                        id: copy[i].id,
                                        question: copy[i].question,
                                        options: [],
                                    }
                                    for (let j = 0; j < copy[i].options.length; j++) {
                                        const twoObj = {
                                            id: copy[i].options[j].id,
                                            answer: copy[i].options[j].answer,
                                            votes: 0,
                                        }
                                        oneObj.options.push(twoObj)
                                    }
                                    answers.push(oneObj)
                                }

                                const newSurvey = await {
                                    id: idForUpload,
                                    banner: UploadFile.name,
                                    questionary: currentSurvey,
                                    title: titleRef,
                                    answers,
                                    whoAnswered: [],
                                }

                                await formData.append('polls', JSON.stringify([...polls, newSurvey]))

                                await addSurveyToServer(formData)
                                await setCurrentSurvey(
                                    [
                                        {
                                            question: '',
                                            options: [{
                                                id: Math.floor(Math.random() * 100000),
                                                answer: ''
                                            },
                                            {
                                                id: Math.floor(Math.random() * 100000),
                                                answer: ''
                                            }],
                                            id: Math.floor(Math.random() * 100000),
                                        }
                                    ]
                                )
                                await setTitleRef('')
                                await setSelectedImage(null)
                                await setSure(false)
                                await deaf()
                            }

                            async function submitAnswers(evt) {
                                await evt.preventDefault()
                                await addRes(JSON.stringify({
                                    clubId: club.id,
                                    newAnswers: res,
                                    pollId: currentAnswering.id,
                                    userAns: user.userName
                                }))
                                setCurrentAnswering(null)
                                setRes([])
                                deaf()
                            }
                            async function deleteSurveyButton() {
                                await deleteSurvey(JSON.stringify({
                                    clubId: club.id,
                                    pollId: currentAnswering.id
                                }))
                                
                                await setCurrentAnswering(null)
                                await setRes([])
                                await deaf()
                            }


                            return user !== null && club !== null ? (
                                <>
                                    {sure &&
                                        <Pressable onPress={() => setSure(false)} style={styles.buttonToFlyBoxes}>
                                            <View style={styles.boxToConfirm}>
                                                <Pressable onPress={() => {
                                                    setSure(false)
                                                }}>
                                                    <Image style={styles.closeButton} source={closeImage} />
                                                </Pressable>
                                                <View style={styles.widthForBoxes}>

                                                </View>
                                            </View>
                                        </Pressable>
                                    }
                                    <Layout>
                                        <ClubNav sett={user.userName === club.clubOwner} n={navigation} current={5}>
                                            <ScrollView
                                                automaticallyAdjustKeyboardInsets={true}
                                                refreshControl={
                                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                                }
                                            >
                                                <View style={styles.chatCont}>

                                                </View>
                                            </ScrollView>
                                        </ClubNav>
                                    </Layout>
                                </>
                            )
                                :
                                (
                                    <>
                                        <View style={styles.isLoading}>
                                            <ActivityIndicator size={60} color="#d6ad7b" />
                                        </View>
                                        <Layout>
                                        </Layout>
                                    </>
                                )
                        }}
                    </ContextClub.Consumer>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default Surveys