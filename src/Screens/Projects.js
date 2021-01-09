import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

const Projects = ({navigation}) => {

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="Projects" />
      </Appbar.Header>
      <Text>Projects</Text>
    </View>
  );
};

export default Projects;
