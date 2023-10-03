import { View, Image, Text, Pressable } from 'react-native';
import { styles } from '../style';
import home from '../assets/home.png'
import flame from '../assets/flame.png'
import flameFocus from '../assets/flameFocus.png'
import surveys from '../assets/surveys.png'
import surveysFocus from '../assets/surveysFocus.png'
import grades from '../assets/gardes.png'
import gradesFocus from '../assets/gardesFocus.png'
import calendar from '../assets/calendar.png'
import calendarFocus from '../assets/calendarFocus.png'
import chat from '../assets/chat.png'
import chatFocus from '../assets/chatFocus.png'
import settings from '../assets/settings.png'
import settingsFocus from '../assets/settingsFocus.png'

function ClubNav({ children, n, current, sett }) {

    return (
        <>

            <Pressable style={styles.returnCont} onPress={() => n.navigate('Home')}>
                <Image style={styles.imageForNav} source={home} />
            </Pressable>


            <View style={styles.buttonsAllTimeCont}>
                <Pressable onPress={() => n.navigate('Events')} style={styles.buttonOfNav}>
                    <Image style={styles.imgForNav} source={current === 5 ? surveysFocus : surveys} />
                </Pressable>
                <Pressable onPress={() => n.navigate('Events')} style={styles.buttonOfNav}>
                    <Image style={styles.imgForNav} source={current === 5 ? gradesFocus : grades} />
                </Pressable>
                <Pressable onPress={()=> n.navigate('Events')} style={styles.buttonOfNav}>
                    <Image style={styles.imgForNav} source={current === 1 ? flameFocus : flame} />
                </Pressable>
                <Pressable onPress={()=> n.navigate('Calendar')} style={styles.buttonOfNav}>
                    <Image style={styles.imgForNav} source={current === 2 ? calendarFocus : calendar} />
                </Pressable>
                <Pressable onPress={() => n.navigate('Events')} style={styles.buttonOfNav}>
                    <Image style={styles.imgForNav} source={current === 5 ? chatFocus : chat} />
                </Pressable>

                {sett &&
                    <Pressable onPress={() => n.navigate('Events')} style={styles.buttonOfNav}>
                        <Image style={styles.imgForNav} source={current === 5 ? settingsFocus : settings} />
                    </Pressable>
                }

            </View>

            {children}
        </>
    )
}
export default ClubNav