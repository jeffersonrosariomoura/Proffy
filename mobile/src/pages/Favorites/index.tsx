import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacherProps } from '../../components/TeacherItem';

import styles from './styles';

function Favorites() {
    const [teachers, setTeachers] = useState([]);

    useFocusEffect(() => {
        AsyncStorage.getItem('teachersFavorites').then(response => {
            if (response) {
                setTeachers(JSON.parse(response));
            }
        })
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >

                {teachers.map((teacher: TeacherProps) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} favorite />
                })}

            </ScrollView>
        </View>
    );
}

export default Favorites;