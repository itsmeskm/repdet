import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Shimmer from './Shimmer';
import Error from './Error';
import {PROD_URL, URL} from './Constants';
import Details from './Details';

const RepoDetails = () => {
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uniqueid, setUniqueId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState(URL);

  useEffect(() => {
    fetchRepo();
  }, [refresh]);

  const storeDataLocally = async data => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('apiData', jsonData);
      console.log('Data stored locally successfully!');
    } catch (err) {
      console.error('Error storing data locally:', err);
    }
  };

  const fetchRepo = async () => {
    try {
      setLoading(true);
      const data = await fetch(url);
      const res = await data.json();
      await storeDataLocally(res);
      setRepo(res);
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const handleErrorButtonPress = () => {
    console.log('Error Button Pressed');
    setRefresh(!refresh);
    setUrl(URL);
  };

  const loadDataLocally = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('apiData');
      if (jsonData !== null) {
        const data = JSON.parse(jsonData);
        console.log('Data loaded from local storage:', data);
        setRepo(data);
      } else {
        console.log('No data found in local storage.');
      }
    } catch (err) {
      console.error('Error loading data from local storage:', err);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefresh(!refresh);
      loadDataLocally();
    }, 1000);
  }, [refresh]);

  const handlePress = props => {
    setUniqueId(props);
  };

  if (error) {
    return <Error handleError={handleErrorButtonPress} />;
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
                      <Details item={item} />
                    ) : (
                      <View style={styles.textContainer}>
                        <Text>{item.author}</Text>
                        <Text style={styles.text}>{item.name}</Text>
                      </View>
                    )}
                  </View>
                </TouchableHighlight>
                <View style={styles.line} />
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
    top: 160,
    width: '90%',
  },
  button: {},
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '90%',
    marginLeft: 24,
    marginVertical: 12,
  },
});
