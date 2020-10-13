// Components/ProgramContainer.js

import React from 'react';
import ProgramList from './ProgramList';
import { Button, StyleSheet, View } from 'react-native';
import exampleList from '../Helpers/ExampleList';
import Toast from 'react-native-toast-message';

class ProgramContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            programsList: exampleList
        }
    }

    _loadProgramsList() {
        return fetch('http://192.168.1.29:8080/programs', { method: 'GET' }).then((response) => response.json()).then((data) => {
            this.setState({
                programsList: data
            })
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
            console.log(this.props.runningProgram)
            this.forceUpdate()
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.reload_container}>
                    <Button title='recharger les programmes' onPress={() => { this._loadProgramsList() }} />
                </View>
                <View style={styles.programlist_container}>
                    <ProgramList programs={this.state.programsList} />
                </View>
                <View>
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 70
    },
    reload_container: {
        flex: 1
    },
    programlist_container: {
        flex: 10,
        backgroundColor: '#fff'
    }
});

export default ProgramContainer
