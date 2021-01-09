import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

const Tags = ({navigation}) => {

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Tags" />
      </Appbar.Header>
      <Text>Tags</Text>
    </View>
  );
};

export default Tags;
