import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import Navigation from './Navigation/Navigation';

export default function App() {
  return (
    <Provider store={Store} style={styles.container}>
      <Navigation />
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
})