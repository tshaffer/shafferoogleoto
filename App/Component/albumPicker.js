import React, { Component } from 'react';

import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  View
} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
    width: 256
  },
  text: {
    flex: 1,
  },
});

class AlbumPicker extends Component {

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      selectedAlbum: '',
      dataSource: ds.cloneWithRows(this._genRows({}))
    };
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {

    let self = this;

    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(rowID);
        highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }


  _genRows() {

    let dataBlob = [];
    this.props.albums.forEach( (album) => {
      dataBlob.push(album.title);
    });
    return dataBlob;
  }

  pressRow(rowID) {
    console.log("pressRow invoked, rowID: ", rowID);
    const album = this.props.albums[rowID];
    console.log("selected album id: ", album.id);
    console.log("selected album name: ", album.title);
    this.props.onSelectAlbum(album.id);
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={rowID}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        renderSeparator={this._renderSeparator}
        enableEmptySections={true}
      />
    );
  }
}

export default AlbumPicker;
