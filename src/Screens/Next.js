import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

const Next = ({navigation}) => {

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Next" />
      </Appbar.Header>
      <Text>Next</Text>
    </View>
  );
};

export default Next;
