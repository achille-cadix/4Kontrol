import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import ProgramContainer from './Components/ProgramContainer';


export default function App() {
  return (
    <Provider store={Store} style={styles.container}>
      <ProgramContainer/>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
