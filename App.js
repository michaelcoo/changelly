//import App from './src' //导入App

//export default App; //导出App

import React, { Component } from 'react'
import hmacSHA512 from 'crypto-js/hmac-sha512';  //引入加密库: npm install --save crypto-js
import Base64 from 'crypto-js/enc-base64';
import { FlatList, Image,  StyleSheet, Text,  View , Button, TextInput} from 'react-native';

import crypto from 'crypto-js'; //引入加密库: npm install --save crypto-js


const CHANGELLY_URL = "https://api.changelly.com";

const getCurrencies = {
  "jsonrpc": "2.0",
  "id": "test",
  "method": "getCurrencies",
  "params": {}
};

const getMinAmount = {
  "jsonrpc": "2.0",
  "id": "test",
  "method": "getMinAmount",
  "params": {
    "from": "ltc",
    "to": "eth",
  }
};

const API_KEY = '82c7bfc5dff74eb9bbcf830b9e5a8bfb';
const API_SECRET = 'eac0656863098810cbe2c3a010a5ac6f117f8b1af13ac99117d804aa5a371089';

const adders = "18NMoucE2Nmma3xnLXvWq5aUMMDBnQfMTg";

// const sign = Base64.stringify(hmacSHA512(getCurrencies,API_SECRET));

const sign = crypto.HmacSHA512(JSON.stringify(getCurrencies), API_SECRET).toString();
//
console.log("aaa:   "+ sign);


export default class SampleAppMovies extends Component{

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      colorvv:"green",
      exchangeAmount: 0,
    };

    this.getChangellyDate = this.getChangellyDate.bind(this);
  }

  componentDidMount() {
    this.getChangellyDate(getCurrencies);
  }


  getChangellyDate(param) {
    console.log("into getChangellyDate..")
    fetch(CHANGELLY_URL,{
      method: "POST",
      headers: {
        'api-key': API_KEY,
        'sign': sign,
        'Content-type': 'application/json'},
      body: JSON.stringify(param)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // resolve(responseJson.result)
        console.log(responseJson);
        this.setState({
          data: this.state.data.concat(responseJson.result.toString()),
          loaded: true,
        });
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
      <View style={styles.container}>
        <Text>可兑换的币种如下：</Text>
        <Text>{this.state.data} </Text>
        <Text>下面固定使用EOS转换成USDT(demo阶段) </Text>
        <View style={{flexDirection:"row"}}>
          <TextInput
            onChangeText={(text) => console.log(text)}
          />
          <Text>EOS </Text>
          <Text>{this.state.exchangeAmount} </Text>
          <Text>USDT </Text>

        </View>
        <Text>下面固定使用EOS转换成USDT(demo阶段) </Text>
      </View>
    );
  }

  renderLoadingView() {
    return(
      <View style={styles.container}>
        <Text>正在加载数据。。。。。</Text>
      </View>
    );
  }
}



var styles = StyleSheet.create({
  container: {
    flex: 1,
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