import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

const Notebooks = ({navigation}) => {

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Notebooks" />
      </Appbar.Header>
      <Text>Notebooks</Text>
    </View>
  );
};

export default Notebooks;
