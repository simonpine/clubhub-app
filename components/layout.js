import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import bg from '../assets/bg.png'
function Layout({ children }) {

    return (
       <>
         <View style={styles.container}>
             <StatusBar style="light" />
             <Image style={styles.bg} blurRadius={170} source={bg} />
             <SafeAreaView style={styles.things}>
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
        
             </SafeAreaView>
         </View>
       </>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#000',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bg: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.8
    },
    things: {
      width: '90%',
      alignItems: 'center'
    }
  });

export default Layout;

