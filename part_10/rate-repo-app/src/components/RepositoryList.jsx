import { useState } from 'react'
import { FlatList, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import SelectOrdering from './SelectOrdering'
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroudLight
  },

  //need this to scroll all the way to the bottom
  superContainer: {
    flex: 1
  },

  separator: {
    height: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

//seperating out container for purely for testing purposes (efficient!)
export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate()

  //need to get the "nodes" from the "edges" array
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  //event handler
  const handlePress = (itemID) => {
    navigate(`/${itemID}`)
    console.log(`/${itemID}`)
  }
  

  return (
    <FlatList
      style = {styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem = {({item}) => 
        <Pressable onPress = {() => handlePress(item.id)}>
          <RepositoryItem item = {item} isSingle = {false}/>
        </Pressable>
      }
      keyExtractor = {item => item.id}
    />
  )
};

const RepositoryList = () => {
  const defaultOrdering = {orderBy: 'CREATED_AT', orderDirection: 'DESC'}
  const [ordering, setOrdering] = useState(defaultOrdering)
  
  //this "side effect" would make testing harder
  const { repositories } = useRepositories(ordering);

  return (
    <View style = {styles.superContainer}>
      <SelectOrdering ordering = {ordering} setOrdering = { setOrdering }/>
      <RepositoryListContainer repositories = { repositories }/>
    </View>
    
  );
};

export default RepositoryList;