// Compenents/PlaylistsContainer.js

import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native';


class PlaylistContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }
    render() {
        return (
            <View>
                <Text>Playlist</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    }
})

export default PlaylistContainer