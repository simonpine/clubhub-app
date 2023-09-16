import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, Button } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import logo from './assets/Colibri.png'
import bg from './assets/bg.png'

export default function App() {
  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.bg} blurRadius={170} source={bg} />
      <SafeAreaView>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Welcome</Text>
        <View>
          <Text style={styles.inputDescrip}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="SimonPine"
            onChangeText={onChangeText}
            value={text}
          />
          <Text style={styles.inputDescrip}>Pasword:</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="********"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102026',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#ffffff',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 'auto'
  },
  logo: {
    width: 200,
    height: 200,
    // zIndex: 1000
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  inputDescrip: {
    color:'#fff',
    fontSize: 20,
  },
  title: {
    color: '#fff',
    fontSize: 25,
    },
});
