import React, { createContext, useState, useEffect } from "react";
import { getUser } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { useNavigate, useLocation } from "react-router-dom";

export const ContextUser = createContext()

export const CustomProvider = ({ children }) => {
    // const navigate = useNavigate();
    // const { pathname } = useLocation();
    const [user, setUser] = useState(null);
    const [userClubs, setUserClubs] = useState([]);


    useEffect(() => {
        async function setDefault() {
            const value = await AsyncStorage.getItem('SavedUser')
            const res = await getUser(value)
            if (res.length > 0) {
                await setUser(res[0])
                await setUserClubs(res[0].clubs)
                // await pathname === '/login' && navigate('/home')
            }


        }

        setDefault()
    }, [])

    async function deafUs() {
        const value = await AsyncStorage.getItem('SavedUser')
        const res = await getUser(value)
        if (res.length > 0) {
            await setUser(res[0])
            await setUserClubs(res[0].clubs)
            // await pathname === '/login' && navigate('/home')
        }
    }

    function saveUser(item) {
        setUser(item)
        setUserClubs(item.clubs)
        localStorage.setItem('user', JSON.stringify(item.userName))
        // navigate('/home')
    }
    return (
        <ContextUser.Provider value={{ user, saveUser, userClubs, deafUs }}>
            {children}
        </ContextUser.Provider>
    )
}