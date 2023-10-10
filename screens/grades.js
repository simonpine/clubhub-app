import { ActivityIndicator, View, Text, ScrollView, RefreshControl } from "react-native"
import Layout from "../components/layout";
import { styles } from "../style";
import { ContextUser } from '../context/userContext'
import { ContextClub } from "../context/clubContext";
import { useState } from "react";
import ClubNav from "../components/clubNav";
import { DataTable } from 'react-native-paper';

const Grades = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <ContextUser.Consumer>
            {({ user }) => {
                return (
                    <ContextClub.Consumer>
                        {({ club, deaf, grades }) => {
                            const onRefresh = () => {
                                setRefreshing(true);
                                setTimeout(() => {
                                    deaf()
                                    setRefreshing(false);
                                }, 2000);
                            }
                            return user !== null && club !== null ? (
                                <>
                                    <Layout>
                                        <ClubNav sett={user.userName === club.clubOwner} n={navigation} current={4}>
                                            <ScrollView
                                                automaticallyAdjustKeyboardInsets={true}
                                                refreshControl={
                                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                                }
                                            >
                                                <View style={styles.EventsCont}>
                                                    <DataTable style={styles.table}>
                                                        <DataTable.Header style={styles.tableHeader}>
                                                            <DataTable.Title ></DataTable.Title>
                                                            {grades.students.map(item => {
                                                                return item.studentName === user.userName || user.userName === club.clubOwner ? (
                                                                    <DataTable.Title key={item.studentName} ><Text style={styles.HeaderTitlesGrades}>{item.studentName}</Text></DataTable.Title>
                                                                ):
                                                                (<Text key={item.studentName} ></Text>)
                                                            })
                                                            }
                                                        </DataTable.Header>
                                                        {grades.grades.map((gra, index) => {
                                                            return (
                                                                <DataTable.Row key={index}>
                                                                    <DataTable.Cell><Text style={styles.HeaderTitlesGrades}>{gra}</Text></DataTable.Cell>
                                                                    {grades.students.map(stu => {
                                                                        return stu.studentName === user.userName || user.userName === club.clubOwner ? (
                                                                            <DataTable.Cell key={stu.studentName + index}><Text style={styles.gradeInTable}>     {stu.gardes[index]}</Text></DataTable.Cell>
                                                                        )
                                                                        :
                                                                        (
                                                                            <Text key={stu.studentName + index}></Text>
                                                                        )
                                                                    })
                                                                    }
                                                                </DataTable.Row>
                                                            )
                                                        })
                                                        }
                                                        <DataTable.Row >
                                                            <DataTable.Cell><Text style={styles.HeaderTitlesGrades}>Totla: </Text></DataTable.Cell>
                                                            {grades.students.map(stu => {
                                                                return stu.studentName === user.userName || user.userName === club.clubOwner ? (
                                                                    <DataTable.Cell key={stu.studentName}><Text style={styles.gradeInTable}>  {stu.total}</Text></DataTable.Cell>
                                                                )
                                                                :
                                                                (
                                                                    <Text key={stu.studentName}></Text>
                                                                )
                                                            })
                                                            }
                                                        </DataTable.Row>
                                                    </DataTable>
                                                </View>
                                            </ScrollView>
                                        </ClubNav>
                                    </Layout>
                                </>
                            )
                                :
                                (
                                    <>
                                        <View style={styles.isLoading}>
                                            <ActivityIndicator size={60} color="#d6ad7b" />
                                        </View>
                                        <Layout>
                                        </Layout>
                                    </>
                                )
                        }}
                    </ContextClub.Consumer>
                )
            }}
        </ContextUser.Consumer>
    )
}
export default Grades