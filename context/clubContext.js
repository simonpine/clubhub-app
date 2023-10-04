import React, { createContext, useState, useEffect } from "react";
import { getClubId } from "../api";
import io from 'socket.io-client'
import { urlBase } from "../api";
import { sendMsgEvent, sendMsgChat } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
let socket

export const ContextClub = createContext()

export const CustomProviderClub = ({ children }) => {
    // const id = AsyncStorage.getItem('ClubInUse')
    const [events, setEvents] = useState([])
    const [chat, setChat] = useState([])

    const [refresh, setRefresh] = useState(Math.floor(100000 + Math.random() * 900000))
    const [club, setClub] = useState(null)
    const [grades, setGrades] = useState(null)
    const [eventsCal, setEventsCal] = useState([])
    const [polls, setPolls] = useState([])



    useEffect(() => {
        async function setDefault() {
            const id = await AsyncStorage.getItem('ClubInUse')
            // console.log(AsyncStorage.getItem('SavedUser'))
            const res = await getClubId(id)
            if ((res[0]) === undefined) {
                // window.location.reload(true)
                console.log(res, id)

            }
            else {
                await setClub(res[0])
                await setGrades(res[0].gardes)
                await setEvents(res[0].events)
                await setChat(res[0].chat)
                const cal = await res[0].calendarEvents.map(ev => {
                    return {
                        id: ev.id,
                        end: new Date(ev.end),
                        start: new Date(ev.start),
                        title: ev.title,
                        description: ev.description,
                    }
                })
                await setEventsCal(cal)
                await setPolls((res[0].surveys))
            }
        }
        // console.log(sucedio)
        setDefault()

    }, [])

    async function deaf() {
        const id = await AsyncStorage.getItem('ClubInUse')
        const res = await getClubId(id)
        if ((res[0]) === undefined) {
            // window.location.reload(true)

        }
        else {
            await setClub(res[0])
            await setGrades(res[0].gardes)
            await setEvents(res[0].events)
            await setChat(res[0].chat)
            const cal = await res[0].calendarEvents.map(ev => {
                return {
                    id: ev.id,
                    end: new Date(ev.end),
                    start: new Date(ev.start),
                    title: ev.title,
                    description: ev.description,
                }
            })
            await setEventsCal(cal)
            await setPolls((res[0].surveys))
        }
    }

    useEffect(() => {
        socket = io(urlBase)
        const id = AsyncStorage.getItem('ClubInUse')


        socket.removeAllListeners()
        socket.emit('joinClub', id)

        socket.on('emitMessageEvent', mess => {
            setEvents(prevState => [mess, ...prevState])
        })

        socket.on('emitMessageChat', mess => {
            setChat(prevState => [mess, ...prevState])
        })

        return () => {
            socket.disconnect();
        };
    }, [])


    async function sumbmit(mess, forSocket) {

        await sendMsgEvent(mess)
        await socket.emit('newEventMessage', forSocket)
    }

    async function sumbmitChat(mess, forSocket) {

        await sendMsgChat(mess)
        await socket.emit('newChatMessage', forSocket)
    }
    return (
        <ContextClub.Provider value={{ club, grades, setRefresh, events, sumbmit, chat, sumbmitChat, eventsCal, refresh, polls, deaf }}>
            {children}
        </ContextClub.Provider>
    )
}