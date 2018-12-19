//import App from './src' //导入App

//export default App; //导出App

import React, { Component } from 'react'
import hmacSHA512 from 'crypto-js/hmac-sha512';  //引入加密库: npm install --save crypto-js
import Base64 from 'crypto-js/enc-base64';
import { FlatList, Image,  StyleSheet, Text,  View } from 'react-native';


const MOCKED_MOVIES_DATA = [{
  title: "标题",
  year: "2015",
  posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg"}
}];

const REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

const CHANGELLY_URL = "https://api.changelly.com";

const params = {
  'jsonrpc': '2.0',
  'id': 1,
  'method': 'getCurrencies',
  'params': []
};

const API_KEY = "";
const API_SECRET = "";

const sign = Base64.stringify(hmacSHA512(API_SECRET, params));


export default class SampleAppMovies extends Component{

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: this.state.data.concat(responseData.movies),
          loaded: true,
        });
      });
  }



  getChangellyDate() {
    fetch(CHANGELLY_URL,{
      method: "POST",
      headers: {
        'api-key': API_KEY,
        'sign': sign,
        'Content-type': 'application/json'},
      body: JSON.stringify(params)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson.result)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderMovie}
        style={styles.list}
      />
    );
  }

  renderLoadingView() {
    return(
      <View style={styles.container}>
        <Text>正在加载电影。。。。。</Text>
      </View>
    );
  }

  renderMovie({item}) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: item.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
    );
  }

}



var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});