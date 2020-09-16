import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBackgroundImg from '../../assets/images/give-classes-background.png';

import styles from './styles';

function GiveClasses() {

    const { goBack } = useNavigation();

    function handleNavigationBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={giveClassesBackgroundImg} style={styles.content} resizeMode="contain">
                <Text style={styles.title}>Quer ser um Proffy</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>

            <RectButton style={styles.button} onPress={handleNavigationBack}>
                <Text style={styles.buttonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;