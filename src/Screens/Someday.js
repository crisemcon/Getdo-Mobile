import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

const Someday = ({navigation}) => {

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Someday" />
      </Appbar.Header>
      <Text>Someday</Text>
    </View>
  );
};

export default Someday;
