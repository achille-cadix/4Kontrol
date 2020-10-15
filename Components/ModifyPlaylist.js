// Component/ModifyPlaylist.js

import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, Easing, Animated } from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';
import playlistExamples from '../Helpers/ExamplePlaylists';
import SortableList from 'react-native-sortable-list';

class Row extends React.Component {

    constructor(props) {
        super(props);

        this._active = new Animated.Value(0);

        this._style = {
            transform: [{
                scale: this._active.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.07],
                }),
            }],
            elevation: this._active.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 6],
            }),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                useNativeDriver: true,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    render() {
        const { data, active } = this.props;
        return (
            <Animated.View style={[
                styles.row,
                this._style,

            ]}>
                <Text style={styles.text}>{data}</Text>
            </Animated.View>
        );
    }
}

class ModifyPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlistsName: this.props.navigation.state.params.playlistName,
            programsList: this.props.navigation.state.params.programsList
        }
    }

    _renderRow({ data, active }) {
        return (
            <Row data={data} active={active} />
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                <SortableList
                    data={this.state.programsList}
                    keyExtractor={(item, index) => 'key' + index}
                    renderRow={this._renderRow}
                    onChangeOrder={(nextOrder) => { console.log(nextOrder) }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
    },
    programs_list: {
        marginBottom: 5,
        height: 800
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 70,
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 4,
        marginLeft: 5,
        marginRight: 5
    }
})

export default ModifyPlaylist