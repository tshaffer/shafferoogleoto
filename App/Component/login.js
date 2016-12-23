import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addAlbum } from "../store/albums";

import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

// import Button from 'react-native-button';

var axios = require('axios');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    width: 164,
    textAlign: 'left',
    fontSize: 12,
    color: '#111111',
    marginTop: 32,
    marginBottom: 2,
    marginLeft: 4
  },
  ipAddressTextInput: {
    textAlign: 'center',
    // width: 164,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    color: '#111111',
    fontSize: 12,
    padding: 2,
    marginLeft: 4,
    marginBottom: 32
  },
});

class Login extends Component {


  constructor(props) {
    super(props);

    // this.brightPhotoIPAddress = "192.168.0.101";
    this.brightPhotoIPAddress = "localhost";

    this.serverUrl = "http://localhost:8080/";
    // this.serverUrl = "http://192.168.0.101:8080/";
  }


  fetchAlbums() {
    return new Promise((resolve, reject) => {
      const url = this.serverUrl + "fetchAlbums";
      axios.get(url).then((response) => {
        resolve(response);
      });
    });
  }


  parseAlbumsFeedResponse(feed) {

    for (let googleAlbum of feed.entry) {
      console.log("Album: ", googleAlbum.title[0]._);

      let album = {};
      album.title = googleAlbum.title[0]._;
      album.id = googleAlbum["gphoto:id"][0];
      album.numPhotos = googleAlbum["gphoto:numphotos"][0];
      album.timestamp = googleAlbum["gphoto:timestamp"][0];
      album.mediaGroup = googleAlbum["media:group"][0];
      album.published = googleAlbum["published"][0];
      album.dateTimeUpdated = googleAlbum["updated"][0];

      this.props.addAlbum(album);
    }

    this.selectedAlbum = feed.entry[0]["gphoto:id"][0];
  }


  handleConnectToBrightPhoto() {

    const self = this;

    this.serverUrl = "http://" + this.brightPhotoIPAddress + ":8080/";

    console.log("handleConnectToBrightPhoto, connect to: ");
    console.log(this.brightPhotoIPAddress);
    console.log(this.serverUrl);

    // get albums from device and populate UI
    let promise = this.fetchAlbums();
    promise.then( (response) => {
      self.parseAlbumsFeedResponse(response.data.feed);
      self.props.navigator.push({name: 'Home'});
    }, (reason) => {
      console.log("fetchAlbums promise failed", reason);
    });
  }


  render() {

    let self = this;

    // defaultValue="192.168.0.101"

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Shafferoogleoto!
        </Text>
        <Text style={styles.instructions}>
          Enter BrightPhoto IP address
        </Text>
        <TextInput
          defaultValue="localhost"
          autoFocus={true}
          style={styles.ipAddressTextInput}
          onChange={(event) => {
            self.brightPhotoIPAddress = event.nativeEvent.text;
            console.log('onChange text: ' + event.nativeEvent.text);
          }}
          onEndEditing={(event) => {
            self.brightPhotoIPAddress = event.nativeEvent.text;
            console.log('onEndEditing text: ' + event.nativeEvent.text);
          }}
          onSubmitEditing={(event) => {
            self.brightPhotoIPAddress = event.nativeEvent.text;
            console.log('onSubmitEditing text: ' + event.nativeEvent.text);
            self.handleConnectToBrightPhoto();
          }}
        />
        <Button
          onPress={this.handleConnectToBrightPhoto.bind(this)}
          title="Connect to BrightPhoto"
          color="#111111"
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAlbum,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);
