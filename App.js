import { useState } from 'react';
import AppLoading from 'expo-app-loading';
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
import { CustomProvider } from './context/userContext';
import { CustomProviderClub } from './context/clubContext';
const getFonts = () => {
  return Font.loadAsync({
    'Geologica-Regular': require('./assets/fonts/Geologica-Regular.ttf'),
    'Geologica-Bold': require('./assets/fonts/Geologica-Bold.ttf'),
    'Geologica-Thin': require('./assets/fonts/Geologica-Thin.ttf'),
    'Geologica-Light': require('./assets/fonts/Geologica-Light.ttf'),
    'Geologica-Medium': require('./assets/fonts/Geologica-Medium.ttf'),
  })
}



const Stack = createNativeStackNavigator();
export default function App() {
  const [recoveryName, setRecoveryName] = useState('')
  const [FonstLoaded, setFontsLoaded] = useState(false);
  if (FonstLoaded) {
    return (

      <CustomProvider>
        <CustomProviderClub>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Start"
            >
              <Stack.Screen options={{ headerShown: false }} name="Start" component={Start} />
              <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
              <Stack.Screen options={{ headerShown: false }} name="CreateAccount" component={CreateAccount} />
              <Stack.Screen options={{ headerShown: false }} name="Recovery" component={Recovery} />
              <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
              <Stack.Screen options={{ headerShown: false }} name="UserSettings" component={UserSettings} />
              <Stack.Screen options={{ headerShown: false }} name="JoinClub" component={JoinClub} />
              <Stack.Screen options={{ headerShown: false }} name="CreateClub" component={CreateClub} />
              <Stack.Screen options={{ headerShown: false }} name="Events" component={Events} />
              <Stack.Screen options={{ headerShown: false }} name="Calendar" component={CalendarClub} />
            </Stack.Navigator>
          </NavigationContainer>
        </CustomProviderClub>
      </CustomProvider>

    );
  }
  else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }
}


