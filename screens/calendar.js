import { ActivityIndicator, StyleSheet, View, Image, Text, Pressable, ScrollView, RefreshControl, TextInput } from "react-native"
import Layout from "../components/layout";
import DatePicker from 'react-native-date-picker'
import { styles } from "../style";
import { ContextUser, CustomProvider } from '../context/userContext'
import { CustomProviderClub, ContextClub } from "../context/clubContext";
import { useState } from "react";
import { BannersImg, chatsFlies } from "../api";
import ClubNav from "../components/clubNav";
import closeImage from '../assets/close.png'

import { Calendar } from 'react-native-big-calendar'
import { calendarUpdate } from "../api"



const CalendarClub = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [sure, setSure] = useState(false)
    const [descriptionRef, setDescriptionRef] = useState('')
    const [titleRef, setTitleRef] = useState('')
    const [dateRef, setDateRef] = useState('')

    const [currentDescription, setCurrentDescription] = useState('')
    const [currentTitle, setCurrentTitle] = useState('')
    const [currentId, setCurrentId] = useState('')

    return (
        <ContextUser.Consumer>
            {({ user }) => {
                function handleSelectEvent(evt) {
                    setCurrentDescription(evt.description)
                    setCurrentTitle(evt.title)
                    setCurrentId(evt.id)
                }
                return (
                    <ContextClub.Consumer>
                        {({ club, deaf, eventsCal }) => {
                            const onRefresh = () => {
                                setRefreshing(true);
                                setTimeout(() => {
                                    deaf()
                                    setRefreshing(false);
                                }, 2000);
                            }
                            // console.log(eventsCal)

                            async function handleSubmit(evt) {
                                evt.preventDefault();
                                const da = await dateRef.split('-')
                                const nuwEvt = await {
                                    id: Date.now(),
                                    title: titleRef,
                                    description: descriptionRef,
                                    allDay: true,
                                    start: new Date(da[0] + '-' + da[1] + '-' + da[2][0] + (+da[2][1] + 1)),
                                    end: new Date(da[0] + '-' + da[1] + '-' + da[2][0] + (+da[2][1] + 1)),
                                }

                                await calendarUpdate(JSON.stringify({
                                    clubId: club.id,
                                    calendarEvts: [...eventsCal, nuwEvt],
                                }))
                                await setSure(false)

                                await deaf()
                                await setDescriptionRef('')
                                await setTitleRef('')
                                await setDateRef('')
                            }
                            async function deleteEvent() {
                                const newArr = await eventsCal.filter((item) => item.id !== currentId)
                                await calendarUpdate(JSON.stringify({
                                    clubId: club.id,
                                    calendarEvts: newArr,
                                }))

                                await deaf()
                                await setCurrentDescription('')
                                await setCurrentId('')
                                await setCurrentTitle('')
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
                                                    <Text style={styles.inputDescrip}>Title:</Text>
                                                    <TextInput
                                                        placeholderTextColor='#C7C7CD'
                                                        placeholder="Change of location"
                                                        style={styles.input} />
                                                    <Text style={styles.inputDescrip}>Desciption:</Text>
                                                    <TextInput
                                                        placeholderTextColor='#C7C7CD'
                                                        placeholder="The cooking activity will take place in the dining room this day"
                                                        style={styles.input} />
                                                    <Text style={styles.inputDescrip}>Date:</Text>

                                                    <DatePicker
                                                        modal={true}
                                                        // open={open}
                                                        date={dateRef}
                                                    // onConfirm={(date) => {
                                                    //     setOpen(false)
                                                    //     setDate(date)
                                                    // }}
                                                    // onCancel={() => {
                                                    //     setOpen(false)
                                                    // }}
                                                    />
                                                </View>
                                            </View>
                                        </Pressable>
                                    }
                                    <Layout>
                                        <ClubNav sett={user.userName === club.clubOwner} n={navigation} current={2}>
                                            <ScrollView
                                                refreshControl={
                                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                                }
                                            >
                                                <View style={styles.EventsCont}>
                                                    <Calendar
                                                        date={new Date()}
                                                        mode='month'
                                                        events={eventsCal}
                                                        height={500}
                                                        theme={
                                                            {
                                                                palette: {
                                                                    primary: {
                                                                        main: '#d5ac7a',
                                                                        contrastText: '#000',
                                                                    },
                                                                    gray: {
                                                                        '100': '#fff',
                                                                        '200': '#fff',
                                                                        '300': '#888',
                                                                        '500': 'rgba(255, 255, 255, 0.5)',
                                                                        '800': '#fff',
                                                                    },
                                                                },
                                                            }
                                                        }
                                                        onPressEvent={handleSelectEvent}
                                                        onPressCell={(asd) => {
                                                            const qwe = new Date(asd.start).toLocaleDateString('en-GB').split('/')
                                                            setDateRef(new Date(`${qwe[2]}-${qwe[1]}-${qwe[0]}`))
                                                            setSure(true)

                                                        }}
                                                    />

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
export default CalendarClub