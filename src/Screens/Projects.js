import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import ItemCard from '../Components/ItemCard';
import itemsContext from '../context/items/itemsContext';
import {useFocusEffect} from '@react-navigation/native';
import ProjectCard from '../Components/ProjectCard';
import Header from '../Components/Header';

const Projects = ({navigation}) => {
  //get itemsState
  const itemlistContext = useContext(itemsContext);
  const {getItems, projectsitems, getProjects} = itemlistContext;

  /*useEffect(() => {
    getItems("projects");
    //getProjects();
  }, [])*/

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  //TODO:REPLACE SCROLLVIEW WITH FLATLIST FOR PERFORMANCE

  /*useFocusEffect(
    useCallback(() => {
      getItems("projects");
      //getProjects()
    }, [])
  );*/

  return (
    <>
      <Header title="Projects" navigation={navigation} />
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, padding: 6}}>
          {projectsitems.map((item) =>
            item.done ? null : <ProjectCard key={item.id} item={item} />,
          )}
          <List.Accordion
            title="Done"
            expanded={expanded}
            onPress={handlePress}>
            {projectsitems.map((item) =>
              item.done ? <ProjectCard key={item.id} item={item} /> : null,
            )}
          </List.Accordion>
        </View>
      </ScrollView>
    </>
  );
};

export default Projects;
