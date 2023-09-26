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

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Start"
          >
            <Stack.Screen options={{ headerShown: false }} name="Start" component={Start} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="CreateAccount" component={CreateAccount} />
            <Stack.Screen options={{ headerShown: false }} name="Recovery" component={Recovery} />
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
  
          </Stack.Navigator>
        </NavigationContainer>

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


