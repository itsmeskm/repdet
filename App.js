import {View} from 'react-native';
import React from 'react';
import Header from './Components/Header';
import RepoDetails from './Components/RepoDetails';

export default function App() {
  return (
    <View>
      <Header />
      <RepoDetails />
    </View>
  );
}
