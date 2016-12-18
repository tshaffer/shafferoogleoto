import React, { Component } from 'react';

import {
  Picker,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  picker: {
    width: 400,
    height: 400,
    backgroundColor: 'green',
    marginTop: 0,
    marginBottom: 0,
    padding: 0
  }
});

const Item = Picker.Item;

class AlbumPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedAlbum: ''
    };
  }

  buildAlbumRow(album) {

    return (
      <Item
        label={album.title}
        value={album.id}
        key={album.id}
      />
    );
  }

  buildAlbumList() {

    var self = this;

    let albumRows = this.props.albums.map(function(album) {
      const albumRow = self.buildAlbumRow(album);
      return albumRow;
    });
    return albumRows;
  }

  onValueChange = (value, itemPosition) => {
    console.log("selected value: ", value);
    console.log("itemPosition: ", itemPosition);
    let newState = { selectedAlbum: value };
    this.setState(newState);
    this.props.onSelectAlbum(value);
  };

  render() {

    let albumsJSX;
    if (this.props.albums.length === 0) {
      albumsJSX = <noscript/>;
    }
    else {
      albumsJSX = this.buildAlbumList();
    }

    return (
      <Picker
        style={styles.picker}
        selectedValue={this.state.selectedAlbum}
        onValueChange={this.onValueChange.bind(this)}>
        {albumsJSX}
      </Picker>
    );
  }
}

AlbumPicker.propTypes = {
  albums: React.PropTypes.array.isRequired,
  onSelectAlbum: React.PropTypes.func.isRequired
};

export default AlbumPicker;

