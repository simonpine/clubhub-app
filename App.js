import { useState, useEffect } from 'react';
// import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Login from './screens/login';
import CreateAccount from './screens/createAccount';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './screens/start';
import Recovery from './screens/recovery';
import Home from './screens/home';
import JoinClub from './screens/joinClub';
import UserSettings from './screens/userSettings';
import CreateClub from './screens/createClub';
import Events from './screens/events';
import CalendarClub from './screens/calendar';
import { CustomProvider, ContextUser } from './context/userContext';
import { CustomProviderClub, ContextClub } from './context/clubContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from './screens/chat';
import Grades from './screens/grades';
import Surveys from './screens/surveys';
import ClubSettings from './screens/clubSettings';
import { styles } from './style';
import { View, Image, Text, Pressable } from 'react-native';
import homeImg from './assets/home.png'
import flame from './assets/flame.png'
import flameFocus from './assets/flameFocus.png'
import surveys from './assets/surveys.png'
import surveysFocus from './assets/surveysFocus.png'
import stats from './assets/stats.png'
import statsFocus from './assets/statsFocus.png'
import grades from './assets/gardes.png'
import gradesFocus from './assets/gardesFocus.png'
import calendar from './assets/calendar.png'
import calendarFocus from './assets/calendarFocus.png'
import chat from './assets/chat.png'
import chatFocus from './assets/chatFocus.png'
import settings from './assets/settings.png'
import settingsFocus from './assets/settingsFocus.png'
import { exitClub, deleteClub } from "./api"
import Leaderboard from './screens/leaderboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SplashScreen from 'expo-splash-screen';


// const getFonts = () => {
//   return Font.loadAsync({
//     'Geologica-Regular': require('./assets/fonts/Geologica-Regular.ttf'),
//     'Geologica-Bold': require('./assets/fonts/Geologica-Bold.ttf'),
//     'Geologica-Thin': require('./assets/fonts/Geologica-Thin.ttf'),
//     'Geologica-Light': require('./assets/fonts/Geologica-Light.ttf'),
//     'Geologica-Medium': require('./assets/fonts/Geologica-Medium.ttf'),
//   })
// }

const Tab = createBottomTabNavigator();

