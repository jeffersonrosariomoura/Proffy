import React, { useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import { RectButton } from 'react-native-gesture-handler';

import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';

import styles from './styles';

export interface TeacherProps {
    id: number,
    avatar: string,
    bio: string,
    cost: string,
    name: string,
    subject: string,
    whatsapp: string
}

interface TeacherItemProps {
    teacher: TeacherProps,
    favorite: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorite }) => {

    const [isFavorite, setIsFavorite] = useState(favorite);

    async function handleToggleFavorite() {
        const teachersFavorites = await AsyncStorage.getItem('teachersFavorites');

        let teachersFavoritesArray = [];

        if (teachersFavorites)
            teachersFavoritesArray = JSON.parse(teachersFavorites);

        if (isFavorite) {
            const teachersFavoritesIndex = teachersFavoritesArray.findIndex((teacherItem: TeacherProps) => {
                return teacherItem.id !== teacher.id;
            });

            teachersFavoritesArray.splice(teacher, 1);
            setIsFavorite(false);
        } else {
            teachersFavoritesArray.push(teacher);
            setIsFavorite(true);
        }

        await AsyncStorage.setItem('teachersFavorites', JSON.stringify(teachersFavoritesArray));
    }

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id
        });

        Linking.openURL(`whatsapp://send?phone=55${teacher.whatsapp}&text=Olá, realizei a inscrição para sua aula de ${teacher.subject}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>

                <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'  '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        style={[styles.favoriteButton, isFavorite && styles.favored]}
                        onPress={handleToggleFavorite}>
                        {isFavorite
                            ? <Image source={unFavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                        }
                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;