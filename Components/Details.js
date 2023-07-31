import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {IMAGES} from '../Assests';

const Details = ({item}) => {
  return (
    <View style={styles.textContainer}>
      <Text>{item.author}</Text>
      <Text style={styles.text}>{item.name}</Text>
      <Text>{item.description}</Text>
      <View style={styles.row}>
        <View style={styles.iconRow}>
          <Image source={IMAGES.dot} style={styles.icon} />
          <Text style={styles.text}>{item.language}</Text>
        </View>
        <View style={styles.iconRow}>
          <Image source={IMAGES.star} style={styles.icon} />
          <Text style={styles.text}>{item.stars}</Text>
        </View>
        <View style={styles.iconRow}>
          <Image source={IMAGES.fork} style={styles.icon} />
          <Text style={styles.text}>{item.forks}</Text>
        </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 12,
  },
  text: {
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 16,
  },
  iconRow: {
    // display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    borderRadius: 10,
    top: 2,
    padding: 4,
    marginHorizontal: 4,
  },
});
