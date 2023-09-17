import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Login from './screens/login';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const getFonts = () => {
  return Font.loadAsync({
    'Geologica-Regular': require('./assets/fonts/Geologica-Regular.ttf'),
    'Geologica-Bold': require('./assets/fonts/Geologica-Bold.ttf'),
    'Geologica-Thin': require('./assets/fonts/Geologica-Thin.ttf'),
    'Geologica-Light': require('./assets/fonts/Geologica-Light.ttf'),

  })
}
const Stack = createNativeStackNavigator();
export default function App() {
  const [FonstLoaded, setFontsLoaded] = useState(false);
  if (FonstLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
          <Stack.Screen options={{headerShown: false}} name="CreateAccount" component={Login} />
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
