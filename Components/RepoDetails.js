import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Button,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Shimmer from './Shimmer';
import {IMAGES} from '../Assests';
import Error from './Error';
import {PROD_URL, URL} from './Constants';

const RepoDetails = () => {
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uniqueid, setUniqueId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRepo();
  }, [refresh]);

  const fetchRepo = async () => {
    try {
      setLoading(true);
      // console.log(URL, 'before--');
      const data = await fetch(URL);
      // console.log(URL, '--');
      const res = await data.json();
      setRepo(res);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const handleErrorButtonPress = () => {
    console.log('Error Button Pressed');
    setRefresh(!refresh);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefresh(!refresh);
    }, 1000);
  }, [refresh]);

  const handlePress = props => {
    setUniqueId(props);
  };

  if (error) {
    return (
      <View style={styles.imageError}>
        <Image style={styles.errorImage} source={IMAGES.error} />
        <Text style={styles.errorText}>
          An Allien is Probably blocking the Network
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Retry"
            style={styles.button}
            onPress={handleErrorButtonPress}
          />
        </View>
      </View>
    );
  }

  if (loading) {
    return <Shimmer />;
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {!loading &&
          repo.map(item => {
            return (
              <View key={item.url}>
                <TouchableHighlight
                  onPress={() => handlePress(item.url)}
                  underlayColor="lightgray">
                  <View style={styles.container}>
                    <View style={styles.image}>
                      <Image
                        src={item.avatar}
                        style={styles.image}
                        onError={err => console.log('Image error:', err)}
                      />
                    </View>
                    {item.url === uniqueid ? (
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
                    ) : (
                      <View style={styles.textContainer}>
                        <Text>{item.author}</Text>
                        <Text style={styles.text}>{item.name}</Text>
                      </View>
                    )}
                  </View>
                </TouchableHighlight>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepoDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 12,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
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
    marginTop: 8,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    borderRadius: 10,
    top: 2,
    padding: 4,
    // marginHorizontal: 4,
  },
  iconRow: {
    // display: 'flex',
    flexDirection: 'row',
  },
  imageError: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
  errorImage: {
    height: 300,
    width: 300,
  },
  errorText: {
    marginTop: 12,
  },
  buttonContainer: {
    top: 190,
    width: '90%',
  },
  button: {},
});
