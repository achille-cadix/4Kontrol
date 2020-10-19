// Component/ModifyPlaylist.js

import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, Easing, Animated, LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import axios from 'axios';
import SortableList from 'react-native-sortable-list';

LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`']);

class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            disabledButton: false
        }
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.active !== nextProps.active) {
            Animated.timing(this._active, {
                duration: 300,
                easing: Easing.bounce,
                toValue: Number(nextProps.active),
            }).start();
        }
    }

    _handleDelete(program) {
        this.props.deleteFunction(program)
        this.setState({
            disabledButton: true
        })
    }

    render() {
        const { data, active, _handlePress } = this.props;
        return (
            <Animated.View style={[
                styles.row,
                this._style,
            ]}>
                <Text style={styles.rowText}>
                    {data}
                </Text>
                <Button title="supprimer" color="red" style={styles.rowButton} disabled={this.state.disabledButton} onPress={() => { this._handleDelete(data) }} />
            </Animated.View>
        );
    }
}

class ModifyPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlistName: this.props.navigation.state.params.playlistName,
            programsList: this.props.navigation.state.params.programsList,
            programsOrder: [],
            toDeleteList: [],
            scrollEnable: true
        }
    }

    _renderRow = ({ data, active }) => {
        return (
            <Row data={data} active={active} deleteFunction={this._deleteProgram} />
        )
    }

    _deleteProgram = (programToDelete) => {
        let newToDelete = this.state.toDeleteList.slice()
        newToDelete.push(programToDelete)
        this.setState({
            toDeleteList: newToDelete
        })
    }

    _updatePlaylist() {
        let url = 'http://192.168.1.29:8080/playlists/' + this.state.playlistName
        let reorderedPlaylist
        if (this.state.programsOrder.length != 0) {
            reorderedPlaylist = this.state.programsOrder.map(i => this.state.programsList[i])
        }
        else {
            reorderedPlaylist = this.state.programsList.slice()
        }
        reorderedPlaylist = reorderedPlaylist.filter(x => !this.state.toDeleteList.includes(x)) // A vérifier
        let body = { "name": this.state.playlistName, "programs": reorderedPlaylist }
        return axios({
            method: 'put',
            url: url,
            data: body
        }).then((response) => response.data).then((data) => {
            Toast.show({
                type: 'success',
                visibilityTime: 1000,
                autoHide: true,
                position: 'bottom',
                text1: 'La playlist a été modifiée'
            })
            this.props.navigation.state.params.refreshFunction()
            const update_playlists = { type: "UPDATE_PLAYLISTS", value: data }
            this.props.dispatch(update_playlists)
            this.props.navigation.navigate("PlaylistContainer")
        }).catch((error) => {
            Toast.show({
                type: 'error',
                visibilityTime: 3000,
                autoHide: true,
                position: 'bottom',
                text1: 'Erreur : pas de réponse du serveur',
                text2: 'Veuillez vérifier que vous êtes bien connecté au Wifi du 4K'
            });
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.programs_list}>
                    <SortableList
                        data={this.state.programsList}
                        keyExtractor={(item, index) => 'key' + index}
                        renderRow={this._renderRow}
                        scrollEnabled={this.state.scrollEnable}
                        onActivateRow={(key) => { this.setState({ scrollEnable: false }) }}
                        onReleaseRow={(key, nextOrder) => { this.setState({ scrollEnable: true }) }}
                        onChangeOrder={(nextOrder) => { this.setState({ programsOrder: nextOrder }) }}
                    />
                </View>
                <View style={styles.validate_button_container}>
                    <Button title="valider la playlist" color="green" onPress={() => { this._updatePlaylist() }} />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    programs_list: {
        marginBottom: 5,
        flex: 10
    },
    validate_button_container: {
        flex: 1,
        marginTop: 5
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
        marginRight: 5,
        flexDirection: 'row'
    },
    rowText: {
        flex: 4
    },
    rowButton: {
        flex: 3
    }
})

const mapStateToProps = (state) => {
    return {
        runningProgram: state.runningProgram,
        programsGlobalList:state.programsGlobalList,
        playlistsGlobalList:state.playlistsGlobalList
    }
}

export default connect(mapStateToProps)(ModifyPlaylist)