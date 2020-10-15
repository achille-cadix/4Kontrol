// Navigation/Navigation.js

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProgramContainer from '../Components/ProgramContainer';
import PlaylistContainer from '../Components/PlaylistContainer'
import CreatePlaylist from '../Components/CreatePlaylist';
import ModifyPlaylist from '../Components/ModifyPlaylist';

const PlaylistNavigator = createStackNavigator({
    PlaylistContainer: {
        screen: PlaylistContainer,
        navigationOptions: {
            headerShown: false
        }
    },
    CreatePlaylist: {
        screen: CreatePlaylist,
        navigationOptions: {
            title: 'Creez votre playlist'
        }
    },
    ModifyPlaylist: {
        screen: ModifyPlaylist,
        navigationOptions: {
            title: 'Modifier la playlist'
        }
    }
})

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
        screen: PlaylistNavigator,
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