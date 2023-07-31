import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.textStyle}>Trending Repo</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
});
