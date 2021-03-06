import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator tabBarOptions={{
            style: {
                elevation: 0,
                shadowOpacity: 0,
                height: 64
            },
            tabStyle: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            iconStyle: {
                flex: 0,
                width: 22,
                height: 22
            },
            labelStyle: {
                fontFamily: 'Archivo_700Bold',
                fontSize: 13,
                marginLeft: 16
            },
            activeBackgroundColor: '#ebebf5',
            inactiveBackgroundColor: '#fafafc',
            activeTintColor: '#32264d',
            inactiveTintColor: '#c1bccc',
        }}>
            <Screen
                name="TeacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ size, color, focused }) => {
                        return (
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }} />

            <Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ size, color, focused }) => {
                        return (
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
                        );
                    }
                }} />
        </Navigator>
    )
}

export default StudyTabs;