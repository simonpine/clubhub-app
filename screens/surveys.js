import { ActivityIndicator, View, Image, Text, Pressable, ScrollView, RefreshControl, TextInput } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import { ContextUser } from '../context/userContext'
import { ContextClub } from "../context/clubContext";
import { useState } from "react";
import { addRes, addSurveyToServer, surveysBanner, deleteSurvey } from "../api"
import plusImg from '../assets/plus.png'
import closeImage from '../assets/close.png'
import empty from '../assets/empty.png'
import trash from '../assets/delete.png'
import close from '../assets/close.png'
import { BarChart } from "react-native-chart-kit";

const chartConfig = {
    // backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(214, 173, 123, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};


const Surveys = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sure, setSure] = useState(false)
    const [loading, setloading] = useState(false)



    function renameFile(originalFile, newName) {
        const fin = originalFile.type.split('/')
        return new File([originalFile], (newName + '.' + fin[1]), {
            type: originalFile.type,
            lastModified: originalFile.lastModified,
        });
    }
    const formData = new FormData()
    const [res, setRes] = useState([])
    const [titleRef, setTitleRef] = useState('')
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
        <>
            {loading &&
                <View style={styles.isLoading}>
                    <ActivityIndicator size={60} color="#d6ad7b" />
                </View>
            }
            <ContextUser.Consumer>
                {({ user }) => {
                    return (
                        <ContextClub.Consumer>
                            {({ club, deaf, polls }) => {
                                const onRefresh = () => {
                                    setRefreshing(true);
                                    setTimeout(() => {
                                        deaf()
                                        setRefreshing(false);
                                    }, 2000);
                                }
                                async function submitSurvey() {
                                    await setloading(true)
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
                                    await await setloading(false)
                                }

                                async function submitAnswers() {
                                    await setloading(true)
                                    await addRes(JSON.stringify({
                                        clubId: club.id,
                                        newAnswers: res,
                                        pollId: currentAnswering.id,
                                        userAns: user.userName
                                    }))
                                    await setCurrentAnswering(null)
                                    await setRes([])
                                    await deaf()
                                    await await setloading(false)
                                }
                                async function deleteSurveyButton() {
                                    await setloading(true)
                                    await deleteSurvey(JSON.stringify({
                                        clubId: club.id,
                                        pollId: currentAnswering.id
                                    }))
                                    await deaf()
                                    await setCurrentAnswering(null)
                                    await setRes([])
                                    await setloading(false)
                                }


                                return user !== null && club !== null ? (
                                    <>
                                        {sure &&
                                            <Pressable onPress={() => setSure(false)} style={styles.buttonToFlyBoxes}>
                                                <Pressable style={styles.boxToConfirm}>
                                                    <Pressable onPress={() => {
                                                        setSure(false)
                                                    }}>
                                                        <Image style={styles.closeButton} source={closeImage} />
                                                    </Pressable>
                                                    <ScrollView automaticallyAdjustKeyboardInsets={true} style={styles.widthForBoxes}>
                                                        <Text style={styles.inputDescrip}>Survey title:</Text>
                                                        <TextInput
                                                            placeholderTextColor='#C7C7CD'
                                                            style={styles.input}
                                                            placeholder="Most popular pet"
                                                            onChangeText={setTitleRef}
                                                            secureTextEntry={false}
                                                        />
                                                        <View style={styles.bannerInput}>
                                                            <Text style={styles.textInFlyButtons}>Select a banner</Text>
                                                        </View>
                                                        {currentSurvey.map((item, index) => {
                                                            return (
                                                                <View style={styles.cadrQuestion} key={item.id}>
                                                                    <View style={styles.QuestionAndDelete}>
                                                                        <TextInput onChangeText={(evt) => { changeQuestion(item.id, evt.target.value) }} style={{
                                                                            color: '#ffffff',
                                                                            borderWidth: 0,
                                                                            borderBottomWidth: 1,
                                                                            fontFamily: "Geologica-Regular",
                                                                            borderColor: '#d6ad7b',
                                                                            // backgroundColor: 'rgba(52, 75, 95, 0.1921568627)',
                                                                            marginBottom: 30,
                                                                            padding: 10,
                                                                            width: '80%',
                                                                            fontSize: 15,
                                                                        }} placeholder={"Question " + Number(index)} placeholderTextColor='#C7C7CD' />
                                                                        <Pressable disabled={currentSurvey.length < 2} onPress={() => deleteQuestion(item.id)}>
                                                                            <Image style={currentSurvey.length < 2 ? styles.trashDisa : styles.trash} source={trash} />
                                                                        </Pressable>
                                                                    </View>
                                                                    <View>
                                                                        {item.options.map((ans, index) => {
                                                                            return (
                                                                                <View style={styles.QuestionAndDelete} key={ans.id}>
                                                                                    <TextInput placeholderTextColor='#C7C7CD' placeholder={'Answer ' + index} style={{
                                                                                        color: '#ffffff',
                                                                                        borderWidth: 1,
                                                                                        borderBottomWidth: 1,
                                                                                        fontFamily: "Geologica-Regular",
                                                                                        borderColor: '#d6ad7b',
                                                                                        // backgroundColor: 'rgba(52, 75, 95, 0.1921568627)',
                                                                                        marginBottom: 30,
                                                                                        padding: 10,
                                                                                        width: '80%',
                                                                                        fontSize: 15,
                                                                                    }} onChangeText={(evt) => changeAnswer(item.id, ans.id, evt)} />
                                                                                    <Pressable disabled={item.options.length < 3} onPress={() => deleteAnswer(item.id, ans.id)}>
                                                                                        <Image style={item.options.length < 3 ? styles.trashDisa : styles.trash} source={close} />
                                                                                    </Pressable>
                                                                                </View>
                                                                            )
                                                                        })

                                                                        }
                                                                        <Pressable onPress={() => addAnswer(item.id)} style={styles.addButton}>
                                                                            <Text style={styles.textInButton}>Add answer</Text>
                                                                        </Pressable>
                                                                    </View>
                                                                </View>
                                                            )
                                                        })
                                                        }

                                                        <Text></Text>
                                                        <Text></Text>
                                                        <Pressable onPress={addQuestion} style={styles.Notdisabled}>
                                                            <Text style={styles.textInButton}>Add question</Text>
                                                        </Pressable>
                                                        <Text></Text>

                                                        <Pressable disabled onPress={submitSurvey} style={styles.disabled}>
                                                            <Text style={styles.textInButton}>Save survey</Text>
                                                        </Pressable>

                                                    </ScrollView>
                                                </Pressable>
                                            </Pressable>
                                        }
                                        {currentAnswering !== null &&
                                            <Pressable onPress={() => setCurrentAnswering(null)} style={styles.buttonToFlyBoxes}>
                                                <Pressable style={styles.boxToConfirm}>
                                                    <Pressable onPress={() => {
                                                        setCurrentAnswering(null)
                                                    }}>
                                                        <Image style={styles.closeButton} source={closeImage} />
                                                    </Pressable>
                                                    <ScrollView automaticallyAdjustKeyboardInsets={true} style={styles.widthForBoxes2}>
                                                        {club.clubOwner === user.userName ?
                                                            <>
                                                                {currentAnswering.answers.map(answer => {
                                                                    const data = {
                                                                        labels: [],
                                                                        datasets: [
                                                                            {
                                                                                data: []
                                                                            }
                                                                        ]
                                                                    }

                                                                    answer.options.forEach(it => {

                                                                        data.labels.push(it.answer)
                                                                        data.datasets[0].data.push(it.votes)
                                                                    })
                                                                    return (
                                                                        <Pressable key={answer.id}>
                                                                            <Text style={styles.titleForSurveyGraph}>{answer.question}</Text>
                                                                            <BarChart
                                                                                data={data}
                                                                                width={400}
                                                                                height={220}
                                                                                chartConfig={chartConfig}
                                                                                verticalLabelRotation={30}
                                                                            />
                                                                        </Pressable>

                                                                        // <></>
                                                                    )
                                                                })

                                                                }
                                                                <Text></Text>
                                                                <Text></Text>
                                                                <Text></Text>
                                                                <Pressable onPress={() => deleteSurveyButton()} style={styles.deleteButton}>
                                                                    <Text style={styles.textInButton}>Delete survey</Text>
                                                                </Pressable>
                                                            </>
                                                            :
                                                            <View>
                                                                {currentAnswering.questionary.map((item, index) => {
                                                                    return (
                                                                        <View key={item.id} style={styles.cadrQuestion}>
                                                                            <Text style={styles.questionTitle}>{index + 1}. {item.question}</Text>
                                                                            {item.options.map((ans, index2) => {
                                                                                // console.log(res[index].options[index2].votes > polls.find((element) => element.id === currentAnswering.id).answers[index].options[index2].votes)
                                                                                return (
                                                                                    <Pressable style={styles.dotAndTextCont} key={ans.id} onPress={() => changeAnswerRes(item.id, ans.id)}>
                                                                                        <View style={res[index].options[index2].votes > polls.find((element) => element.id === currentAnswering.id).answers[index].options[index2].votes ? styles.dot : styles.dotDisa}></View>
                                                                                        <Text style={styles.radioText}>{ans.answer}</Text>
                                                                                    </Pressable>
                                                                                )
                                                                            })}
                                                                        </View>
                                                                    )
                                                                })}
                                                                <Text></Text>
                                                                <Text></Text>
                                                                <Pressable onPress={submitAnswers} style={styles.Notdisabled}>
                                                                    <Text style={styles.textInButton}>Submit</Text>
                                                                </Pressable>
                                                            </View>
                                                        }
                                                    </ScrollView>
                                                </Pressable>
                                            </Pressable>
                                        }
                                        <Layout>
                                            <ScrollView
                                                refreshControl={
                                                    <RefreshControl tintColor='#d6ad7b' refreshing={refreshing} onRefresh={onRefresh} />
                                                }
                                            >
                                                <View style={styles.chatCont}>
                                                    {polls.length !== 0 ?
                                                        <>
                                                            {club.clubOwner === user.userName &&
                                                                <Pressable onPress={() => setSure(true)} style={styles.plusCont}>
                                                                    <Text></Text>
                                                                    <Image source={plusImg} />
                                                                    <Text></Text>
                                                                </Pressable>}
                                                            {
                                                                polls.map(item => {
                                                                    return (
                                                                        <View style={styles.clubCardCont} key={item.id}>
                                                                            <Pressable
                                                                                disabled={item.whoAnswered.some(it => it === user.userName)}
                                                                                onPress={() => {
                                                                                    setCurrentAnswering(item)
                                                                                    const copy = []
                                                                                    for (let i = 0; i < item.answers.length; i++) {
                                                                                        const oneObj = {
                                                                                            id: item.answers[i].id,
                                                                                            question: item.answers[i].question,
                                                                                            options: [],
                                                                                        }
                                                                                        for (let j = 0; j < item.answers[i].options.length; j++) {
                                                                                            const twoObj = {
                                                                                                id: item.answers[i].options[j].id,
                                                                                                answer: item.answers[i].options[j].answer,
                                                                                                votes: item.answers[i].options[j].votes,
                                                                                            }
                                                                                            oneObj.options.push(twoObj)
                                                                                        }
                                                                                        copy.push(oneObj)
                                                                                    }
                                                                                    setRes(copy)

                                                                                }} style={item.whoAnswered.some(it => it === user.userName) ? {
                                                                                    width: '100%',
                                                                                    height: 140,
                                                                                    borderRadius: 15,
                                                                                    marginBottom: 10,
                                                                                    overflow: 'hidden',
                                                                                    opacity: 0.3
                                                                                } : styles.imgInCardCont}>
                                                                                <Image style={styles.imgInCard} source={{ uri: surveysBanner + item.banner }} />
                                                                            </Pressable>
                                                                            <Text style={styles.blubCardTitle}>{item.title}</Text>
                                                                            <Text style={{
                                                                                color: '#d6ad7b',
                                                                                fontFamily: 'Geologica-Thin',
                                                                                fontSize: 15,
                                                                                marginVertical: 5
                                                                            }}> {item.questionary.length} {item.questionary.length > 1 ? <>questions</> : <>question</>}</Text>
                                                                        </View>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                        :
                                                        <View style={styles.EmptyMsg}>
                                                            <Image style={styles.empty} source={empty} alt="empty" />
                                                            <Text style={styles.noH3}>No polls assigned yet</Text>
                                                            <View style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                flexDirection: 'row',
                                                                width: 270,
                                                                marginTop: 20
                                                            }}>
                                                                {club.clubOwner === user.userName &&
                                                                    <Pressable onPress={() => setSure(true)} style={styles.flyButtons}>
                                                                        <Text style={styles.textInFlyButtons}>Create a new survey</Text>
                                                                    </Pressable>}
                                                            </View>
                                                        </View>
                                                    }
                                                </View>
                                            </ScrollView>
                                        </Layout >
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
            </ContextUser.Consumer >
        </>
    )
}
export default Surveys