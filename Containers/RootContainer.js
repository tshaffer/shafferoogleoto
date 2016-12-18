// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  AppRegistry,
  Button,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

var axios = require('axios');

import { addAlbum } from "../store/albums";

import AlbumPicker from '../Component/albumPicker';

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
    textAlign: 'left',
    fontSize: 14,
    color: '#111111',
    marginBottom: 2,
  },
  ipAddressTextInput: {
    height: 24,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    color: '#111111',
    fontSize: 12,
    padding: 2,
    marginLeft: 4
  },
  // connectToBrightPhotoButton: {
  //   height: 24,
  //   // color: '#111111',
  //   fontSize: 12,
  //   padding: 1,
  // },
  header: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 18,
    marginBottom: 5,
  },
});

class RootContainer extends Component {

  constructor(props) {
    super(props);

    this.brightPhotoIPAddress = "192.168.0.101";

    this.selectedAlbum = null;

    // this.serverUrl = "http://localhost:8080/";
    this.serverUrl = "http://192.168.0.101:8080/";

  }
  // componentWillMount() {
  //
  //   let promise = this.fetchAlbums();
  //   promise.then( (response) => {
  //     this.parseAlbumsFeedResponse(response.data.feed);
  //   }, (reason) => {
  //     console.log("promise.then failed", reason);
  //   });
  // }
  
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
    console.log("handleConnectToBrightPhoto, connect to: ");
    console.log(this.brightPhotoIPAddress);

    // get albums from device and populate UI
    let promise = this.fetchAlbums();
    promise.then( (response) => {
      this.parseAlbumsFeedResponse(response.data.feed);
    }, (reason) => {
      console.log("fetchAlbums promise failed", reason);
    });

  }

  handleSelectAlbum(album) {
    console.log("handleSelectAlbum invoked for album: ", album);
    this.selectedAlbum = album;
  }

  launchSlideShow(albumId) {
    return new Promise((resolve, reject) => {
      const url = this.serverUrl + "launchSlideShow";
      axios.get(url, {
        params: { albumId }})
      .then((response) => {
        resolve(response);
      });
    });
  }

  handleStartSlideShow() {
    console.log("handleStartSlideShow invoked");
    if (this.selectedAlbum) {
      this.launchSlideShow(this.selectedAlbum);
    }
  }

  /*
      Failed button styling
   height="16px"
   fontSize="6px"
   padding="1"
   */
  // defaultValue="192.168.0.101"

  render() {

    let self = this;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Shafferoogleoto!
        </Text>
        <Text style={styles.instructions}>
          Enter BrightPhoto IP address
        </Text>
        <TextInput
          defaultValue="192.168.0.101"
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

        <Text style={styles.header}>
          Albums
        </Text>
        <AlbumPicker
          albums={this.props.albums}
          onSelectAlbum={this.handleSelectAlbum.bind(this)}
        />
        <Button
          onPress={this.handleStartSlideShow.bind(this)}
          title="Start Slide Show"
          color="#841584"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  albums: state.albums,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAlbum,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
