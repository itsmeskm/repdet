import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../Assests';

const Error = () => {
  //   const randomValue = Math.ceil(Math.random());
  //   console.log(Math.ceil(randomValue), 'val');
  const handlePress = () => {};

  return (
    <View style={styles.imageError}>
      <Image style={styles.image} source={IMAGES.error} />
      <Text style={styles.text}>
        An Allien is Probably blocking the Network
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Retry" style={styles.button} onPress={handlePress} />
      </View>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  imageError: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
  image: {
    height: 300,
    width: 300,
  },
  text: {
    marginTop: 12,
  },
  buttonContainer: {
    top: 190,
    width: '90%',
  },
  button: {},
});
