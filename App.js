/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

type State = {
  loading: boolean,
  locationError: boolean,
  nearbyStores: Array<Bobashops>
};

class App extends React.Component<{}, State> {
  state = {
    loading: false,
    locationError: false,
    nearbyStores: []
  };

  onPress = async () => {
    this.setState({
      locationError: false,
      loading: true
    });

    try {
      const position = await this.getCurrentPosition({
        timeout: 60000,
        maximumAge: 10000,
        enableHighAccuracy: false
      });
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://bobashops.herokuapp.com/shops?lat=${latitude}&long=${longitude}`
      );
      const nearbyStores = await response.json();
      this.setState({
        loading: false,
        nearbyStores
      });
    } catch (error) {
      this.setState({
        locationError: true,
        loading: false
      });
    }
  };

  getCurrentPosition = options =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

  render() {
    const { loading, locationError, nearbyStores } = this.state;

    let Button;
    if (locationError) {
      Button = (
        <TouchableOpacity
          onPress={this.onPress}
          style={{ backgroundColor: '#DDDDDD' }}
        >
          <Text>Retry</Text>
        </TouchableOpacity>
      );
    } else {
      Button = (
        <TouchableOpacity
          onPress={this.onPress}
          style={{ backgroundColor: '#DDDDDD' }}
        >
          <Text>
            {nearbyStores.length !== 0 ? 'Refresh Location' : 'Find boba'}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View>
        <Text>Bobashops</Text>
        {loading ? <Text>Finding Nearby Open Boba Stores...</Text> : Button}
      </View>
    );
  }
}

export default App;
