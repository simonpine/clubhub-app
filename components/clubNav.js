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
                    <Text style={styles.textForNavButtons}>Surveys</Text>
                </Pressable>
                <Pressable onPress={() => n.navigate('Grades')} style={styles.buttonOfNav}>
                    <Image style={styles.imgForNav} source={current === 4 ? gradesFocus : grades} />
                    <Text style={styles.textForNavButtons}>Grades</Text>
                </Pressable>
                <Pressable onPress={()=> n.navigate('Events')} style={styles.buttonOfNav}>
                    <Image style={styles.imgForNav} source={current === 1 ? flameFocus : flame} />
                    <Text style={styles.textForNavButtons}>Events</Text>
                </Pressable>
                <Pressable onPress={()=> n.navigate('Calendar')} style={styles.buttonOfNav}>
                    <Image style={styles.imgForNav} source={current === 2 ? calendarFocus : calendar} />
                    <Text style={styles.textForNavButtons}>Schedule</Text>
                </Pressable>
                <Pressable onPress={() => n.navigate('Chat')} style={styles.buttonOfNav}>
                    <Image style={styles.imgForNav} source={current === 3 ? chatFocus : chat} />
                    <Text style={styles.textForNavButtons}>Chat</Text>
                </Pressable>

                {sett &&
                    <Pressable onPress={() => n.navigate('Events')} style={styles.buttonOfNav}>
                        <Image style={styles.imgForNav} source={current === 6 ? settingsFocus : settings} />
                        <Text style={styles.textForNavButtons}>Settings</Text>
                    </Pressable>
                }

            </View>

            {children}
        </>
    )
}
export default ClubNav