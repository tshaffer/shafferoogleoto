// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

var axios = require('axios');

import AlbumPicker from '../Component/albumPicker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 18,
    marginTop: 32,
    marginBottom: 24,
  },
  btnSlideShow: {
    marginBottom: 24,
  }
});

class Home extends Component {

  constructor(props) {
    super(props);

    this.selectedAlbum = null;

    // this.serverUrl = "http://localhost:8080/";
    this.serverUrl = "http://192.168.0.101:8080/";
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

  render() {

    let self = this;

    const albumsJSX =
      <AlbumPicker
        albums={this.props.albums}
        onSelectAlbum={this.handleSelectAlbum.bind(this)}
      />
    ;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Albums
        </Text>
        {albumsJSX}
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

export default connect(mapStateToProps)(Home);
