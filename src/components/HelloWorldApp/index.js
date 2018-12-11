import React, { Component } from 'react';
import { Text, View } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <View>
        <Text>Hello world!</Text>

      </View>
    );
  }
}

export default HelloWorldApp; //返回组件，使用 export default 外部引用使用时不需要加入大括号 {}