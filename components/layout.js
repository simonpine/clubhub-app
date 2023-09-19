import { StyleSheet, View, Image, Text, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import bg from '../assets/bg.png'
function Layout({ children, t, n }) {

  return (
    <>
      <View style={styles.container}>

        <StatusBar style="light" />
        <Image style={styles.bg} blurRadius={170} source={bg} />
        {t === true &&
          <Pressable style={styles.returnCont} onPress={() => n.goBack()}>
            <Text style={styles.returnTexr}>Return</Text>
          </Pressable>
        }
        <ScrollView style={styles.things}>

          {/* <Login loading={loading} />
        
                 {isLoged === null ?
                     // <Login loading={loading} />
                     <DetailsScreen />
        
                     :
                     <>
                         <Text>{'isLoged'}</Text>
                     </>
        
                 } */}

          {children}

        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131516',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute'
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8
  },
  things: {
    // backgroundColor: 'white',
    marginTop: 25,
    // minHeight: '100%',
    width: '100%',

  },
  returnCont: {
    backgroundColor: 'rgba(0, 0, 0, 0.5490196078)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: 'flex-end',
    // marginTop: 20
    position: 'absolute',
    top: 40,
    right: '5%',
    // width: 100,
    zIndex: 1000
  },
  returnTexr: {
    color: '#fff',
    fontFamily: 'Geologica-Medium',
    fontSize: 17
  },
});

export default Layout;

