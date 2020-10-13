// Components/ProgramContainer.js

import React from 'react';
import ProgramList from './ProgramList';
import { Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import exampleList from '../Helpers/ExampleList';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';

class ProgramContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            programsList: exampleList
        }
    }

    _stopProgram() {
        return fetch('http://192.168.1.29:8080/program/stop', { method: 'POST' }).then((reponse) => {
            const actionStop = { type: "STOP_PROGRAM" }
            this.props.dispatch(actionStop)
            this.forceUpdate()
            Toast.show({
                type: 'success',
                visibilityTime: 2000,
                autoHide: true,
                position: 'bottom',
                text1: 'Arret du programme'
            });
        }).catch((error) => {
            Toast.show({
                type: 'error',
                visibilityTime: 3000,
                autoHide: true,
                position: 'bottom',
                text1: 'Erreur : pas de réponse du serveur',
                text2: 'Veuillez vérifier que vous êtes bien connecté au Wifi du 4K'
            });
            const actionStop = { type: "STOP_PROGRAM" }
            this.props.dispatch(actionStop)
            console.log(this.props.runningProgram)
            this.forceUpdate()
        })
    }

    _turnOffLed() {
        return fetch('http://192.168.1.29:8080/programs/off', { method: 'POST' }).then((response) => {
            console.log(response)
            const actionStop = { type: "STOP_PROGRAM" }
            this.props.dispatch(actionStop)
            this.forceUpdate()
            Toast.show({
                type: 'success',
                visibilityTime: 2000,
                autoHide: true,
                position: 'bottom',
                text1: 'Extinction des LEDs'
            });
        }).catch((error) => {
            Toast.show({
                type: 'error',
                visibilityTime: 3000,
                autoHide: true,
                position: 'bottom',
                text1: 'Erreur : pas de réponse du serveur',
                text2: 'Veuillez vérifier que vous êtes bien connecté au Wifi du 4K'
            });
            const actionStop = { type: "STOP_PROGRAM" }
            this.props.dispatch(actionStop)
            console.log(this.props.runningProgram)
            this.forceUpdate()
        })
    }

    _loadProgramsList() {
        return fetch('http://192.168.1.29:8080/programs', { method: 'GET' }).then((response) => response.json()).then((data) => {
            this.setState({
                programsList: data
            })
            Toast.show({
                type: 'success',
                visibilityTime: 2500,
                autoHide: true,
                position: 'bottom',
                text1: 'Chargement des programmes effectué'
            });
        }).catch((error) => {
            Toast.show({
                type: 'error',
                visibilityTime: 3000,
                autoHide: true,
                position: 'bottom',
                text1: 'Erreur : pas de réponse du serveur',
                text2: 'Veuillez vérifier que vous êtes bien connecté au Wifi du 4K'
            });
            const actionStop = { type: "STOP_PROGRAM", value: this.props.program.name }
            this.props.dispatch(actionStop)
            this.forceUpdate()
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.bottom_buttons}>
                    <View style={styles.button_style}>
                        <TouchableOpacity style={styles.stop_button} onPress={() => this._stopProgram()} >
                            <Text>Arreter le programme</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button_style}>
                        <TouchableOpacity style={styles.off_button} onPress={() => this._turnOffLed()}>
                            <Text>Eteindre les LEDs</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.reload_container}>
                    <Button title='recharger les programmes' onPress={() => { this._loadProgramsList() }} />
                </View>
                <View style={styles.programlist_container}>
                    <ProgramList programs={this.state.programsList} />
                </View>
                <View style={styles.slider}>
                    <Slider
                        minimumValue={0}
                        maximumValue={255}
                        onValueChange={()=>{}} />
                </View>
                <View style={styles.toaster}> 
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 50
    },
    reload_container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    programlist_container: {
        flex: 10,
        backgroundColor: '#fff'
    },
    bottom_buttons: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10
    },
    button_style: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10
    },
    stop_button: {
        alignItems: 'center',
        backgroundColor: 'yellow',
        padding: 10
    },
    off_button: {
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10
    },
    slider: {
        flex: 1,
        marginTop: 5,
        borderWidth:2,
        justifyContent:'center',
        backgroundColor:'white'
    },
    toaster:{
        marginTop:5
    }
});

const mapStateToProps = (state) => {
    return {
        runningProgram: state.runningProgram
    }
}

export default connect(mapStateToProps)(ProgramContainer)
