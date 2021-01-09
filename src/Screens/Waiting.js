import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

const Waiting = ({navigation}) => {

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Waiting" />
      </Appbar.Header>
      <Text>Waiting</Text>
    </View>
  );
};

export default Waiting;
