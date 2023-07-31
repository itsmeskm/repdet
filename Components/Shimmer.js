import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Shimmer = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.smallText} />
          <Text style={styles.text} />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.smallText} />
          <Text style={styles.text} />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.smallText} />
          <Text style={styles.text} />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.smallText} />
          <Text style={styles.text} />
        </View>
      </View>
    </View>
  );
};

export default Shimmer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#d6d9d8',
  },
  textContainer: {
    marginHorizontal: 4,
    width: '80%',
  },
  text: {
    backgroundColor: '#d6d9d8',
    width: '100%',
    marginVertical: 12,
    borderRadius: 50,
  },
  smallText: {
    backgroundColor: '#d6d9d8',
    width: '40%',
    marginVertical: 4,
    borderRadius: 50,
  },
});