export const ClubsContNav = ({ navigation }) => {
  return (
    <>
      <Pressable style={styles.returnCont} onPress={() => navigation.navigate('Home')}>
        <Image style={styles.imageForNav} source={homeImg} />
        {/* <Text style={styles.textInButton}>Home</Text> */}
      </Pressable>
      <ContextUser.Consumer>
        {({ user, deafUs, userClubs }) =>
          <ContextClub.Consumer>
            {({ club }) => {

              async function exit() {
                await exitClub({
                  userName: user.userName,
                  clubId: club.id,
                  userClubs: userClubs,
                })

                await deafUs()
                await navigation.navigate('Home')
                // await AsyncStorage.setItem('ClubInUse', null)
              }
              async function delet() {
                await deleteClub({
                  clubOwner: user.userName,
                  clubsOfOwner: user.clubs,
                  clubId: club.id,
                }, club.id)

                await deafUs()
                await navigation.navigate('Home')
                // await AsyncStorage.setItem('ClubInUse', null)
              }


              return (
                <>
                  {user.userName === club.clubOwner ?
                    <Pressable onPress={delet} style={styles.redButton}>
                      <Text style={styles.textInButton}>Delete club</Text>
                    </Pressable>
                    :
                    <Pressable onPress={exit} style={styles.redButton}>
                      <Text style={styles.textInButton}>Exit club</Text>
                    </Pressable>
                  }

                  <Tab.Navigator
                    screenOptions={{
                      tabBarShowLabel: false,
                      tabBarStyle: styles.buttonsAllTimeCont,
                    }}
                    initialRouteName="Events">
                    <Tab.Screen options={{
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                        <View style={styles.buttonOfNav}>
                          <Image style={styles.imgForNav} source={focused ? calendarFocus : calendar} />
                          <Text style={focused ? styles.textForNavButtonsFocus : styles.textForNavButtons}>Schedule</Text>
                        </View>
                      )
                    }} name="Calendar" component={CalendarClub} />
                    {club.existChat ? <Tab.Screen options={{
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                        <View style={styles.buttonOfNav}>
                          <Image style={styles.imgForNav} source={focused ? chatFocus : chat} />
                          <Text style={focused ? styles.textForNavButtonsFocus : styles.textForNavButtons}>Chat</Text>
                        </View>
                      )
                    }} name="Chat" component={Chat} /> : <></>}

                    <Tab.Screen options={{
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                        <View style={styles.buttonOfNav}>
                          <Image style={styles.imgForNav} source={focused ? flameFocus : flame} />
                          <Text style={focused ? styles.textForNavButtonsFocus : styles.textForNavButtons}>Events</Text>
                        </View>
                      )
                    }} name="Events" component={Events} />

                    {club.existGrades ? <Tab.Screen options={{
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                        <View style={styles.buttonOfNav}>
                          <Image style={styles.imgForNav} source={focused ? gradesFocus : grades} />
                          <Text style={focused ? styles.textForNavButtonsFocus : styles.textForNavButtons}>Grades</Text>
                        </View>
                      )
                    }} name="Grades" component={Grades} /> : <></>}
                    <Tab.Screen options={{
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                        <View style={styles.buttonOfNav}>
                          <Image style={styles.imgForNav} source={focused ? surveysFocus : surveys} />
                          <Text style={focused ? styles.textForNavButtonsFocus : styles.textForNavButtons}>Surveys</Text>
                        </View>
                      )
                    }} name="Surveys" component={Surveys} />

                    <Tab.Screen options={{
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                        <View style={styles.buttonOfNav}>
                          <Image style={styles.imgForNav} source={focused ? statsFocus : stats} />
                          <Text style={focused ? styles.textForNavButtonsFocus : styles.textForNavButtons}>Leaderboard</Text>
                        </View>
                      )
                    }} name="Leaderboard" component={Leaderboard} />


                    {user.userName === club.clubOwner &&
                      <Tab.Screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                          <View style={styles.buttonOfNav}>
                            <Image style={styles.imgForNav} source={focused ? settingsFocus : settings} />
                            <Text style={focused ? styles.textForNavButtonsFocus : styles.textForNavButtons}>Settings</Text>
                          </View>
                        )
                      }} name="ClubSettings" component={ClubSettings} />}
                  </Tab.Navigator>
                </>
              )
            }}
          </ContextClub.Consumer>
        }
      </ContextUser.Consumer>
    </>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  const [FonstLoaded, setFontsLoaded] = useState(false);


  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Geologica-Regular': require('./assets/fonts/Geologica-Regular.ttf'),
          'Geologica-Bold': require('./assets/fonts/Geologica-Bold.ttf'),
          'Geologica-Thin': require('./assets/fonts/Geologica-Thin.ttf'),
          'Geologica-Light': require('./assets/fonts/Geologica-Light.ttf'),
          'Geologica-Medium': require('./assets/fonts/Geologica-Medium.ttf'),
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await setFontsLoaded(true)
      }
    }

    prepare();
  }, []);

  // if (FonstLoaded) {
  return (

    <>
      {FonstLoaded &&
        <CustomProvider>
          <CustomProviderClub>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Start">
                <Stack.Screen options={{ headerShown: false }} name="Start" component={Start} />
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                <Stack.Screen options={{ headerShown: false }} name="CreateAccount" component={CreateAccount} />
                <Stack.Screen options={{ headerShown: false }} name="Recovery" component={Recovery} />
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <Stack.Screen options={{ headerShown: false }} name="UserSettings" component={UserSettings} />
                <Stack.Screen options={{ headerShown: false }} name="JoinClub" component={JoinClub} />
                <Stack.Screen options={{ headerShown: false }} name="CreateClub" component={CreateClub} />
                <Stack.Screen
                  name="ClubsContNav"
                  component={ClubsContNav}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </CustomProviderClub>
        </CustomProvider>}
    </>

  );
  // }
  // else {
  //   return (
  //     <AppLoading
  //       startAsync={getFonts}
  //       onFinish={() => setFontsLoaded(true)}
  //       onError={(error) => console.warn(error)}
  //     />
  //     <></>
  //   );
  // }
}


