// Navigation/Navigation.js

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProgramContainer from '../Components/ProgramContainer';
import PlaylistContainer from '../Components/PlaylistContainer'

const TabNavigator = createBottomTabNavigator({
    Program: {
        screen: ProgramContainer,
        navigationOptions: {
            title: 'Programmes',
            tabBarIcon: () => {
                return <Image
                    source={require('../icons/program.png')}
                    style={styles.icon} />
            }
        }
    },
    Playlists: {
        screen: PlaylistContainer,
        navigationOptions: {
            title: 'Playlists',
            tabBarIcon: () => {
                return <Image
                    source={require('../icons/playlist.png')}
                    style={styles.icon} />
            }
        }
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(TabNavigator)